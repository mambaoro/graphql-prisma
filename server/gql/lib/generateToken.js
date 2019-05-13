const jwt = require('jsonwebtoken');

module.exports = async (payload, options) =>
  jwt.sign(payload, process.env.SECRET_JWT, options);
