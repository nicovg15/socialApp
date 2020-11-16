const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../../mongoSchemas/userSchema");

module.exports = async (req, res) => {
  const { name, lastname, username, email, password } = req.body;
  try {
    if (!name || !lastname || !username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "All the fields should be completed" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password is less than 8 characters" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "Account already exists" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const avatar = gravatar.url(email, {
      r: "pg",
      d: "mm",
      s: "200",
    });

    const newUser = new User({
      name,
      lastname,
      username,
      email,
      password: passwordHash,
      avatar,
    });
    const savedUser = await newUser.save();

    const payload = {
      user: { _id: newUser },
    };
    jwt.sign(payload, process.env.JWT_SECRETS, (err, token) => {
      if (err) throw err;
      res.json({ token, name, lastname, username, email, password });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
