require('dotenv').config();

const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET_KEY = 'JWT_SECRET_KEY' } = process.env;

module.exports = {
  PORT,
  DB_ADDRESS,
  JWT_SECRET_KEY,
};
