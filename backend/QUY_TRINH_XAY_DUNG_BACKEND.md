# Quy trình xây dựng backend — Hệ thống đào tạo trực tuyến

Tài liệu **tổng quan** các bước làm việc trên repo backend này. Chi tiết từng thư mục nằm trong file **README.md** tương ứng (xem [README.md](./README.md)).

**Stack tham chiếu:** Node.js, Express, Sequelize + MySQL (`mysql2`), JWT + bcrypt. Có thể dùng **sequelize-auto** sau khi đã có schema trên DB để sinh model nhanh.

---

## Sơ đồ thư mục và vai trò

```
backend/
├── README.md                 # Mục lục tài liệu
├── QUY_TRINH_XAY_DUNG_BACKEND.md   # File này — luồng tổng thể
├── index.js / app.js         # Khởi động server
├── config/                   # Env, kết nối Sequelize → [config/README.md](./config/README.md)
├── models/                   # Model Sequelize ↔ bảng SQL → [models/README.md](./models/README.md)
├── routes/                   # Định tuyến API → [routes/README.md](./routes/README.md)
├── controllers/              # HTTP ↔ service → [controllers/README.md](./controllers/README.md)
├── services/                 # Logic nghiệp vụ → [services/README.md](./services/README.md)
├── middlewares/              # Auth, validate, lỗi → [middlewares/README.md](./middlewares/README.md)
├── utils/                    # Helper dùng chung → [utils/README.md](./utils/README.md)
└── .env                      # Không commit (có .env.example nếu nhóm thêm)
```

---

## Luồng làm việc đề xuất (theo thứ tự)

### Giai đoạn A — Nghiệp vụ & dữ liệu (làm trước)

| Bước | Việc cần làm | Kết quả |
|------|----------------|---------|
| A1 | Xác định actor: học viên, giảng viên, quản trị; use case chính (đăng ký khóa học, học bài, làm bài kiểm tra, tiến độ…) | Danh sách chức năng + sơ đồ luồng đơn giản |
| A2 | Thiết kế **mô hình dữ liệu SQL**: bảng, PK/FK, ràng buộc; quy ước `created_at` / `updated_at` (và `deleted_at` nếu soft delete) | ERD hoặc script `.sql` tạo bảng |
| A3 | Tạo **database** trên server MySQL và **chạy script** tạo bảng (hoặc migration Sequelize nếu nhóm dùng migration từ đầu) | DB vật lý khớp thiết kế |

### Giai đoạn B — Config & models (ưu tiên ngay sau DB)

| Bước | Việc cần làm | Thư mục / tài liệu |
|------|----------------|-------------------|
| B1 | Cài dependency Sequelize stack nếu chưa: `sequelize`, dialect driver (`mysql2`), và tuỳ chọn `sequelize-cli` cho migration | `package.json` |
| B2 | Tạo `.env`, cấu hình kết nối, export instance Sequelize | [config/README.md](./config/README.md) |
| B3 | Tạo **model Sequelize**: viết tay **hoặc** dùng **sequelize-auto** trỏ vào DB đã có bảng → sinh file vào `models/`, sau đó **rà soát** quan hệ và tên | [models/README.md](./models/README.md) |

**Gợi ý sequelize-auto:** cài global `npm i -g sequelize-auto` **hoặc** chạy `npx sequelize-auto` khi cần — không bắt buộc cho runtime, chỉ hỗ trợ bước generate.

### Giai đoạn C — Khung HTTP

| Bước | Việc cần làm |
|------|----------------|
| C1 | Khởi Express: `cors`, `express.json()`, mount router, middleware xử lý lỗi tập trung |
| C2 | Endpoint kiểm tra: ví dụ `GET /health` hoặc `GET /api/v1/health` |

### Giai đoạn D — Bảo mật & chất lượng đầu vào

| Bước | Việc cần làm | Gói có sẵn |
|------|----------------|------------|
| D1 | Đăng ký/đăng nhập: hash mật khẩu `bcrypt`, cấp JWT `jsonwebtoken` | `bcrypt`, `jsonwebtoken` |
| D2 | Middleware xác thực / phân quyền theo role | [middlewares/README.md](./middlewares/README.md) |
| D3 | Validate body/query/params (zod, joi, express-validator…) | Cài thêm khi nhóm chọn |

### Giai đoạn E — Từng module nghiệp vụ (lặp)

Với mỗi nhóm API (khóa học, bài học, đăng ký, …):

1. **routes** — khai báo path và middleware.
2. **controllers** — gọi service, trả JSON.
3. **services** — quy tắc nghiệp vụ, transaction, gọi model.

Chi tiết: [routes](./routes/README.md), [controllers](./controllers/README.md), [services](./services/README.md).

### Giai đoạn F — Hoàn thiện vận hành

| Bước | Việc cần làm |
|------|----------------|
| F1 | Log có cấu trúc; phân biệt dev/prod khi trả lỗi cho client |
| F2 | `.env.example` (không chứa secret) để đồng đội cùng cấu hình |
| F3 | Test (service / API), rồi chuẩn bị deploy (HTTPS, process manager, backup DB) |

---

## Tóm tắt một dòng

**Thiết kế DB → tạo bảng trên server → `config` + `models` → Express → auth/validate → routes/controllers/services theo module → log, test, deploy.**

---

## Liên kết `package.json`

Đã có sẵn: `express`, `cors`, `dotenv`, `bcrypt`, `jsonwebtoken`, `nodemon`.  
Phần SQL/ORM: cần `sequelize` + `mysql2` (hoặc stack bạn đã cài). Công cụ **sequelize-auto** là tuỳ chọn cho bước sinh model, không nằm trong dependency runtime bắt buộc.

---

*Cập nhật theo cấu trúc dự án; chỉnh sửa khi nhóm đổi ORM hoặc nhà cung cấp DB.*
