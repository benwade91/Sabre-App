const {AuthenticationError} = require("apollo-server-express");
const {User, Post, Comment, MessageThread, Message} = require("../models");
const {signToken} = require("../utils/auth");

const shortid = require("shortid");
const { createWriteStream, mkdir } = require("fs");
const File = require("../models/File");
const storeUpload = async ({ createReadStream, filename, mimetype }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
  createReadStream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};
const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  // const stream = createReadStream();
  const file = await storeUpload({ createReadStream, filename, mimetype });
  return file;
};

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userdata = await User.findById({
            _id: context.user._id
          })
          .select("-__v -password")
          .populate({
            path:"posts",
            model: "Post",
          })
        // console.log("heres stuff", userdata)
        return userdata;
      }

      throw new AuthenticationError("Error verifying user");
    },

    getUserById: async (parent, {
      _id
    }) => {
      const user = await User.findById({
        _id
      }).populate({
        path: "posts",
        model: "Post",
      });

      return user;
    },

    getComments: async ( parent, idList) => {
      const comments = await Comment.find({
        "_id": {$in: idList}
      }).populate({
        path: "comment",
        model: "Comment",
      });
      return comments
    },

    getAllPosts: async (parent) => {
      const posts = await Post.find().populate({
        path: "post",
        model: "Post",
      }).populate({
        path: "user",
        model: "User",
      }).populate({
        path: "comments",
        model: "Comment",
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
      }).populate({
        path: "comments",
        model: "Comment",
      });

      return post;
    },

    getPostByGym: async (parent, what_Gym) => {
      console.log(what_Gym)
      const posts = await Post.where(what_Gym)
      .populate({
        path: "post",
        model: "Post",
      });
      return posts;
    },

    getMessageThread: async (parent, {_id}) => {
      const messageThread = await MessageThread.findById({_id})
      .populate({
        path: "content",
      });
      return messageThread;
    },
    // uploads: (parent, args) => Image.find({}),
  },

  Mutation: {

    uploadFile: async (_, { file }) => {
      mkdir("images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      const upload = await processUpload(file);
      // save our file to the mongodb
      await File.create(upload);
      return upload;
    },

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
          { $push: { posts: post._id } }
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

    addNewComment: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user.username);
        const comment = await Comment.create({
          ...args,
          user: context.user._id,
          username: context.user.username,
        });
        await Post.findByIdAndUpdate(
          { _id: args.post },
          { $push: { comments: comment._id } }
        );

        return comment;
      }

      throw new AuthenticationError("Not logged in");
    },

    // STILL HAVE TO FIGURE OUT HOW TO ADD BOTH USERS WHEN UPDATING USER MODEL

    addNewMessageThread: async (parent, args, context) => {
      if (context.user) {
        const messageThread = await MessageThread.create({
          ...args
        });
        await User.findByIdAndUpdate(
          { _id: args._id },
          { $push: { privateMessages: messageThread._id } }
        );
        return messageThread;
      }
      throw new AuthenticationError("Not logged in");
    },

    addNewMessage: async (parent, args, context) => {
      if (context.user) {
        const message = await Message.create({
          ...args
        });
        await MessageThread.findByIdAndUpdate(
          { _id: args._id },
          { $push: { content: message._id } }
        );
        return message;
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