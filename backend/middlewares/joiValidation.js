const { error } = require('../utils/responseHelper');

/**
 * Middleware để validate dữ liệu đầu vào sử dụng Joi
 * @param {Object} schema - Joi schema object
 */
const validateWithJoi = (schema) => (req, res, next) => {
    const { error: joiError } = schema.validate(req.body, { abortEarly: false });
    
    if (joiError) {
        const violations = joiError.details.map(detail => ({
            field: detail.path[0],
            message: detail.message.replace(/"/g, '')
        }));
        
        console.warn(`[VALIDATION FAILED] Joi validation errors at ${req.originalUrl} from ${req.ip}`);
        return error(res, 'Dữ liệu không hợp lệ', 400, violations);
    }

    next();
};

module.exports = validateWithJoi;
