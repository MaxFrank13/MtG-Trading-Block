const { AuthenticationError } = require('apollo-server-express');
const { User, Card, Chat, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('binder');
      }
      throw new AuthenticationError('You must be logged in!');
    },
    users: async (parent, args) => {
      return await User.find();
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password.');
      }

      const token = signToken(user);

      return { token, user };
    },
    addChat: async (parent, { currentEmail, inviteEmail }) => {
      const current = await User.findOne({ currentEmail });

      if (!current) {
        throw new AuthenticationError('No current user data.');
      };

      const invite = await User.findOne({ inviteEmail });

      if (!invite) {
        throw new AuthenticationError('No user with that email.');
      };

      if (current && invite) {
        const newChat = await Chat.create();
        return newChat;
      }
    },
  }
}

module.exports = resolvers;
