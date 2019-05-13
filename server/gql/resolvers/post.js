const getUserId = require('../lib/getUserId');

module.exports = {
  Query: {
    posts: async (
      _,
      { query, first, skip, after, orderBy },
      { prisma },
      info,
    ) => {
      const op = { where: { published: true }, first, skip, after, orderBy };
      if (query) {
        op.where.OR = [{ title_contains: query }, { body_contains: query }];
        return prisma.query.posts(op, info);
      }
      return prisma.query.posts(op, info);
    },
    post: async (_, { id }, { prisma, req }, info) => {
      const userId = getUserId(req, false);
      const op = {};
      op.where = { id, OR: [{ published: true }, { author: { id: userId } }] };
      const post = await prisma.query.posts(op, info);
      if (!post.length) throw new Error('No post found');
      return post[0];
    },
    myPosts: async (
      _,
      { query, first, skip, after, orderBy },
      { prisma, req },
      info,
    ) => {
      const userId = getUserId(req);
      const op = {
        where: { author: { id: userId } },
        first,
        skip,
        after,
        orderBy,
      };
      if (query) {
        op.where.OR = [{ title_contains: query }, { body_contains: query }];
        return prisma.query.posts(op, info);
      }
      return prisma.query.posts(op, info);
    },
  },
  Mutation: {
    createPost: async (_, { data }, { prisma, req }, info) => {
      const userId = getUserId(req);
      if (!userId) throw new Error('Authentication required');
      const authorExists = await prisma.exists.User({ id: userId });
      if (!authorExists) throw new Error('No author found');
      const op = {};
      if (!data.title || !data.body || !userId)
        throw new Error('A field is missing');
      op.data = {
        title: data.title,
        body: data.body,
        published: data.published || false,
        author: {
          connect: {
            id: userId,
          },
        },
      };
      const newPost = await prisma.mutation.createPost(op, info);
      return newPost || new Error('No post has been created');
    },
    // eslint-disable-next-line no-unused-vars
    deletePost: async (_, { id }, { prisma, req }, info) => {
      const userId = getUserId(req);
      const postExists = await prisma.exists.Post({
        id,
        author: {
          id: userId,
        },
      });
      const op = {};
      if (!postExists) throw new Error('No post found');
      op.where = {
        id,
      };
      const deletedPost = await prisma.mutation.deletePost(op, info);
      return deletedPost;
    },
    updatePost: async (_, { id, data }, { prisma, req }, info) => {
      const userId = getUserId(req);
      const op = {};
      if (!id) throw new Error('No id');
      const postExists = await prisma.exists.Post({
        id,
        author: {
          id: userId,
        },
      });
      if (!postExists) throw new Error('No post found');
      op.where = { id };
      op.data = data;
      const updatedPost = await prisma.mutation.updatePost(op, info);
      // eslint-disable-next-line no-unused-expressions
      updatedPost &&
        !updatedPost.published &&
        (await prisma.mutation.deleteManyComments({ where: { post: { id } } }));
      return updatedPost;
    },
  },
  Subscription: {
    post: {
      subscribe: async (_, __, { prisma }, info) => {
        const op = {};
        op.where = { node: { published: true } };
        const post = await prisma.subscription.post(op, info);
        return post;
      },
    },
    myPost: {
      subscribe: async (_, __, { prisma, connection }, info) => {
        const userId = getUserId(connection);
        const op = {};
        op.where = { node: { author: { id: userId } } };
        const post = await prisma.subscription.post(op, info);
        return post;
      },
    },
  },
  Post: {},
};
