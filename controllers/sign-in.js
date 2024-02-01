const User = require('../models/user');
const RequestUnauthorized401 = require('../error-handlers/request-unauthorized-401');
const { generateToken } = require('../middlewares/auth');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        // Status 401:
        throw new RequestUnauthorized401('Пользователь с таким емайлом не существует в БД');
      }

      const token = generateToken({ _id: user._id }); // payload { _id: user._id }
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.json({ token, name: user.name, email: user.email });
    })
    // Status 500:
    .catch(next);
};

module.exports = { login };
