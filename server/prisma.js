const { Prisma } = require('prisma-binding');

module.exports = new Prisma({
  typeDefs: 'server/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
});
