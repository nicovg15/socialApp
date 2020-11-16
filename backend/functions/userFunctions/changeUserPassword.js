const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json("New password should have more than 8 characters");
    }

    let user = await User.findById(req.user);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.json("Password changed");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
