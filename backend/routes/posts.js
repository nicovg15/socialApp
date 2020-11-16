const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { check } = require("express-validator");

const deleteComment = require("../functions/postFunctions/deleteComment");
const deleteLike = require("../functions/postFunctions/deleteLike");
const deletePost = require("../functions/postFunctions/deletePost");
const getMostLiked = require("../functions/postFunctions/getMostLiked");
const getMostRecent = require("../functions/postFunctions/getMostRecent");
const getPost = require("../functions/postFunctions/getPost");
const getPostId = require("../functions/postFunctions/getPostId");
const getUserPosts = require("../functions/postFunctions/getUserPosts");
const createPost = require("../functions/postFunctions/Post");
const putComment = require("../functions/postFunctions/putComment");
const putLike = require("../functions/postFunctions/putLike");
const userPostsUserId = require("../functions/postFunctions/userPostsUserId");

router.get("/", getPost);

router.get("/most_liked", getMostLiked);

router.get("/most_recent", getMostRecent);

router.get("/single_post/:post_id", getPostId);

router.get("/user_posts/:user_id", userPostsUserId);

router.get("/user_posts", auth, getUserPosts);

router.post(
  "/",
  auth,
  [check("textOfThePost", "Text is required").not().isEmpty()],
  createPost
);

router.put("/likes/:post_id", auth, putLike);

router.put(
  "/comment/:post_id",
  auth,
  [check("textOfTheComment", "Text is empty").not().isEmpty()],
  putComment
);

router.delete("/delete_post/:post_id", auth, deletePost);

router.delete("/delete_like/:post_id/:like_id", auth, deleteLike);

router.delete("/delete_comment/:post_id/:comment_id", auth, deleteComment);

module.exports = router;
