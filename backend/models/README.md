# Thư mục `models/`

## Mục đích

Chứa **model Sequelize** — ánh xạ bảng SQL sang class/object trong Node, định nghĩa quan hệ (`hasMany`, `belongsTo`, …).

## Thứ tự làm việc

1. **Hoàn tất thiết kế database** (ERD / script SQL) và **đã tạo bảng** trên server DB.
2. Đảm bảo `../config/` đã có instance Sequelize kết nối được.
3. Tạo model theo một trong hai cách:
   - **sequelize-auto (tiện khi DB đã có sẵn bảng):**  
     Cài cục bộ hoặc dùng `npx sequelize-auto` với tham số host, database, user, password, dialect, thư mục output trỏ vào `models/` (hoặc thư mục con). Sau đó **rà soát và chỉnh** tên file, quan hệ, index cho đúng nghiệp vụ.
   - **Viết tay:** tạo từng file model khớp bảng; khai báo `associate` trong `models/index.js` nếu dùng pattern Sequelize chuẩn.
4. Đồng bộ với team: mọi thay đổi schema SQL → cập nhật migration (nếu dùng) hoặc cập nhật model + script SQL.

## Lưu ý

- Model phải **khớp** kiểu cột và ràng buộc thực tế trên DB (tránh lệch kiểu dữ liệu).
- Sau khi generate bằng `sequelize-auto`, nên **đọc lại code** — tool không thay thế review nghiệp vụ.

## Liên quan

- Phụ thuộc cấu hình: [../config/README.md](../config/README.md).
- Tiếp theo: service/controller gọi model khi làm API — [../services/README.md](../services/README.md).
