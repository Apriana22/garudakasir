const jwt = require('jsonwebtoken');
const config = require('./../../../config/config.json')

const accessToken = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader === undefined) return res.sendStatus(403);
  const token = authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    if (config.blacklistedTokens.includes(token)) {
      return res.status(401).json({ message: 'Token has been blacklisted' });
    }
    config.user.id = decoded.id;
    config.user.email = decoded.email;
    res.locals.userId = decoded.id;
    next();
  });
};

module.exports = { accessToken };