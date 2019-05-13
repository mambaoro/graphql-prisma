const getUserId = require('../lib/getUserId');

module.exports = {
  Query: {
    comments: async (_, __, { prisma, first, skip, after, orderBy }, info) => {
      const op = { first, skip, after, orderBy };
      return prisma.query.comments(op, info);
    },
  },
  Mutation: {
    createComment: async (
      _,
      { data: { text, post } },
      { prisma, req },
      info,
    ) => {
      const userId = getUserId(req);
      const op = {};
      const postExists = await prisma.exists.Post({
        id: post,
        published: true,
      });
      const authorExists = await prisma.exists.User({ id: userId });
      if (!postExists || !authorExists)
        throw new Error('Either post or user, or both, missing');
      op.data = {
        text,
        author: { connect: { id: userId } },
        post: { connect: { id: post } },
      };
      const newComment = await prisma.mutation.createComment(op, info);
      return newComment || new Error('No comment created');
    },
    deleteComment: async (_, { id }, { prisma, req }, info) => {
      const userId = getUserId(req);
      const op = {};
      if (!id) throw new Error('No id');
      const commentExists = await prisma.exists.Comment({
        id,
        author: { id: userId },
      });
      if (!commentExists) throw new Error('No comment found');
      op.where = { id };
      const deletedComment = await prisma.mutation.deleteComment(op, info);
      return deletedComment;
    },
    updateComment: async (_, { id, data }, { prisma, req }, info) => {
      const userId = getUserId(req);
      const op = {};
      if (!id || !data)
        throw new Error('Either no id or data, or both, to update a comment');
      const commentExists = await prisma.exists.Comment({
        id,
        author: {
          id: userId,
        },
      });
      if (!commentExists) throw new Error('No comment found');
      op.where = { id };
      op.data = data;
      const updateComment = await prisma.mutation.updateComment(op, info);
      return updateComment;
    },
  },
  Subscription: {
    comment: {
      subscribe: async (_, { postId }, { prisma }, info) => {
        const op = {};
        if (!postId) throw new Error('No id provided');
        const postExists = await prisma.exists.Post({ id: postId });
        if (!postExists) throw new Error('No post found');
        op.where = { node: { post: { id: postId } } };
        const comment = await prisma.subscription.comment(op, info);
        return comment;
      },
    },
  },
  Comment: {},
};
