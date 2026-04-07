### NHẬT KÝ XÂY DỰNG DỰ ÁN LMS 

### Bước 1: Thiết kế & Phân tích Cơ sở dữ liệu (Database Design)
- Phân tích thực thể : Xác định các đối tượng chính trong hệ thống: Users (Người dùng), Roles (Vai trò), Courses (Khóa học), Classes (Lớp học), và Enrollments (Đăng ký học).

- Thiết kế Database :
  - Viết file [init.sql](database/init.sql) để tạo cấu trúc bảng MySQL.
  - Sử dụng Engine InnoDB để hỗ trợ khóa ngoại (Foreign Keys) và đảm bảo toàn vẹn dữ liệu.
  - Hỗ trợ tiếng Việt đầy đủ với charset utf8mb4 .
- Tài liệu hóa : Ghi lại chi tiết mối quan hệ (1:1, 1:N, N:N) trong file [database_analysis.md](database/database_analysis.md). 

### Bước 2: Khởi tạo Project & Cấu hình kết nối (Setup Foundation)
- Khởi tạo Backend : Cài đặt Express, Sequelize, MySQL2, và các thư viện cần thiết.
- Cấu hình Database : Thiết lập file [database.js](config/database.js) để kết nối NodeJS với MySQL thông qua Sequelize.
- Bảo mật thông tin :
  - Đưa các thông tin nhạy cảm (mật khẩu, tên DB, port) vào file [.env](.env).
  - Tạo file [.gitignore](.gitignore) để ngăn chặn việc đẩy file mật khẩu lên GitHub.

### Bước 3: Tự động hóa tạo Models (Automation)
- Tạo Script Generator : Viết file [generate-models.js](generate-models.js).
- Lợi ích : Thay vì viết code cho từng bảng thủ công, script này tự động quét Database và tạo ra các file JavaScript trong thư mục [models/generated/](models/generated/). Điều này giúp code luôn khớp 100% với Database thực tế.
- Cấu hình script : Thêm lệnh npm run db:generate vào [package.json](package.json). 

### Bước 4: Xây dựng cấu trúc API chuyên nghiệp (Professional API Structure)
- Chuẩn hóa Response : Tạo file [response.js](utils/response.js) để mọi phản hồi từ Server (thành công hay thất bại) đều có định dạng JSON thống nhất.
- Xử lý lỗi tập trung : Viết middleware [errorHandler.js](middlewares/errorHandler.js) để bắt và log mọi lỗi hệ thống, giúp Server không bị "sập" khi có lỗi bất ngờ.
- Logging : Tích hợp thư viện morgan để theo dõi các lượt gọi API (method, status code, thời gian phản hồi) ngay trên terminal. 

### Bước 5: Triển khai CRUD mẫu (Implementation)
- Thực thể Courses (Khóa học) :
  - Controller : Viết [courseController.js](controllers/courseController.js) xử lý đầy đủ 5 chức năng: Lấy danh sách, Lấy chi tiết, Tạo mới, Cập nhật, và Xóa.
  - Validation : Sử dụng express-validator trong [courseRoutes.js](routes/courseRoutes.js) để kiểm tra dữ liệu gửi lên (ví dụ: tiêu đề không được để trống).
  - Routing : Gắn route vào server chính tại địa chỉ /api/courses .

- Thực thể Classes (Lớp học) :
  - Controller : Viết [classController.js](controllers/classController.js) xử lý đầy đủ 5 chức năng: Lấy danh sách, Lấy chi tiết, Tạo mới, Cập nhật, và Xóa.
  - Validation : Sử dụng express-validator trong [classRoutes.js](routes/classRoutes.js) để kiểm tra dữ liệu gửi lên (ví dụ: tên lớp không được để trống).
  - Routing : Gắn route vào server chính tại địa chỉ /api/classes .