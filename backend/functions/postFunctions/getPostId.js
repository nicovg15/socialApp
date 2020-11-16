const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
