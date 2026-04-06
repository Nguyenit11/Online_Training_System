# Thư mục `services/`

## Mục đích

Chứa **logic nghiệp vụ**: quy tắc đăng ký khóa học, chấm điểm, giới hạn quyền, gọi nhiều model trong một transaction, v.v.

## Thứ tự làm việc

1. **Sau khi** model trong `../models/` đã ổn định (hoặc đủ cho module đang làm).
2. Mỗi module nghiệp vụ một file (hoặc nhóm file) — ví dụ `courseService.js`, `enrollmentService.js`.
3. Service nhận tham số thuần (không phụ thuộc `req`/`res`) để dễ **unit test**.
4. Gọi Sequelize model / transaction tại đây; trả về dữ liệu hoặc ném lỗi có kiểu rõ ràng.

## Lưu ý

- Dự án đào tạo trực tuyến: tách rõ luồng “học viên đăng ký”, “theo dõi tiến độ”, “giảng viên tạo nội dung” để tránh trùng logic giữa các API.

## Liên quan

- Model: [../models/README.md](../models/README.md)  
- Controller gọi service: [../controllers/README.md](../controllers/README.md)
