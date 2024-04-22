const express = require("express");
const Message = require("../../models/Message");
const User = require("../../models/User");
const Chat = require("../../models/Chat");
const router = express.Router();

const sendMessage = async (req, res) => {
  const { chatId, text, isAudio, transcription } = req.body;

  if (!chatId || !text) return res.sendStatus(400);

  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    return res.status(405).json({
      message: "Invalid user",
    });
  }

  var newMsg = {
    sender: foundUser._id,
    text: text,
    chat: chatId,
    isAudio: isAudio,
    transcription: transcription,
  };

  try {
    const chat = await Chat.findById(chatId);
    var message = await Message.create(newMsg);
    chat.messages.push(message);
    await chat.save();
    message = await message.populate("sender", "firstname lastname");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstname lastname",
    });

    res.json(message);
  } catch (error) {
    res.status(400);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstname lastname")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
  }
};

router.post("/", sendMessage);
router.get("/:id", getAllMessages);

module.exports = router;
