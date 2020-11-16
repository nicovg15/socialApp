const { validationResult } = require("express-validator");
const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  try {
    let { usernameFromSearch } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let users = await User.find();
    let findUserByUsername = users.filter(
      (user) =>
        user.username.toString().toLowerCase().split(" ").join("") ===
        usernameFromSearch.toString().toLowerCase().split(" ").join(" ")
    );
    if (!findUserByUsername) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    res.json(findUserByUsername);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
