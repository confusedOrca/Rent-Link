const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const addPostController = require("../../controllers/addPostController");

router.post("/", fileUpload({ createParentPath: true }), addPostController.handleNewPost);

module.exports = router;
