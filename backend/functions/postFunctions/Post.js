const Post = require("../../mongoSchemas/postSchema");
const User = require("../../mongoSchemas/userSchema");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const { textOfThePost } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(400).json({ msg: "User not found" });

    const newPost = new Post({
      textOfThePost,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      user: req.user,
      date: Date.now(),
    });
    await newPost.save();
    res.json("Post created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
