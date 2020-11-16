const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  try {
    const userEmail = req.params.user_email;
    const user = await User.findOne({ email: userEmail }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
