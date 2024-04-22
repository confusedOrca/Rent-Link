const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const BASE_URL = "http://localhost:3500";
const EMAIL = "rentlinksmartrenttenantfinder@gmail.com";
const PASSWORD = "ksfhpxeezntflszt";

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

/** send mail from real gmail account */
const getbill = (userEmail) => {
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "RentLink Smart Rent & Tenant Finder",
      intro: "Your image posting link is attached",
      table: {
        data: [
          {
            item: "Image link",
            Link: "http//www.+++.//",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "RentLink: Image Posting link",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {})
    .catch((error) => {
      console.log("failed");
    });
};

const handleNewPost = async (req, res) => {
  const files = req.files;
  console.log(files);
  const { userId, locationName, rent, size, descrp, img, email, lat, long } = req.body;
  const imageLinks = [];

  if (!userId || !locationName || !rent || !size) {
    return res.status(400).json({
      message: "Incomplete fields",
    });
  }

  if (files) {
    Object.keys(files).forEach((key) => {
      const filename = `${userId}${uuidv4()}${files[key].name}`;
      const filepath = path.join("files", filename);
      console.log(key);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ message: "Could not upload pictures!" });
      });
      const link = path.join(BASE_URL, filename);
      imageLinks.push(link);
    });
  } else {
    try {
      //getbill(email);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const uid = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(uid);

    var postFields = {
      _creator: uid,
      locationName: locationName,
      rent: rent,
      size: size,
      descrp: descrp || null,
      img: imageLinks,
    };

    if (!isNaN(lat)) {
      postFields = {
        ...postFields,
        lat: lat,
      };
    }

    if (!isNaN(long)) {
      postFields = {
        ...postFields,
        long: long,
      };
    }

    const result = await Post.create(postFields);
    user.posts.push(result._id);
    await user.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

module.exports = { handleNewPost };
