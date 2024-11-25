"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const protect = require("../helpers/authentication");
/* ------------------------------------------------------- */

const {
  signup,
  login,
  logout,
  verifyEmail,
} = require("../controllers/authController");

// URL: /auth

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/verify-email", verifyEmail);

/* ------------------------------------------------------- */
module.exports = router;
