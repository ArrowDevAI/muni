require('dotenv').config(); // Load environment variables from .env

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host:'127.0.0.1',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    username: process.env.HEROKU_DB_USERNAME, 
    password:process.env.HEROKU_DB_PASSWORD,
    database: process.env.HEROKU_DB_NAME,
    host:process.env.HEROKU_DB_HOST,
    dialect:'postgres',
    port:5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
