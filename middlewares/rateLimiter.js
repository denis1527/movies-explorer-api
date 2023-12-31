const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: 'Превышено количество запросов на сервер. Попробуйте повторить позже',
});

module.exports = limiter;
