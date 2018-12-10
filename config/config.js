module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'movie_db',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
  }
};