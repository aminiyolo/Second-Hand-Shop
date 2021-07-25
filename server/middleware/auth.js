const { User } = require("../models/user");

let auth = (req, res, next) => {
  // Bring a token from client
  let token = req.cookies.USER;
  // After decryption, find a user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, err });
    // If there is a user, then Authenticate
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
