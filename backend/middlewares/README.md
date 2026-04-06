# Thư mục `middlewares/`

## Mục đích

Chứa **middleware Express**: xác thực JWT, phân quyền theo role, validate body, xử lý lỗi tập trung.

## Thứ tự làm việc

1. **Sau khi** có khung app và biết route nào public / cần đăng nhập.
2. **`auth` / `authenticate`:** đọc header `Authorization: Bearer <token>`, verify bằng `jsonwebtoken`, gắn `req.user` (id, role, …).
3. **`authorize` (tuỳ chọn):** kiểm tra role (admin, instructor, student) trước khi vào controller.
4. **`errorHandler`:** middleware 4 tham số `(err, req, res, next)` — chuẩn hóa JSON lỗi, ẩn chi tiết nhạy cảm khi production.
5. Gắn middleware vào **route** hoặc **nhóm route**, không copy logic vào từng controller.

## Liên quan

- Dự án đã dùng `jsonwebtoken`, `bcrypt` — secret và thời hạn token nên lấy từ env (cấu hình trong `../config/`).
- [../routes/README.md](../routes/README.md)
