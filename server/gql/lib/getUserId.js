const jwt = require('jsonwebtoken');

module.exports = (req, requireAuth = true) => {
  const header =
    (req.headers && req.headers.authorization) ||
    (req.context && req.context.authorization);
  if (header) {
    const [, token] = header.split(' ');
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    if (!decoded) throw new Error('Failed to authenticate');
    return decoded.userId;
  }

  if (requireAuth) throw new Error('Authentication required');
  return null;
};
