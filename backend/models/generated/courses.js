const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    level: {
      type: DataTypes.ENUM('beginner','intermediate','advanced'),
      allowNull: true,
      defaultValue: "beginner"
    }
  }, {
    sequelize,
    tableName: 'courses',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_course_title",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
      {
        name: "fk_course_instructor",
        using: "BTREE",
        fields: [
          { name: "instructor_id" },
        ]
      },
    ]
  });
};
