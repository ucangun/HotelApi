"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const { signup, login } = require("../controllers/authController");

// URL: /auth

router.post("/signup", signup);
router.post("/login", login);

/* ------------------------------------------------------- */
module.exports = router;
