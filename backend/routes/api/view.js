const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Post = require("../../models/Post");

router.post("", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has a post with the given postId
    const userPost = user.posts.find((postId) => postId.toString() === postId);

    if (userPost) {
      // If the user already has the post, return an error
      return res.status(400).json({ error: "User already has the post" });
    }

    // Find the post using postId
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Increment the numOfView
    post.numOfView += 1;

    // Add user's age to ageSum
    post.ageSum += user.age;

    // Increment maleViews or femaleViews based on user's gender
    if (user.gender === "male") {
      post.maleViews += 1;
    } else if (user.gender === "female") {
      post.femaleViews += 1;
    }

    // Push user's lat and lon to viewerLocations array
    post.viewerLocations.push({ lat: user.lat, lon: user.lon });

    // Save the updated post
    await post.save();

    res.json({ message: "Post viewed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
