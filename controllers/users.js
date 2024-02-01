const User = require('../models/user');
const BadRequest400 = require('../error-handlers/bad-request-400');
const NotFound404 = require('../error-handlers/not-found-404');
const RequestConflict409 = require('../error-handlers/request-conflict-409');
// Get Current User
const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      // Status 404:
      return next(new NotFound404(`Пользователь по указанному id: ${userId} не найден.`));
    }
    // Status 200:
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      // Status 400:
      return next(new BadRequest400('Указан некорректный id.'));
    }
    // Status 500:
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updData = {
      name,
      email,
    };

    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(userId, updData, { new: true, runValidators: true });

    if (!user) {
      // Status 404:
      return next(new NotFound404(`Пользователь с указанным id: ${userId} не найден.`));
    }
    // Status 200:
    res.send(user);
  } catch (error) {
    // Status 400:
    if (error.name === 'ValidationError') {
      return next(new BadRequest400('Переданы некорректные данные при обновлении профиля.'));
    }
    if (error.code === 11000) {
      return next(new RequestConflict409('Пользователь с таким емайлом уже существует'));
    }
    // Status 500:
    return next(error);
  }
};

module.exports = { getCurrentUser, updateUser };
