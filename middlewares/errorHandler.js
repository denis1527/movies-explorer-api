const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message });
  next();
};

module.exports = errorHandler;
