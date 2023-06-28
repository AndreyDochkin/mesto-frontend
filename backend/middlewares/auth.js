const { checkToken } = require('../utils/jwtAuth');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const payload = checkToken(token);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
};

module.exports = auth;
