const express = require("express");
const { handleGetAllChats } = require("../../controllers/getChatsController");
const router = express.Router();

router.get("/", handleGetAllChats);

module.exports = router;
