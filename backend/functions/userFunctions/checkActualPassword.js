const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  try {
    const { passwordToCheck } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json("Passwords doesn't match");
    }
    let user = await User.findById(req.user);
    let passwordMatch = await bcrypt.compare(passwordToCheck, user.password);
    if (!passwordMatch) return res.status(404).json("Passwords doesn't match");
    res.json("Correct password");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
