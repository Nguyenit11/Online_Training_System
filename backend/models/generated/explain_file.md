1. Nhóm thực thể người dùng & Bảo mật (Trọng tâm của hôm nay)

users.js:
Là gì: Model lưu trữ thông tin cơ bản của người dùng.
Vai trò: Chứa các thuộc tính định danh như full_name, email, phone, status. Đây là bảng "gốc" để các bảng khác tham chiếu tới.

user_auth.js:
Là gì: Model lưu trữ dữ liệu nhạy cảm phục vụ xác thực.
Vai trò: Tách biệt mật khẩu (password_hash) và refresh_token ra khỏi thông tin cá nhân để tăng cường bảo mật. Nó liên kết 1-1 với bảng users.

roles.js:
Là gì: Danh mục các vai trò trong hệ thống (Ví dụ: Admin, Instructor, Student).
Vai trò: Định nghĩa quyền hạn. Thay vì viết chữ "Admin" trực tiếp vào user, ta dùng bảng này để quản lý tập trung.

user_roles.js:
Là gì: Bảng trung gian (Pivot table).
Vai trò: Giải quyết mối quan hệ Nhiều-Nhiều (n-n) giữa User và Roles. Một người có thể có nhiều vai trò và một vai trò có thể thuộc về nhiều người.

2. Nhóm thực thể Đào tạo (LMS Core)
courses.js:
Là gì: Model quản lý thông tin các Khóa học.
Vai trò: Lưu tiêu đề, mô tả, giá tiền và cấp độ (level). Nó liên kết với users để biết ai là người hướng dẫn (instructor_id).

classes.js:
Là gì: Model quản lý các Lớp học cụ thể.
Vai trò: Một Khóa học có thể mở nhiều Lớp (ví dụ: Lớp sáng, Lớp tối). Nó lưu start_date, end_date và sĩ số tối đa.

enrollments.js:
Là gì: Model quản lý việc đăng ký học.
Vai trò: Lưu vết xem học viên nào (user_id) đang học lớp nào (class_id), tiến độ học tập và trạng thái (đang học, đã hoàn thành).

3. "Trái tim" kết nối
init-models.js:
Là gì: File cấu hình trung tâm do sequelize-auto tạo ra.
Vai trò: Cực kỳ quan trọng. Nó gom tất cả các file lẻ ở trên lại và thiết lập các mối quan hệ (Associations) như belongsTo, hasMany, belongsToMany. Nếu thiếu file này, Sequelize sẽ không hiểu làm sao để JOIN các bảng lại với nhau khi bạn truy vấn.