const Post = require("../../mongoSchemas/postSchema");

module.exports = async (req, res) => {
  try {
    const posts = await Post.find();
    const userPosts = posts.filter(
      (post) => post.user.toString() === req.user.toString()
    );
    res.json(userPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
