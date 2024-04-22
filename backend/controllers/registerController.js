const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { firstname, lastname, email, pwd, age, gender, lat, lon } = req.body;

  if (!email || !pwd)
    return res.status(400).json({
      message: "Email & Password REQUIRED!",
    });

  console.log(req.body);

  if (!firstname || !lastname)
    return res.status(400).json({
      message: "First and Last name REQUIRED!",
    });

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(409).json({
      message: "Email already in use",
    });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPwd,
      age: age,
      gender: gender,
      lat: lat,
      lon: lon,
    });

    res.status(201).json({
      message: "Success! New user created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
