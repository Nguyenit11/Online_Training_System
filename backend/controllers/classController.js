const sequelize = require('../config/database');
const initModels = require('../models/generated/init-models');
const { classes, courses } = initModels(sequelize);
const { success } = require('../utils/responseHelper');

/**
 * Lấy danh sách tất cả các lớp học
 */
exports.getAllClasses = async (req, res, next) => {
    try {
        const data = await classes.findAll({
            include: [{ model: courses, as: 'course', attributes: ['id', 'title'] }]
        });
        return success(res, data, 'Lấy danh sách lớp học thành công');
    } catch (err) {
        next(err);
    }
};

/**
 * Lấy chi tiết một lớp học theo ID
 */
exports.getClassById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await classes.findByPk(id, {
            include: [{ model: courses, as: 'course', attributes: ['id', 'title'] }]
        });
        if (!data) {
            const error = new Error('Không tìm thấy lớp học');
            error.status = 404;
            throw error;
        }
        return success(res, data, 'Lấy chi tiết lớp học thành công');
    } catch (err) {
        next(err);
    }
};

/**
 * Tạo mới một lớp học
 */
exports.createClass = async (req, res, next) => {
    try {
        const { course_id, class_name, start_date, end_date, max_students } = req.body;
        const newClass = await classes.create({
            course_id,
            class_name,
            start_date,
            end_date,
            max_students
        });
        return success(res, newClass, 'Tạo lớp học thành công', 201);
    } catch (err) {
        next(err);
    }
};

/**
 * Cập nhật thông tin lớp học (PUT - Toàn bộ)
 * Nếu thiếu trường nào thì trường đó sẽ bị set về NULL
 */
exports.updateClassFull = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cls = await classes.findByPk(id);
        if (!cls) {
            const error = new Error('Không tìm thấy lớp học');
            error.status = 404;
            throw error;
        }

        // Định nghĩa các trường có thể cập nhật
        const updatableFields = ['course_id', 'class_name', 'start_date', 'end_date', 'max_students'];
        const fullUpdateData = {};

        updatableFields.forEach(field => {
            fullUpdateData[field] = req.body[field] !== undefined ? req.body[field] : null;
        });

        await cls.update(fullUpdateData);
        return success(res, cls, 'Cập nhật toàn bộ lớp học thành công (PUT)');
    } catch (err) {
        next(err);
    }
};

/**
 * Cập nhật thông tin lớp học (PATCH - Một phần)
 */
exports.updateClassPartial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cls = await classes.findByPk(id);
        if (!cls) {
            const error = new Error('Không tìm thấy lớp học');
            error.status = 404;
            throw error;
        }

        await cls.update(req.body);
        return success(res, cls, 'Cập nhật một phần lớp học thành công (PATCH)');
    } catch (err) {
        next(err);
    }
};

/**
 * Xóa một lớp học
 */
exports.deleteClass = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cls = await classes.findByPk(id);
        if (!cls) {
            const error = new Error('Không tìm thấy lớp học');
            error.status = 404;
            throw error;
        }

        await cls.destroy();
        return success(res, null, 'Xóa lớp học thành công');
    } catch (err) {
        next(err);
    }
};
