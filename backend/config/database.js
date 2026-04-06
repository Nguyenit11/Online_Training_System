const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Tắt logging SQL trong console để sạch sẽ
    define: {
      timestamps: true, // Tự động thêm createdAt, updatedAt
      underscored: true, // Sử dụng snake_case (created_at) trong DB
    },
    timezone: '+07:00', // Cấu hình múi giờ Việt Nam
  }
);

// Kiểm tra kết nối
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối MySQL thành công!');
  } catch (error) {
    console.error('❌ Không thể kết nối với MySQL:', error);
  }
};

checkConnection();

module.exports = sequelize;
