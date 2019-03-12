const jsonwebtoken = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jsonwebtoken.verify(token, process.env.SECRET_KEY, function(
      error,
      decoded
    ) {
      if (error) return res.json({ message: 'Authentication failed' });

      if (decoded) {
        req.userData = {
          ...decoded
        };
        next();
      }
    });
  } catch (error) {
    return res.json({ message: 'Authentication faield' });
  }
};

module.exports = authenticateUser;
