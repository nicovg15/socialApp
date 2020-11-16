const User = require("../../mongoSchemas/userSchema");
const Post = require("../../mongoSchemas/postSchema");
const { validationResult } = require("express-validator");
module.exports = async (req, res) => {
  try {
    const { name, lastname, username, avatar } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    const user = await User.findById(req.user).select("-password");

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!user) return res.status(404).json("User doesn't exists");

    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (username) user.username = username;

    const resp = await Post.updateMany(
      { user: user.id },
      { name: user.name, username: user.username }
    );

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
