const User = require("../models/User");

const handleGetAllChats = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) {
    return res.status(405).json({
      message: "Invalid user",
    });
  }

  try {
    const allChats = (await foundUser.populate("chats")).chats;
    const populatedChats = [];
    for (const chat of allChats) {
      const populatedChat = await chat.populate("users");
      populatedChats.push(populatedChat);
    }

    return res.status(201).json(populatedChats);
  } catch (error) {
    return null;
  }
};

module.exports = { handleGetAllChats };
