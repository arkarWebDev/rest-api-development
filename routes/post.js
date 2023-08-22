const express = require("express");

const router = express.Router();

const postController = require("../controllers/post");

// GET /posts
router.get("/posts", postController.getPosts);

// POST /posts
router.post("/posts", postController.createPost);

module.exports = router;
