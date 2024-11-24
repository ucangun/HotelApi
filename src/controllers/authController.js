const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const accessToken = signAccessToken(user._id);

  res.status(statusCode).json({
    status: "success",
    accessToken,
    data: {
      user,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    throw new Error("Please provide email and password!", 400);
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error("Incorrect email or password", 401);
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};
