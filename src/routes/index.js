"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//ROUTER INDEX:

// Auth:
router.use("/auth", require("./authRouter"));

// Reservations:
router.use("/reservations", require("./reservationsRouter"));

// Rooms:
router.use("/rooms", require("./roomsRouter"));

/* ------------------------------------------------------- */
module.exports = router;
