const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json("Post not found");
    const removeComment = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );
    post.comments = removeComment;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
