const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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
            console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Lỗi khởi động Server:', error);
        process.exit(1);
    }
};

startServer();
