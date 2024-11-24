"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//ROUTER INDEX:

//  URL: /

// Auth:
router.use("/auth", require("./authRouter"));

/* ------------------------------------------------------- */
module.exports = router;
