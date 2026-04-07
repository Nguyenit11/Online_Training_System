const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const courseRoutes = require('./routes/courseRoutes');
const classRoutes = require('./routes/classRoutes');


// Routes cơ bản
app.get('/', (req, res) => {
    res.json({
        message: "Chào mừng bạn đến với API Hệ thống Đào tạo Trực tuyến (LMS)",
        status: "Server is running 🚀"
    });
});

app.get('/health', (req, res) => {
    res.json({ status: "OK", timestamp: new Date() });
});

// Routes nghiệp vụ
app.use('/api/courses', courseRoutes);
app.use('/api/classes', classRoutes);


// Middleware xử lý lỗi 
app.use(errorHandler);

// Kiểm tra kết nối Database và khởi động Server
const startServer = async () => {
    try {
        // Authenticate đã được gọi trong config/database.js, 
        // nhưng gọi lại ở đây để đảm bảo server chỉ chạy khi DB sẵn sàng
        await sequelize.authenticate();
        console.log('✅ Kết nối Cơ sở dữ liệu thành công.');

        // Đồng bộ Models (tùy chọn: { alter: true } nếu muốn tự động cập nhật cấu trúc)
        // await sequelize.sync(); 

        app.listen(port, () => {
            console.log(`Server đang chạy tại: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Lỗi khởi động Server:', error);
        process.exit(1);
    }
};

startServer();
