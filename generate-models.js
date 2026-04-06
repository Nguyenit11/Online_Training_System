const SequelizeAuto = require('sequelize-auto');
require('dotenv').config();

const auto = new SequelizeAuto(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    directory: './models/generated', // Thư mục sẽ chứa các model được tạo ra
    port: process.env.DB_PORT || 3306,
    caseModel: 'c', // Chuyển snake_case sang camelCase cho thuộc tính: user_id -> userId
    caseFile: 'c', // Tên file: user_auth.js -> UserAuth.js
    singularize: true, // Chuyển tên bảng số nhiều sang số ít: users -> User
    additional: {
      timestamps: true,
    },
  }
);

auto.run().then((data) => {
  console.log('✅ Đã tạo các Model thành công từ Database!');
}).catch((err) => {
  console.error('❌ Lỗi khi tạo Model:', err);
});
