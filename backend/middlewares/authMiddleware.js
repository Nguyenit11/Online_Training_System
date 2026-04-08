const jwt = require('jsonwebtoken'); 
const sequelize = require('../config/database');
const initModels = require('../models/generated/init-models');
const { users, roles } = initModels(sequelize);
const { error } = require('../utils/responseHelper');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, 'Thiếu hoặc sai định dạng Authorization header', 401);
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

const authorizeRoles = (...allowedRoles) => {
  const normalizedAllowed = allowedRoles.map((r) => String(r).toLowerCase());
  return async (req, res, next) => {
    try {
      if (!req.user?.id) {
        return error(res, 'Chưa xác thực người dùng', 401);
      }
      const user = await users.findByPk(req.user.id, {
        include: [{ model: roles, as: 'role_id_roles', attributes: ['role_name'] }],
      });
      const userRoleNames = (user?.role_id_roles || []).map((r) => String(r.role_name).toLowerCase());
      const isAllowed = userRoleNames.some((r) => normalizedAllowed.includes(r));
      if (!isAllowed) {
        return error(res, 'Không có quyền truy cập', 403);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
