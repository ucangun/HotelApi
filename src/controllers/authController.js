const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Blacklist = require("../models/blacklistModel");
const { promisify } = require("util");
const sendEmail = require("../helpers/sendEmail");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const blacklistToken = async (token) => {
  const decoded = jwt.decode(token);
  const expTimestamp = decoded.exp * 1000;

  await Blacklist.create({
    token: token,
    expiresAt: new Date(expTimestamp),
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isVerified: false,
  });

  const verificationToken = signToken(newUser._id);

  const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;

  const message = `Welcome to our application! Please verify your email by clicking the following link: \n\n ${verificationUrl}`;

  await sendEmail({
    email: newUser.email,
    subject: "Verify Your Email",
    message,
  });

  res.status(201).json({
    status: "success",
    message: "A verification email has been sent to your email address.",
  });
};

exports.verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid or missing token.",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found.",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      status: "fail",
      message: "Email already verified.",
    });
  }

  user.isVerified = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Email successfully verified!",
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

  // 3) Check if user isVerified
  if (!user.isVerified) {
    throw new Error("Please verify your email before logging in", 401);
  }

  // 4) If everything ok, send token to client
  createSendToken(user, 200, res);
};

exports.logout = async (req, res) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token && req.body.token) {
    token = req.body.token;
  }

  if (token) {
    await blacklistToken(token);
  }
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
