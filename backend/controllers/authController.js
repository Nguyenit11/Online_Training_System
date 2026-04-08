// Vai trò : Đóng vai trò là "Bộ não" của hệ thống xác thực. 
// File này chịu trách nhiệm xử lý logic nghiệp vụ cho việc đăng ký người dùng mới 
// và xác thực người dùng hiện tại, quản lý việc cấp phát mã định danh an toàn (JWT).
const bcrypt = require('bcrypt'); //mã hóa mật khẩu (hashing)
const jwt = require('jsonwebtoken'); //Dùng để tạo ra các chuỗi mã hóa (Tokens) đại diện cho phiên làm việc
const sequelize = require('../config/database'); //kết nối để thực hiện các Transactions
const initModels = require('../models/generated/init-models'); //Khởi tạo các Models
const { success, error } = require('../utils/responseHelper');

//lấy ra các Model ( users , user_auth , roles , user_roles ) để tương tác với DB
const { users, user_auth, roles, user_roles } = initModels(sequelize); 

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); //Tạo AccessToken (1 giờ)
};

const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }); //Tạo RefreshToken (7 ngày)
};

//Hàm xử lý đăng ký
exports.register = async (req, res, next) => {
  const t = await sequelize.transaction(); //Khởi tạo Transaction : Mở một giao dịch database
  try {
    //Validation : Kiểm tra sự tồn tại của dữ liệu bắt buộc.
    const { full_name, name, email, password } = req.body;
    if (!email || !password || !(full_name || name)) {
      return error(res, 'Thiếu thông tin bắt buộc (full_name/name, email, password)', 400);
    }

    //Kiểm tra trùng lặp : Tìm kiếm email trong bảng users . Nếu thấy -> Trả về lỗi 409 Conflict .
    const existed = await users.findOne({ where: { email } });
    if (existed) {
      return error(res, 'Email đã tồn tại', 409);
    }

    //Tạo User : Ghi thông tin cơ bản vào bảng users
    const user = await users.create(
      {
        full_name: full_name || name,
        email,
        status: 'active',
      },
      { transaction: t }
    );

    //Hash mật khẩu bằng bcrypt (salt rounds = 10) và lưu vào bảng user_auth liên kết với user_id
    const password_hash = await bcrypt.hash(password, 10);
    await user_auth.create(
      {
        user_id: user.id,
        password_hash,
      },
      { transaction: t }
    );

    // Gán role 'Student' cho user
    const studentRole = await roles.findOne({ where: { role_name: 'Student' } });
    if (studentRole) {
      await user_roles.create(
        {
          user_id: user.id,
          role_id: studentRole.id,
        },
        { transaction: t }
      );
    }

    await t.commit(); //Commit : Nếu tất cả thành công, lưu vĩnh viễn vào DB

    return success(res, { id: user.id, full_name: user.full_name, email: user.email }, 'Đăng ký thành công', 201);
  }
  // Nếu bất kỳ bước nào lỗi, thực hiện Rollback (hủy bỏ mọi thay đổi tạm thời) 
  // và chuyển lỗi cho errorHandler .
  catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.login = async (req, res, next) => {
  //Validation : Kiểm tra sự tồn tại của dữ liệu bắt buộc.
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, 'Thiếu email hoặc password', 400);
    }

    // Tìm kiếm user dựa trên email
    const user = await users.findOne({
      where: { email },
      include: [{ model: user_auth, as: 'user_auth' }],
    });
    // Kiểm tra user có tồn tại hay không
    if (!user || !user.user_auth) {
      return error(res, 'Email hoặc mật khẩu không đúng', 401);
    }
    
    //Sử dụng bcrypt.compare để đối chiếu mật khẩu nhập vào với hash trong DB
    const isMatch = await bcrypt.compare(password, user.user_auth.password_hash);
    if (!isMatch) {
      return error(res, 'Email hoặc mật khẩu không đúng', 401);
    }

    // Lấy danh sách role của user
    const userWithRoles = await users.findByPk(user.id, {
      include: [{ model: roles, as: 'role_id_roles', attributes: ['role_name'] }],
    });
    const roleNames = (userWithRoles?.role_id_roles || []).map((r) => r.role_name);

    //Tạo Token : Thiết lập Access Token (chứa id , email , roles ) và Refresh Token.
    const payload = { id: user.id, email: user.email, roles: roleNames };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    // Lưu RefreshToken vào bảng user_auth, khi Access Token hết hạn, User gửi Refresh Token lên, 
    // Server sẽ so khớp với bản lưu trong DB này. Nếu khớp mới cấp vé mới.
    await user_auth.update(
      { refresh_token: refreshToken, last_login: new Date() },
      { where: { user_id: user.id } }
    );

    return success(
      res,
      {
        accessToken,
        refreshToken,
        user: { id: user.id, full_name: user.full_name, email: user.email, roles: roleNames },
      },
      'Đăng nhập thành công'
    );
  } catch (err) {
    next(err);
  }
};
