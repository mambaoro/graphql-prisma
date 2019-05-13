const bcrypt = require('bcrypt');

// This helper validate and hash password
const passwordOp = require('../lib/passwordValidation');
const getUserId = require('../lib/getUserId');
const genToken = require('../lib/generateToken');

module.exports = {
  Query: {
    users: async (
      _,
      { query, first, skip, after, orderBy },
      { prisma },
      info,
    ) => {
      const op = { first, skip, after, orderBy };
      if (query) {
        op.where = {
          OR: [{ name_contains: query }, { email_contains: query }],
        };
        return prisma.query.users(op, info);
      }
      return prisma.query.users(null, info);
    },
    me: async (_, __, { prisma, req }, info) => {
      const userId = getUserId(req);
      const op = {};
      op.where = { id: userId };
      const me = await prisma.query.users(op, info);
      if (!me) throw new Error('No user found');
      return me[0];
    },
  },
  Mutation: {
    createUser: async (_, { data: { name, email, password } }, { prisma }) => {
      const emailTaken = await prisma.exists.User({ email });
      if (emailTaken) throw new Error('Email is already taken');
      const op = {};
      if (!name || !email || !password)
        throw new Error(
          'Either name or email or password, or all are missing.',
        );
      const hash = await passwordOp(password);
      if (!hash) throw new Error('Password is not hashed');
      op.data = {
        name,
        email,
        password: hash,
      };
      const newUser = await prisma.mutation.createUser(op);
      let token;
      if (newUser) {
        token = await genToken(
          { userId: newUser.id },
          {
            keyid: '1x47d85s141sd',
            expiresIn: '7 days',
          },
        );
      }
      return newUser
        ? { user: newUser, token }
        : new Error('No user has been created');
    },
    login: async (_, { input: { email, password } }, { prisma }) => {
      if (!email || !password)
        throw new Error('Either email or password, or both, missing');
      const user = await prisma.query.user({ where: { email } });
      if (!user) throw new Error('No user found in the database');
      const hash = user.password;
      const isSamePassword = await bcrypt.compare(password, hash);
      if (!isSamePassword) throw new Error('Unable to login');
      const token = await genToken(
        { userId: user.id },
        {
          expiresIn: '7 days',
        },
      );
      return user && token
        ? { user, token }
        : new Error('Failed to login, verify email and password');
    },
    deleteUser: async (_, __, { prisma, req }, info) => {
      const id = getUserId(req);
      const op = {};
      if (!id) throw new Error('No id');
      const userExist = await prisma.exists.User({ id });
      if (!userExist) throw new Error('No user found');
      op.where = {
        id,
      };
      const deletedUser = await prisma.mutation.deleteUser(op, info);
      return deletedUser || new Error('No user has been deleted');
    },
    updateUser: async (_, { data }, { prisma, req }, info) => {
      const id = getUserId(req);
      const op = {};
      if (!id || !data) throw new Error('Missing id or no data to update user');
      const userExist = await prisma.exists.User({ id });
      if (!userExist) throw new Error('No user found');
      op.where = {
        id,
      };
      let password;
      if (data.password) {
        password = await passwordOp(data.password);
      }
      op.data = Object.assign(data, { password });
      const updatedUser = await prisma.mutation.updateUser(op, info);
      return updatedUser || new Error('No user has been updated');
    },
  },
  User: {
    email: async (user, __, { req }) => {
      const userId = getUserId(req, false);
      return (userId && userId === user.id && user.email) || null;
    },
    posts: async (user, _, { req }) => {
      const userId = getUserId(req);
      if (user && user.id === userId) {
        return user.posts.filter(post => post.published === true) || [];
      }
      return [];
    },
  },
};
