const User = require("../models/User");
const Chat = require("../models/Chat");
const { Mongoose, default: mongoose } = require("mongoose");

const handleGetChat = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) {
    return res.status(405).json({
      message: "Invalid user",
    });
  }

  try {
    const { chatterId } = req.body;
    const cid = new mongoose.Types.ObjectId(chatterId);

    let chat = await Chat.findOne({
      users: { $all: [foundUser._id, cid] },
    }).populate("users messages");

    if (!chat) {
      chat = await Chat.findOne({
        users: { $all: [cid, foundUser._id] },
      }).populate("users messages");
    }

    const chatter = await User.findById(cid);

    if (!chatter) {
      return res.status(405).json({
        message: "Invalid user",
      });
    }

    if (!chat) {
      chat = new Chat({
        _creator: foundUser._id,
        users: [foundUser._id, cid],
        messages: [],
      });

      await chat.save();

      foundUser.chats.push(chat._id);
      await foundUser.save();
      chatter.chats.push(chat._id);
      await chatter.save();

      await chat.populate("users messages");
    }

    res.send(chat);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving or creating chat",
    });
  }
};

module.exports = { handleGetChat };
