const express = require("express");
const { handleGetChat } = require("../../controllers/getChatController");
const router = express.Router();

router.post("/", handleGetChat);

module.exports = router;
