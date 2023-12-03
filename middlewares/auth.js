const jwt = require('jsonwebtoken');

const { ENVIRONMENT, SECRET_KEY } = require('../utils/config');

const CustomUnauthorizedError = require('../errors/customUnauthorizedError'); // 401
const { UNAUTHORIZED } = require('../utils/constants');

function authenticateUser(req, _, next) {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new CustomUnauthorizedError(UNAUTHORIZED));
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, ENVIRONMENT === 'production' ? SECRET_KEY : 'dev-secret');
  } catch (err) {
    return next(new CustomUnauthorizedError(UNAUTHORIZED));
  }

  req.user = payload;

  return next();
}

module.exports = authenticateUser;
