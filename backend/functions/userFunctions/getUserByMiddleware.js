const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
