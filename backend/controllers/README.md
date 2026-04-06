# Thư mục `controllers/`

## Mục đích

**Điều phối request/response HTTP:** đọc `req` (body, params, query), gọi **service**, trả status code và JSON thống nhất.

## Thứ tự làm việc

1. **Sau khi** route đã trỏ tới đúng action.
2. Mỗi handler: validate (hoặc dựa vào middleware) → `await service.xxx()` → `res.status(...).json(...)`.
3. Bắt lỗi: `try/catch` hoặc chuyển lỗi sang middleware xử lý lỗi tập trung.
4. Không nhét SQL trực tiếp trong controller — logic và truy vấn nằm ở **service** / model.

## Lưu ý

- Controller mỏng giúp test và sửa logic tập trung ở `services/`.

## Liên quan

- [../services/README.md](../services/README.md)  
- [../middlewares/README.md](../middlewares/README.md)
