const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const validate = require('../middlewares/validationMiddleware');

// Cấu hình Schema validation cho Course
const createCourseSchema = {
    title: { required: true, minLength: 5 },
    instructor_id: { required: true, type: 'number' },
    price: { type: 'number' },
    level: { enum: ['beginner', 'intermediate', 'advanced'] }
};

// Schema cho PUT (Full Update) - Không bắt buộc required để hỗ trợ việc set NULL các trường thiếu
const fullUpdateCourseSchema = {
    title: { minLength: 5 },
    instructor_id: { type: 'number' },
    price: { type: 'number' },
    level: { enum: ['beginner', 'intermediate', 'advanced'] }
};

// Schema cho PATCH (Partial Update)
const partialUpdateCourseSchema = {
    title: { minLength: 5 },
    instructor_id: { type: 'number' },
    price: { type: 'number' },
    level: { enum: ['beginner', 'intermediate', 'advanced'] }
};

// Định nghĩa các route
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', validate(createCourseSchema), courseController.createCourse);
// PUT - Cập nhật toàn bộ (Trường thiếu sẽ bị set NULL)
router.put('/:id', validate(fullUpdateCourseSchema), courseController.updateCourseFull);
// PATCH - Cập nhật một phần (Giữ nguyên data cũ cho trường thiếu)
router.patch('/:id', validate(partialUpdateCourseSchema), courseController.updateCoursePartial);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
