Tôi đang xây dựng Backend cho dự án Hệ thống đào tạo trực tuyến (LMS) bằng Node.js và MySQL. Dựa trên cấu trúc thư mục hiện tại, hãy thực hiện các nhiệm vụ kỹ thuật sau:

1. Thiết lập Cơ sở dữ liệu (MySQL):
- Tạo thư mục `database/` ở thư mục gốc.
- Tạo file `database/init.sql` để thiết kế các bảng: `Users`, `User_Auth`, `Roles`, `Courses`, `Classes`, `Enrollments` và bảng trung gian `User_Roles` (đảm bảo chuẩn hóa 3NF).
- Ràng buộc: Thiết lập đầy đủ Khóa chính (Primary Key), Khóa ngoại (Foreign Key), các ràng buộc NOT NULL, UNIQUE, và CHECK. Thêm Index cho các cột thường xuyên tìm kiếm như Email, Course Title.
- Tạo file `database/sample_data.sql` với khoảng 10 bản ghi mẫu cho mỗi bảng để phục vụ kiểm thử. Đảm bảo đầy đủ các mối quan hệ và tính toàn vẹn dữ liệu.

2. Cấu hình Backend (Sequelize):
- Cấu hình file `backend/config/database.js` để kết nối MySQL, sử dụng các biến môi trường từ file `.env` (bao gồm DB_HOST, DB_USER, DB_PASS, DB_NAME). Mật khẩu mặc định là `491220aaa`.
- Thêm script vào `backend/package.json` để chạy `sequelize-auto`, tự động quét Database và sinh ra các Models trong thư mục `backend/models/generated`.

3. Tài liệu & Sơ đồ:
- Viết file `database/database_analysis.md` mô tả chi tiết cấu trúc các bảng, mối quan hệ giữa chúng và các cơ chế đảm bảo toàn vẹn dữ liệu.
- Tạo file `database/erd.drawio` (định dạng XML của Draw.io) thể hiện sơ đồ thực thể mối quan hệ (ERD) của hệ thống.

Yêu cầu quan trọng:
- Ngôn ngữ: Toàn bộ nội dung file code, comment và tài liệu phải sử dụng tiếng Việt (trừ các từ khóa kỹ thuật).
- Kiến trúc: Đảm bảo tách biệt thông tin định danh (`User_Auth`) và thông tin người dùng (`Users`) để tối ưu bảo mật.
- Không tạo thêm các file bài tập hay thử thách (Challenge). Tập trung hoàn toàn vào việc xây dựng kiến trúc thực tế của đồ án.
- Tuân thủ cấu trúc thư mục hiện có của dự án.