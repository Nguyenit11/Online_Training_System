-- Dữ liệu mẫu cho Hệ thống Đào tạo Trực tuyến (LMS)

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Roles
INSERT INTO `roles` (`id`, `role_name`, `description`) VALUES
(1, 'Admin', 'Quản trị viên hệ thống'),
(2, 'Instructor', 'Giảng viên'),
(3, 'Student', 'Học viên');

-- 2. Users
INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `status`) VALUES
(1, 'Nguyễn Văn Admin', 'admin@lms.com', '0123456789', 'active'),
(2, 'Trần Thị Giảng Viên', 'giangvien1@lms.com', '0987654321', 'active'),
(3, 'Lê Văn Giảng Viên', 'giangvien2@lms.com', '0912345678', 'active'),
(4, 'Phạm Minh Học Viên', 'hocvien1@gmail.com', '0321654987', 'active'),
(5, 'Hoàng Anh Học Viên', 'hocvien2@gmail.com', '0789456123', 'active'),
(6, 'Đặng Thu Học Viên', 'hocvien3@gmail.com', '0456123789', 'active'),
(7, 'Bùi Tiến Học Viên', 'hocvien4@gmail.com', '0159357456', 'active'),
(8, 'Vũ Mai Học Viên', 'hocvien5@gmail.com', '0258147369', 'active'),
(9, 'Trịnh Công Học Viên', 'hocvien6@gmail.com', '0369258147', 'active'),
(10, 'Lý Tiểu Học Viên', 'hocvien7@gmail.com', '0741852963', 'active');

-- 3. User Auth (Mật khẩu mẫu: password123 đã hash - giả định)
INSERT INTO `user_auth` (`user_id`, `password_hash`) VALUES
(1, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(2, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(3, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(4, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(5, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(6, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(7, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(8, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(9, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8'),
(10, '$2b$10$K9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8oY6R.qR.Hk9Yv.8');

-- 4. User Roles
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1), (2, 2), (3, 2), (4, 3), (5, 3), (6, 3), (7, 3), (8, 3), (9, 3), (10, 3);

-- 5. Courses
INSERT INTO `courses` (`id`, `instructor_id`, `title`, `description`, `price`, `level`) VALUES
(1, 2, 'Lập trình Node.js căn bản', 'Học Node.js từ đầu đến khi xây dựng được API', 500000, 'beginner'),
(2, 2, 'React.js cho người mới bắt đầu', 'Xây dựng ứng dụng web hiện đại với React', 600000, 'beginner'),
(3, 3, 'Cơ sở dữ liệu MySQL nâng cao', 'Tối ưu hóa query và thiết kế chuẩn hóa', 450000, 'intermediate'),
(4, 3, 'Fullstack Web với MERN stack', 'Học MongoDB, Express, React, Node', 1200000, 'advanced');

-- 6. Classes
INSERT INTO `classes` (`id`, `course_id`, `class_name`, `start_date`, `end_date`) VALUES
(1, 1, 'NodeJS-K01', '2024-05-01', '2024-07-01'),
(2, 1, 'NodeJS-K02', '2024-06-15', '2024-08-15'),
(3, 2, 'ReactJS-K10', '2024-05-10', '2024-07-10'),
(4, 3, 'MySQL-Master', '2024-05-20', '2024-06-20');

-- 7. Enrollments
INSERT INTO `enrollments` (`user_id`, `class_id`, `status`, `progress`) VALUES
(4, 1, 'enrolled', 20),
(5, 1, 'enrolled', 15),
(6, 2, 'enrolled', 0),
(7, 3, 'enrolled', 50),
(8, 3, 'completed', 100),
(9, 4, 'enrolled', 10),
(10, 4, 'dropped', 5);

SET FOREIGN_KEY_CHECKS = 1;
