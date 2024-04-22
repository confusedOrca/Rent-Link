const express = require("express");
const router = express.Router();
const getPostController = require("../../controllers/getPostController");

router.get("/:id", getPostController.handleGetPost);

module.exports = router;
