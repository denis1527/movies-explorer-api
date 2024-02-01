const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, NODE_ENV } = require('../config');
const RequestUnauthorized401 = require('../error-handlers/request-unauthorized-401');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret-key', { expiresIn: '7d' });

const checkToken = (token) => {
  if (!token) {
    throw new RequestUnauthorized401('Недостаточно прав для выполнения операции.');
  }
  try {
    return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret-key');
  } catch (error) {
    throw error;
  }
};

const authentication = (req, res, next) => {
  const token = req.cookies.jwt;

  // Status 401:
  if (!token) {
    return next(new RequestUnauthorized401('Необходима авторизация.'));
  }
  let payload;
  try {
    payload = checkToken(token);
  } catch (error) {
    return next(new RequestUnauthorized401('Необходима авторизация.'));
  }

  req.user = payload;
  return next();
};

module.exports = { generateToken, authentication, checkToken };
