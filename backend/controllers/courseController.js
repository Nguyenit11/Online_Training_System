const sequelize = require('../config/database');
const initModels = require('../models/generated/init-models');
const { courses, users } = initModels(sequelize);
const { success } = require('../utils/responseHelper');

/**
 * Lấy danh sách tất cả các khóa học
 */
exports.getAllCourses = async (req, res, next) => {
    try {
        const data = await courses.findAll({
            include: [{ model: users, as: 'instructor', attributes: ['id', 'full_name', 'email'] }]
        });
        return success(res, data, 'Lấy danh sách khóa học thành công');
    } catch (err) {
        next(err);
    }
};

/**
 * Lấy chi tiết một khóa học theo ID
 */
exports.getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await courses.findByPk(id, {
            include: [{ model: users, as: 'instructor', attributes: ['id', 'full_name', 'email'] }]
        });
        if (!data) {
            const error = new Error('Không tìm thấy khóa học');
            error.status = 404;
            throw error;
        }
        return success(res, data, 'Lấy chi tiết khóa học thành công');
    } catch (err) {
        next(err);
    }
};

/**
 * Tạo mới một khóa học
 */
exports.createCourse = async (req, res, next) => {
    try {
        const { instructor_id, title, description, price, level, thumbnail } = req.body;
        const newCourse = await courses.create({
            instructor_id,
            title,
            description,
            price,
            level,
            thumbnail
        });
        return success(res, newCourse, 'Tạo khóa học thành công', 201);
    } catch (err) {
        next(err);
    }
};

/**
 * Cập nhật thông tin khóa học (PUT - Toàn bộ)
 * Nếu thiếu trường nào thì trường đó sẽ bị set về NULL (hoặc giá trị mặc định)
 */
exports.updateCourseFull = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await courses.findByPk(id);
        if (!course) {
            const error = new Error('Không tìm thấy khóa học');
            error.status = 404;
            throw error;
        }

        // Định nghĩa các trường có thể cập nhật
        const updatableFields = ['instructor_id', 'title', 'description', 'price', 'level', 'thumbnail'];
        const fullUpdateData = {};

        // Duyệt qua các trường, nếu không gửi lên thì gán null (Sequelize sẽ tự xử lý default value nếu có)
        updatableFields.forEach(field => {
            fullUpdateData[field] = req.body[field] !== undefined ? req.body[field] : null;
        });

        await course.update(fullUpdateData);
        return success(res, course, 'Cập nhật toàn bộ khóa học thành công (PUT)');
    } catch (err) {
        next(err);
    }
};

/**
 * Cập nhật thông tin khóa học (PATCH - Một phần)
 * Chỉ cập nhật các trường được gửi lên trong req.body
 */
exports.updateCoursePartial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await courses.findByPk(id);
        if (!course) {
            const error = new Error('Không tìm thấy khóa học');
            error.status = 404;
            throw error;
        }

        await course.update(req.body);
        return success(res, course, 'Cập nhật một phần khóa học thành công (PATCH)');
    } catch (err) {
        next(err);
    }
};

/**
 * Xóa một khóa học
 */
exports.deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await courses.findByPk(id);
        if (!course) {
            const error = new Error('Không tìm thấy khóa học');
            error.status = 404;
            throw error;
        }

        await course.destroy();
        return success(res, null, 'Xóa khóa học thành công');
    } catch (err) {
        next(err);
    }
};
