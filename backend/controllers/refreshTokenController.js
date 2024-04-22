const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const firstname = foundUser.firstname;
    const lastname = foundUser.lastname;
    const userId = foundUser._id.toString();
    const email = foundUser.email;
    res.json({ firstname, lastname, email, userId, accessToken });
  });
};

module.exports = { handleRefreshToken };
