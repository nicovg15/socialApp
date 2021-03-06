const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json("Post not found");
    if (post.user.toString() !== req.user.toString())
      return res.status(401).json("You are not allowed to delete this post");
    await post.remove();
    res.json("Post deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
