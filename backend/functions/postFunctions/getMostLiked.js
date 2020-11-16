const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
