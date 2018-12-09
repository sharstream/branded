// Dependencies
// =============================================================
//src/models/users.js
export default (sequelize, DataTypes) => 
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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
