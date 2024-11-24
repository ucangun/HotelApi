"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const { signup, login, logout } = require("../controllers/authController");

// URL: /auth

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

/* ------------------------------------------------------- */
module.exports = router;
