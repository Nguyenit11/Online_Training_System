# Thư mục `utils/`

## Mục đích

Hàm **tái sử dụng**, không gắn trực tiếp với một route: format phản hồi API, helper JWT (nếu tách khỏi middleware), mã hóa/phân trang, v.v.

## Thứ tự làm việc

1. Khi thấy **cùng một đoạn logic** lặp ở 2+ controller/service → cân nhắc đưa vào `utils/`.
2. Giữ hàm **thuần** (ít side effect) khi có thể — dễ test.
3. Tránh để `utils/` phình to chứa cả nghiệp vụ — logic domain vẫn ưu tiên `services/`.

## Liên quan

- [../services/README.md](../services/README.md)
