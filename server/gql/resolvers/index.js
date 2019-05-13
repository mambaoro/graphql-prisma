const userResolver = require('./user');
const postResolver = require('./post');
const commentResolver = require('./comment');
// const directiveResolvers = require('./directiveResolvers');

const resolvers = [userResolver, postResolver, commentResolver];

module.exports = resolvers;
