const Post = require("../models/Post");
const { ObjectId } = require("mongodb");

const handleGetPost = async (req, res) => {
  try {
    const postId = new ObjectId(req.params["id"]);

    const foundPost = await Post.findById(postId).exec();
    if (!foundPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    return res.status(201).json(foundPost);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

module.exports = { handleGetPost };
