const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const INACCURATE_DATA_ERROR = require('../errors/customNotFoundError');
const RESPONSE_MESSAGES = require('../utils/constants');

const { emailRegistration } = RESPONSE_MESSAGES[404].users;

const { EMAIL_REGEX } = require('../utils/validation');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => EMAIL_REGEX.test(email),
        message: 'Требуется ввести корректный электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
      },
    },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');

    if (user) {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) return user;
    }

    throw new INACCURATE_DATA_ERROR(emailRegistration);
  } catch (error) {
    return Promise.reject(error); // передаем ошибку в цепочку обработчиков ошибок
  }
};

module.exports = mongoose.model('user', userSchema);
