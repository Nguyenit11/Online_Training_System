# Phân tích Cơ sở dữ liệu - Hệ thống LMS

Hệ thống sử dụng cơ sở dữ liệu quan hệ MySQL để quản lý quy trình đào tạo trực tuyến. Cấu trúc được thiết kế nhằm đảm bảo tính toàn vẹn dữ liệu, hiệu suất truy vấn và khả năng mở rộng.

## 1. Các thực thể chính và Quan hệ

### 1.1. Người dùng và Định danh
- **`users`**: Lưu trữ thông tin cá nhân cơ bản (họ tên, email, số điện thoại).
- **`user_auth`**: Lưu trữ thông tin đăng nhập nhạy cảm (hash mật khẩu, token).
- **Quan hệ**: `1:1` giữa `users` và `user_auth`. Việc tách biệt giúp tăng cường bảo mật và tối ưu hóa khi chỉ cần truy vấn thông tin cá nhân mà không cần dữ liệu định danh.

### 1.2. Vai trò và Phân quyền
- **`roles`**: Định nghĩa các vai trò trong hệ thống (Admin, Instructor, Student).
- **`user_roles`**: Bảng trung gian quản lý vai trò của người dùng.
- **Quan hệ**: `N:N` giữa `users` và `roles`. Một người dùng có thể đảm nhận nhiều vai trò (ví dụ: vừa là học viên, vừa là giảng viên trợ giảng).

### 1.3. Khóa học và Lớp học
- **`courses`**: Thông tin tổng quan về khóa học.
- **`classes`**: Các lớp học cụ thể được mở cho một khóa học.
- **Quan hệ**:
    - `1:N` giữa `users` (Instructor) và `courses`: Một giảng viên quản lý nhiều khóa học.
    - `1:N` giữa `courses` và `classes`: Một khóa học có thể có nhiều đợt mở lớp khác nhau (K01, K02...).

### 1.4. Đăng ký học tập
- **`enrollments`**: Quản lý việc học viên đăng ký vào các lớp học.
- **Quan hệ**: `N:N` giữa `users` (Student) và `classes` thông qua bảng `enrollments`. Lưu trữ thêm thông tin về tiến độ (`progress`) và trạng thái (`status`).

## 2. Đảm bảo toàn vẹn dữ liệu

- **Khóa ngoại (Foreign Keys)**: Ràng buộc chặt chẽ giữa các bảng (ví dụ: không thể xóa một lớp học nếu đang có học viên đăng ký mà không xử lý dữ liệu liên quan).
- **Ràng buộc Duy nhất (Unique Constraints)**: Đảm bảo email người dùng là duy nhất và mỗi học viên chỉ có thể đăng ký một lớp học cụ thể một lần.
- **Chuẩn hóa 3NF**: Loại bỏ dư thừa dữ liệu, đảm bảo mỗi thuộc tính chỉ phụ thuộc vào khóa chính của bảng đó.
- **Indexes**: Thêm chỉ mục cho `email` (bảng `users`) và `title` (bảng `courses`) để tăng tốc độ tìm kiếm khi số lượng bản ghi lớn.
- **Engine InnoDB**: Hỗ trợ ACID và khóa ngoại, đảm bảo an toàn dữ liệu trong các giao dịch (Transactions).
