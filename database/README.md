# Database — Hệ thống Đào tạo Trực tuyến (LMS)

Thư mục này chứa các script SQL và tài liệu liên quan đến cơ sở dữ liệu của dự án.

## 1. Mục tiêu
- Xây dựng mô hình dữ liệu chuẩn hóa (3NF).
- Quản lý người dùng, khóa học, lớp học và đăng ký học tập.
- Đảm bảo tính toàn vẹn dữ liệu thông qua các ràng buộc (Constraints).

## 2. Các file chính
- `init.sql`: Chứa script tạo bảng (Schema) cho dự án.
- `sample_data.sql`: Chứa dữ liệu mẫu để chạy thử nghiệm (~10 bản ghi mỗi bảng).
- `database_analysis.md`: Tài liệu phân tích chi tiết cấu trúc bảng và các mối quan hệ.
- `erd.drawio`: Sơ đồ thực thể mối quan hệ (ERD) dạng XML.

## 3. Quy trình thiết lập
1. Tạo một database mới trong MySQL (ví dụ: `lms_db`).
2. Mở file `init.sql` và thực thi script trong trình quản lý MySQL (Workbench, CLI, ...).
3. Sau khi tạo xong cấu trúc, thực thi `sample_data.sql` để nạp dữ liệu mẫu.

## 4. Chuẩn đầu ra
- Database hoạt động ổn định, không có lỗi khóa ngoại.
- Dữ liệu mẫu phong phú, đủ để kiểm thử các trường hợp nghiệp vụ.
- Tài liệu ERD khớp hoàn toàn với cấu trúc thực tế của database.

## 5. Lưu ý
- Luôn kiểm tra tính tương thích của phiên bản MySQL (khuyến nghị 8.0+).
- Đảm bảo các ràng buộc (Foreign Key, Check) hoạt động chính xác để tránh dữ liệu rác.
- Tách biệt thông tin nhạy cảm (`User_Auth`) ra khỏi thông tin cá nhân (`Users`).
