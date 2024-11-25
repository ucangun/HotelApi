const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const Blacklist = require("../models/blacklistModel");

const protect = async (req, res, next) => {
  // 1) Get the token from the request headers or cookies
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // 2) Check if the token exists
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 3) Check if the token is blacklisted
  const isBlacklisted = await Blacklist.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({
      status: "fail",
      message: "Token is no longer valid. Please log in again.",
    });
  }

  // 4) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 5) Check if the user still exis
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token no longer exists.",
    });
  }

  // 6) Grant access to the protected route
  req.user = currentUser;
  next();
};

module.exports = protect;
