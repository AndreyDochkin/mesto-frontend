const errorHandler = (err, req, res, next) => {
  console.error(err.statusCode);
  console.error(err.message);
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
