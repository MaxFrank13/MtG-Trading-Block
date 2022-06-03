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
    },
    myChats: async (parent, args, context) => {
      const chats =  await Chat.find().populate('users').populate('messages');
      return chats;
      // return chats.filter(chat => {
      //   for (let i = 0; i < chat.users.length; i++) {
      //     if (chat.users[i]._id == context.user._id) return true;
      //   }
      //   return false;
      // });

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
    addChat: async (parent, { inviteEmail }, context) => {
      const current = await User.findOne({ email: context.user.email });

      if (!current) {
        throw new AuthenticationError('No current user data. Make sure you are signed in.');
      };

      const invite = await User.findOne({ email: inviteEmail });

      if (!invite) {
        throw new AuthenticationError('No user with that email.');
      };

      const users = [current, invite]

      if (current && invite) {
        const newChat = await Chat.create({
          users
        });
        return newChat;
      }
    },
    addMessage: async (parent, {chat_id, username, createdAt, content}, context) => {
      const newMessage = await Message.create({
        chat_id,
        username,
        createdAt,
        content
      });

      const chat = await Chat.findOneAndUpdate(
        { _id: chat_id },
        { $addToSet: { messages: newMessage }},
        { new: true }
      );

      return chat;
    }
  }
}

module.exports = resolvers;
