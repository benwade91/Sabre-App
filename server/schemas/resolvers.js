const {AuthenticationError} = require("apollo-server-express");
const {User, Post} = require("../models");
const {signToken} = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, context) => {
      if (context.user) {
        const userdata = await User.findById({
            _id: context.user._id
          })
          .select("-__v -password")
        return userdata;
      }

      throw new AuthenticationError("Not logged in");
    },

    getAllPosts: async (parent) => {
      const posts = await Post.find().populate({
        path: "post",
        model: "Post",
      });

      return posts;
    },

    getPostById: async (parent, {
      _id
    }) => {
      const post = await Post.findById({
        _id
      }).populate({
        path: "post",
        model: "Post",
      });

      return post;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return {
        token,
        user
      };
    },

    editUser: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate({
          _id: context.user._id
        },
        args, {
          new: true
        }
      );
      return user;
    },

    addNewPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          user: context.user._id,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { post: post._id } }
        );

        return post;
      }

      throw new AuthenticationError("Not logged in");
    },

    editExistingPost: async (parent, args, context) => {
      if (context.user) {
        const { _id, postData } = args;
        const post = await Post.findByIdAndUpdate(
          _id,
          postData,
          { new: true }
        );
        return post;
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, {
      email,
      password
    }) => {
      const user = await User.findOne({
        email
      });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return {
        token,
        user
      };
    },
  },
};

module.exports = resolvers;