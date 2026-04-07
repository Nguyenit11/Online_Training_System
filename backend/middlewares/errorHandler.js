const { error } = require('../utils/responseHelper');

/**
 * Middleware xử lý lỗi tập trung cho toàn bộ ứng dụng
 */
const errorHandler = (err, req, res, next) => {
    console.error('--- ERROR LOG ---');
    console.error('Time:', new Date().toISOString());
    console.error('Path:', req.path);
    console.error('Method:', req.method);
    console.error('Message:', err.message || 'Internal Server Error');
    console.error('Stack:', err.stack);
    console.error('------------------');

    // Mặc định lỗi 500 nếu không có status code
    const statusCode = err.status || 500;
    const message = err.message || 'Đã có lỗi xảy ra trên server';

    // Xử lý một số lỗi đặc thù từ Sequelize (nếu cần)
    if (err.name === 'SequelizeValidationError') {
        const violations = err.errors.map(e => ({
            field: e.path,
            message: e.message
        }));
        return error(res, 'Lỗi kiểm tra dữ liệu từ Database', 400, violations);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return error(res, 'Dữ liệu đã tồn tại trong hệ thống', 409);
    }

    return error(res, message, statusCode);
};

module.exports = errorHandler;
