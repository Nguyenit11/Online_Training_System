/**
 * Helper để chuẩn hóa phản hồi API
 */

const success = (res, data, message = 'Thành công', code = 200) => {
    return res.status(code).json({
        status: 'success',
        message,
        data
    });
};

const error = (res, message = 'Đã có lỗi xảy ra', code = 500, violations = null) => {
    const response = {
        status: 'error',
        message
    };
    if (violations) {
        response.violations = violations;
    }
    return res.status(code).json(response);
};

module.exports = {
    success,
    error
};
