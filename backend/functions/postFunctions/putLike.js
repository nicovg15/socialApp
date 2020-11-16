const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json("Post not found");
    if (post.likes.find((like) => like.user.toString() === req.user)) {
      return res.status(401).json("Post is already like by you");
    }

    const newLike = {
      user: req.user,
    };

    post.likes.unshift(newLike);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
