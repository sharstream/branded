// Dependencies
// =============================================================
//src/models/movies.js
export default (sequelize, DataTypes) =>
  sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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
      },
    },
    release: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      validate: {
        max: 2100, // only allow values <= 2100
        min: 1800, // only allow values >= 1800
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      validate: {
        max: 5, // only allow values <= 5
        min: 0, // only allow values >= 0
      },
    },
  }, {
    timestamps: false,
    tableName: 'movies',
  });