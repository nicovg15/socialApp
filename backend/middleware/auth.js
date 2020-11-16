const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No auth token, access denied" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRETS);
    if (!verifiedToken) {
      return res.status(401).json({ msg: "Token verified, auth denied" });
    }
    req.user = verifiedToken.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
