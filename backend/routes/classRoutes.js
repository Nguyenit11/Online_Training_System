const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const validate = require('../middlewares/validationMiddleware');

// Cấu hình Schema validation cho Class
const createClassSchema = {
    class_name: { required: true, minLength: 3 },
    course_id: { required: true, type: 'number' },
    max_students: { type: 'number' }
};

// Schema cho PUT (Full Update)
const fullUpdateClassSchema = {
    class_name: { minLength: 3 },
    course_id: { type: 'number' },
    max_students: { type: 'number' }
};

// Schema cho PATCH (Partial Update)
const partialUpdateClassSchema = {
    class_name: { minLength: 3 },
    course_id: { type: 'number' },
    max_students: { type: 'number' }
};

const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Định nghĩa các route
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', authenticateToken, validate(createClassSchema), classController.createClass);
// PUT - Cập nhật toàn bộ (Trường thiếu sẽ bị set NULL)
router.put('/:id', authenticateToken, validate(fullUpdateClassSchema), classController.updateClassFull);
// PATCH - Cập nhật một phần
router.patch('/:id', authenticateToken, validate(partialUpdateClassSchema), classController.updateClassPartial);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), classController.deleteClass);

module.exports = router;
