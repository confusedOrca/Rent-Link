const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res.status(400).json({
      message: "Email & Password REQUIRED!",
    });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" });

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.status(401).json({ message: "Incorrect password!" });

  const accessToken = jwt.sign(
    {
      email: foundUser.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  foundUser.refreshToken = refreshToken;
  const firstname = foundUser.firstname;
  const lastname = foundUser.lastname;
  const userId = foundUser._id.toString();
  const result = await foundUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ firstname, lastname, userId, accessToken });
};

module.exports = { handleLogin };
