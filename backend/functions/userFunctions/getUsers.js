const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  try {
    let users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
