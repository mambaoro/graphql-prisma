const getUserId = require('../lib/getUserId');

module.exports = {
  // eslint-disable-next-line consistent-return
  isOwner: async (next, _, user, { prisma, req }) => {
    const userId = getUserId(req);
    try {
      const ownEmail = await prisma.exists.User({
        id: userId,
        email: user.email,
      });
      if (ownEmail) return next();
    } catch (e) {
      throw new Error('Must be owner of email');
    }
  },
};
