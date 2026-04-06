# Backend — Hệ thống Đào tạo Trực tuyến (LMS)

Dự án này là phần Backend cho hệ thống quản lý học tập (LMS), được xây dựng trên nền tảng Node.js, Express và MySQL.

## 1. Mục tiêu dự án
- Xây dựng hệ thống quản lý đào tạo trực tuyến mạnh mẽ, có khả năng mở rộng.
- Đảm bảo dữ liệu được chuẩn hóa (3NF) và tính toàn vẹn cao.
- Triển khai cơ chế xác thực và phân quyền bảo mật (JWT & Bcrypt).
- Cung cấp RESTful API cho phía Frontend.

## 2. Yêu cầu đầu vào
- **Môi trường:** Node.js (v16+) và npm/yarn.
- **Cơ sở dữ liệu:** MySQL Server (v8.0+).
- **Công cụ hỗ trợ:** Postman hoặc Thunder Client để kiểm thử API.

## 3. Thư viện sử dụng
- **Framework:** `express` (v5.2.1)
- **ORM:** `sequelize` (v6.37.8) & `mysql2` (v3.20.0)
- **Bảo mật:** `bcrypt` (v6.0.0), `jsonwebtoken` (v9.0.3)
- **Cấu hình:** `dotenv` (v17.4.0)
- **Công cụ phát triển:** `nodemon`, `sequelize-auto` (sinh model tự động)

## 4. Quy trình thực hiện chi tiết
1. **Thiết kế & Khởi tạo Database:**
   - Phân tích thực thể và mối quan hệ (ERD).
   - Chạy script `database/init.sql` để tạo cấu trúc bảng.
   - Nạp dữ liệu mẫu bằng `database/sample_data.sql`.
2. **Cấu hình Kết nối:**
   - Thiết lập file `.env` với các thông tin kết nối MySQL.
   - Cấu hình Sequelize trong `config/database.js`.
3. **Sinh Models:**
   - Sử dụng `sequelize-auto` để tự động tạo các model từ cấu trúc database đã có.
   - Rà soát và bổ sung các quan hệ (Associations) trong models.
4. **Phát triển Logic (Module hóa):**
   - **Utils:** Viết các hàm dùng chung (xử lý token, format response).
   - **Middlewares:** Cấu hình xác thực JWT, phân quyền, validate dữ liệu.
   - **Services:** Xử lý logic nghiệp vụ và tương tác database.
   - **Controllers:** Điều hướng yêu cầu và trả về kết quả JSON.
   - **Routes:** Định nghĩa các endpoint API.
5. **Khởi chạy Server:** Kết nối mọi thành phần trong `index.js`.

## 5. Cách chạy và Kiểm thử
### Cách chạy:
1. Di chuyển vào thư mục backend: `cd backend`
2. Cài đặt thư viện: `npm install`
3. Cấu hình file `.env` (copy từ `.env.example` nếu có).
4. Khởi chạy server (chế độ development): `npm run dev` (hoặc `npx nodemon index.js`)

### Kiểm thử:
- Sử dụng Postman để gọi các endpoint API.
- Kiểm tra tính đúng đắn của dữ liệu trong MySQL Workbench hoặc CLI.
- Xác thực luồng đăng ký/đăng nhập và truy cập các tài nguyên được bảo vệ.

## 6. Chuẩn đầu ra cần đạt
- Cấu trúc thư mục sạch sẽ, module hóa rõ ràng.
- Database đạt chuẩn 3NF, không dư thừa dữ liệu.
- API phản hồi đúng mã trạng thái HTTP (200, 201, 400, 401, 403, 500).
- Dữ liệu nhạy cảm (mật khẩu) được mã hóa an toàn.
- Tài liệu hóa đầy đủ các API và cấu trúc database.

## 7. Các lưu ý quan trọng
- **Bảo mật:** Luôn tách biệt bảng `User_Auth` và `Users`. Không bao giờ lưu mật khẩu dưới dạng văn bản thuần.
- **Biến môi trường:** Không bao giờ commit file `.env` lên Git.
- **Quy ước đặt tên:** Sử dụng `camelCase` cho biến/hàm và `PascalCase` cho Models. Tên bảng trong database nên dùng `snake_case`.
- **Xử lý lỗi:** Luôn có khối `try-catch` và middleware xử lý lỗi tập trung để tránh crash server.

---
*Tài liệu chi tiết hơn về luồng làm việc có thể xem tại: [QUY_TRINH_XAY_DUNG_BACKEND.md](./QUY_TRINH_XAY_DUNG_BACKEND.md)*
