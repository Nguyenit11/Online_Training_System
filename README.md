# Hệ thống Đào tạo Trực tuyến (LMS)

Dự án này là một hệ thống quản lý học tập (LMS) hoàn chỉnh, bao gồm cả Backend và Frontend.

## 1. Mục tiêu dự án
- Xây dựng nền tảng học trực tuyến hiện đại, dễ sử dụng.
- Quản lý khóa học, bài học, người dùng và tiến độ học tập một cách hiệu quả.
- Đảm bảo tính bảo mật và toàn vẹn dữ liệu cho toàn hệ thống.

## 2. Yêu cầu đầu vào
- **Phần mềm:**
  - Node.js (v16+)
  - MySQL Server (v8.0+)
  - VS Code hoặc bất kỳ IDE nào hỗ trợ Node.js.
- **Dữ liệu:** File cấu hình môi trường `.env` cho phần Backend.

## 3. Thư viện sử dụng (Tech Stack)
### Backend:
- **Ngôn ngữ:** Node.js (Express)
- **Database:** MySQL
- **ORM:** Sequelize
- **Bảo mật:** JWT, Bcrypt
### Frontend:
- **Framework:** React.js (Vite)
- **UI:** Tailwind CSS (nếu có)

## 4. Quy trình làm việc và Triển khai
### Bước 1: Thiết lập Database
- Tạo database mới trong MySQL.
- Chạy các script trong thư mục `database/` (sẽ được tạo sau khi chạy prompt).
### Bước 2: Cấu hình Backend
- Di chuyển vào thư mục `backend/`.
- Chạy `npm install`.
- Tạo file `.env` dựa trên `.env.example`.
- Chạy `npm run dev` để khởi động server.
### Bước 3: Khởi chạy Frontend
- Di chuyển vào thư mục `frontend/`.
- Chạy `npm install`.
- Chạy `npm run dev` để mở giao diện người dùng.

## 5. Cách chạy và Kiểm thử
- **Backend:** Kiểm tra API thông qua Postman hoặc Thunder Client tại địa chỉ `http://localhost:3000`.
- **Frontend:** Truy cập giao diện tại địa chỉ được cung cấp bởi Vite (mặc định là `http://localhost:5173`).
- **Kiểm thử:** Đảm bảo luồng đăng nhập, lấy danh sách khóa học và các thao tác CRUD hoạt động chính xác.

## 6. Chuẩn đầu ra cần đạt
- Hệ thống hoạt động trơn tru, không có lỗi runtime nghiêm trọng.
- API phản hồi đúng chuẩn RESTful.
- Giao diện người dùng thân thiện, phản hồi nhanh (Responsive).
- Toàn bộ source code được tổ chức ngăn nắp, có comment giải thích.

## 7. Các lưu ý quan trọng
- Luôn kiểm tra kết nối database trước khi khởi chạy backend.
- Đảm bảo các biến môi trường trong file `.env` được cấu hình chính xác.
- Tuân thủ quy tắc đặt tên và cấu trúc thư mục của dự án.
- Không chia sẻ các thông tin bảo mật như mật khẩu database hay JWT secret.
