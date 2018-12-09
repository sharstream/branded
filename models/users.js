// Dependencies
// =============================================================
//src/models/users.js

export default (sequelize, DataTypes) => 
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      auteIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      default: Date.now
    }
  }, {
    timestamps: false,
    tableName: 'users'
  });
