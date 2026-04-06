# Thư mục `routes/`

## Mục đích

**Định nghĩa URL và HTTP method** — nối path với controller, gắn middleware (auth, validate) theo route.

## Thứ tự làm việc

1. **Sau khi** đã có khung Express và (tuỳ chọn) blueprint API trong tài liệu nghiệp vụ.
2. Chia route theo **module** (ví dụ `auth.routes.js`, `course.routes.js`).
3. Mỗi file: `Router` → `METHOD path` → middleware (nếu cần) → `controller.function`.
4. Trong `app.js` hoặc `index.js`: `app.use('/api/v1', ...)` gom các router con.

## Quy ước gợi ý

- Prefix phiên bản: `/api/v1/...` để sau này có thể thêm `v2` mà không phá client cũ.
- Route **không** chứa logic nghiệp vụ dài — chỉ định tuyến.

## Liên quan

- Controller xử lý từng handler: [../controllers/README.md](../controllers/README.md).
