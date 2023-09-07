const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const tokenMatch = jwt.verify(token, process.env.JWT_KEY);
    if (!tokenMatch) {
      return res.status(401).json({ message: "Not authenticated." });
    }
    req.userId = tokenMatch.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated." });
  }
};

module.exports = isAuth;
