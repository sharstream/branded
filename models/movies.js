// Dependencies
// =============================================================
module.exports = function (sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN
    },
    video: {
      type: DataTypes.STRING
      // allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      validate: {
        len: [0, 500]
      }
    },
    release: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      validate: {
        len: [1800, 2100]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      validate: {
        len: [1, 5]
      }
    }
  }, {
    timestamps: false
  });
  return Movie;
};