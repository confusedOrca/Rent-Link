const User = require("../models/User");

const handleGetPost = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    return res.status(405).json({
      message: "Invalid user",
    });
  }
  const populatedUser = await foundUser.populate("posts");
  return res.status(201).json(populatedUser.posts);
};

module.exports = { handleGetPost };
