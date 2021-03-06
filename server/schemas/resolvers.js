const {
  AuthenticationError
} = require("apollo-server-express");
const CheckIn = require("../models/CheckIn");
const {
  User,
  Post,
  Comment,
  MessageThread,
  Message,
} = require("../models");
const {
  signToken
} = require("../utils/auth");
const nodemailer = require('nodemailer');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userdata = await User.findById({
            _id: context.user._id
          })
          .select("-__v -password")
          .populate({
            path: "posts",
            model: "Post",
          })
          .populate({
            path: "checkIn",
            model: "CheckIn",
          })
        // console.log("heres stuff", userdata)
        return userdata;
      }

      throw new AuthenticationError("Error verifying user");
    },

    getUserByUsername: async (parent, {
      username
    }) => {
      const user = await User.findOne({
        username
      });
      return user;
    },

    getUserById: async (parent, {
      _id
    }) => {
      const user = await User.findById({
        _id
      }).populate({
        path: "posts",
        model: "Post",
      })
      .populate({
        path: "checkIn",
        model: "CheckIn",
      });

      return user;
    },

    getCheckIn: async (parent,args, context) => {
      const checkIns = await CheckIn.find().sort({date: 1})
      .populate({
        path: "checkin",
        model: "CheckIn",
      }).populate({
        path: "user",
        model: "User",
      })
      // if user is admin, they see all checkins, otherwise they only see their own
      if(!context.user.administrator)return checkIns.filter((checkIn)=> {return checkIn.user._id == context.user._id});
      else return checkIns;
    },

    getComments: async (parent, idList) => {
      const comments = await Comment.find({
        "_id": {
          $in: idList
        }
      }).sort({date: 1})
      .populate({
        path: "comment",
        model: "Comment",
      });
      return comments
    },

    getAllPosts: async (parent) => {
      const posts = await Post.find().sort({date: 1})
      .populate({
        path: "post",
        model: "Post",
      }).populate({
        path: "user",
        model: "User",
      }).populate({
        path: "comments",
        model: "Comment",
        options: { sort: { 'date': -1 } }
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
      const posts = await Post.where(what_Gym)
        .populate({
          path: "post",
          model: "Post",
        });
      return posts;
    },

    getMessageThread: async (parent, {
      _id
    }) => {
      const messageThread = await MessageThread.findById({
          _id
        })
        .populate({
          path: "content",
        });
      return messageThread;
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

    addCheckIn: async(parent, args) => {
      const checkIn = await CheckIn.create({
        ...args,
        date: Date.now()
      });
      // console.log(checkIn);
      await User.findByIdAndUpdate({
        _id: args.user
      },{
        $push: {
          checkIn: checkIn._id
        }
      });

      return checkIn;
    },

    addNewPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          user: context.user._id,
          date: Date.now()
        });
        await User.findByIdAndUpdate({
          _id: context.user._id
        }, {
          $push: {
            posts: post._id
          }
        });

        return post;
      }

      throw new AuthenticationError("Not logged in");
    },

    editExistingPost: async (parent, args, context) => {
      if (context.user) {
        const {
          _id,
          viewedBy,
        } = args;
        // console.log(args);
        const post = await Post.findByIdAndUpdate(
          _id, {
            viewedBy: viewedBy,
          }
        );
        return post;
      }

      throw new AuthenticationError("Not logged in");
    },

    deletePost: async (parent, args, context) => {
      if (context.user) {
        const {
          _id
        } = args;
        // DELETES COMMENTS ASSOCIATED WITH THE POST
        const commentArr = await Comment.deleteMany({
          'post': _id
        })
        // DELETES THE POST ITSELF
        const post = await Post.findByIdAndDelete(_id);
        return (post);
      }
    },

    addNewComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({
          ...args,
          user: context.user._id,
          username: context.user.username,
          date: Date.now()
        });
        await Post.findByIdAndUpdate({
          _id: args.post
        }, {
          date: Date.now(),
          $push: {
            comments: comment._id
          }
        });

        return comment;
      }

      throw new AuthenticationError("Not logged in");
    },

    deleteComment: async (parent, args, context) => {
      if (context.user) {
        const {
          _id,
          post
        } = args;

        // REMOVES COMMENT FROM POST'S ARRAY OF COMMENTS
        await Post.findByIdAndUpdate({
          _id: post
        }, {
          $pull: {
            comments: _id
          }
        });
        // DELETES THE COMMENT ITSELF
        const comment = await Comment.findByIdAndDelete(_id);
        return (comment);
      }
    },

    // STILL HAVE TO FIGURE OUT HOW TO ADD BOTH USERS WHEN UPDATING USER MODEL

    addNewMessageThread: async (parent, args, context) => {
      if (context.user) {
        const messageThread = await MessageThread.create({
          ...args
        });
        await User.findByIdAndUpdate({
          _id: args._id
        }, {
          $push: {
            privateMessages: messageThread._id
          }
        });
        return messageThread;
      }
      throw new AuthenticationError("Not logged in");
    },

    addNewMessage: async (parent, args, context) => {
      if (context.user) {
        const message = await Message.create({
          ...args
        });
        await MessageThread.findByIdAndUpdate({
          _id: args._id
        }, {
          $push: {
            content: message._id
          }
        });
        return message;
      }
      throw new AuthenticationError("Not logged in");
    },

    helpMessage: async (parent, {
      user,
      email,
      content,
      helpWith
    }) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.HOST_EMAIL,
          pass: process.env.HOST_PW
        }
      });

      let mailOptions;
      // DECIDES WHO TO SEND MESSAGE TO
      helpWith == 'app' ? 
      mailOptions = {
        from: process.env.HOST_EMAIL,
        to: process.env.TO_EMAIL,
        subject: `Help request from ${user}`,
        text: content
      }:
      mailOptions = {
        from: process.env.HOST_EMAIL,
        to: process.env.TO_EMAIL,
        subject: `Help request from ${user}`,
        text: `${content} from ${email}`
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return(error);
        } else {
          return 'mailOptions';
        }
      });
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