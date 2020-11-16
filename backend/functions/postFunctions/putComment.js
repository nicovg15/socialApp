const Post = require("../../mongoSchemas/postSchema");
const User = require("../../mongoSchemas/userSchema");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const { textOfTheComment } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const post = await Post.findById(req.params.post_id);
    const user = await User.findById(req.user).select("-password");
    if (!post) return res.status(404).json("Post not found");
    if (!user) return res.status(404).json("User not found");
    const newComment = {
      textOfTheComment,
      name: user.name,
      avatar: user.avatar,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json("Comment has been added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
