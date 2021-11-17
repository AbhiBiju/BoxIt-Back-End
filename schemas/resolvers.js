const { AuthenticationError } = require("apollo-server-express");
const { User, Box } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("boxes");

        user.boxes.sort((a, b) => b.packingDate - a.packingDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async (parent, args) => {
      return User.find();
    },
    getUserBoxes: async (parent, { userId }) => {
      return await Box.find({ userId });
    },
    singleBox: async (parent, { boxId }) => {
      return await Box.findById(boxId);
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    //
    addBox: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const box = await Box.create(args);

        await User.findByIdAndUpdate(context.user._id, { $push: { boxes: box } });

        return box;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateBox: async (parent, args, context) => {
      if (context.box) {
        return await Box.findByIdAndUpdate(context.box._id, args, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
