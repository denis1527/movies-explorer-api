const bcrypt = require('bcrypt');
const User = require('../models/user');
const RequestConflict409 = require('../error-handlers/request-conflict-409');
const BadRequest400 = require('../error-handlers/bad-request-400');
const {generateToken} = require("../middlewares/auth");
const RequestUnauthorized401 = require("../error-handlers/request-unauthorized-401");

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
  // Status 201:
    .then((user) => {
      if (!user) {
        // Status 401:
        throw new RequestConflict409('Пользователь с таким емайлом уже существует в БД');
      }
      const token = generateToken({ _id: user._id }); // payload { _id: user._id }

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });

      res.status(201).json({name: user.name, email: user.email, token});
    })
    .catch((error) => {
      // Status 409:
      if (error.code === 11000) {
        return next(new RequestConflict409('Пользователь с таким емайлом уже существует'));
      }
      // Status 400:
      if (error.name === 'ValidationError') {
        return next(new BadRequest400());
      }
      // Status 500:
      return next(error);
    });
};

module.exports = { createUser };
