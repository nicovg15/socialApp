const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json("Post not found");
    const removeLike = post.likes.filter(
      (like) => like._id.toString() !== req.params.like_id.toString()
    );
    post.likes = removeLike;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
