const express = require('express');
const router = express.Router();
const Joi = require('joi');
const enrollmentController = require('../controllers/enrollmentController');
const validate = require('../middlewares/joiValidation');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

/**
 * Joi Schema cho Enrollment
 */
const enrollmentSchema = Joi.object({
    class_id: Joi.number().required().messages({
        'any.required': 'Mã lớp học là bắt buộc.',
        'number.base': 'Mã lớp học phải là một số.'
    })
});

// Định nghĩa các route
/**
 * Route: POST /api/enrollments/enroll
 * Chức năng: Đăng ký học viên vào một lớp học cụ thể.
 * Quyền: Yêu cầu đăng nhập và vai trò là Student.
 */
router.post('/enroll', 
    authenticateToken, 
    authorizeRoles('student'), 
    validate(enrollmentSchema), 
    enrollmentController.enroll
);

/**
 * Route: POST /api/enrollments/unenroll
 * Chức năng: Học viên tự hủy đăng ký khỏi lớp học.
 * Quyền: Yêu cầu đăng nhập.
 */
router.post('/unenroll', 
    authenticateToken, 
    enrollmentController.unenroll
);

/**
 * Route: GET /api/enrollments/class/:class_id/students
 * Chức năng: Lấy danh sách học viên trong một lớp.
 * Quyền: Yêu cầu đăng nhập, Admin và Instructor có quyền xem.
 */
router.get('/class/:class_id/students', 
    authenticateToken, 
    authorizeRoles('admin', 'instructor'), 
    enrollmentController.listStudentsInClass
);

module.exports = router;
