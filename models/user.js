const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const RequestUnauthorized401 = require('../error-handlers/request-unauthorized-401');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Неверный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Так по умолчанию хеш пароля пользователя не будет возвращаться из базы.
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // в случае аутентификации хеш пароля нужен.
    .then((user) => {
      // Status 401:
      if (!user) {
        throw new RequestUnauthorized401('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // Status 401:
          if (!matched) {
            throw new RequestUnauthorized401('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
