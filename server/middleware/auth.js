const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Bring a token from client
  const token = req.headers?.authorization.slice(7);

  // Decode a token
  const decoded = jwt.verify(token, process.env.PRIVATE_TOKEN);

  // After decryption, find a user
  const user = User.findOne({ _id: decoded, token });
  console.log(user);
  req.token = token;
  req.user = user;
  next();
};

module.exports = { auth };
