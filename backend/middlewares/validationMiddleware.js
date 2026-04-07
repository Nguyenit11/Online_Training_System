/**
 * Middleware để validate dữ liệu đầu vào
 * @param {Object} schema - Đối tượng chứa các quy tắc validate
 */
const validate = (schema) => (req, res, next) => {
    const violations = [];
    const data = req.body;

    for (const field in schema) {
        const rules = schema[field];
        const value = data[field];

        if (rules.required && (value === undefined || value === null || value === '')) {
            violations.push({ field, message: `${field} là bắt buộc.` });
            continue;
        }

        if (value !== undefined && value !== null) {
            if (rules.type === 'number' && isNaN(Number(value))) {
                violations.push({ field, message: `${field} phải là một số.` });
            }
            if (rules.minLength && String(value).length < rules.minLength) {
                violations.push({ field, message: `${field} tối thiểu ${rules.minLength} ký tự.` });
            }
            if (rules.enum && !rules.enum.includes(value)) {
                violations.push({ field, message: `${field} không hợp lệ. Phải thuộc: ${rules.enum.join(', ')}` });
            }
        }
    }

    if (violations.length > 0) {
        const { error } = require('../utils/responseHelper');
        return error(res, 'Dữ liệu không hợp lệ', 400, violations);
    }

    next();
};

module.exports = validate;
