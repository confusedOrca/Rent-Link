const express = require("express");
const router = express.Router();
const getUserPostController = require("../../controllers/getUserPostController");

router.get("/", getUserPostController.handleGetPost);

module.exports = router;
