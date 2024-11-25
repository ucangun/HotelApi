"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const protect = require("../helpers/authentication");

const {
  list: listReservations,
  create: createReservation,
  read: readReservation,
  update: updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

// URL: /reservations
router.get("/", protect, listReservations);
router.post("/", protect, createReservation);

router.get("/:id", protect, readReservation);
router.put("/:id", protect, updateReservation);
router.delete("/:id", protect, deleteReservation);

/* ------------------------------------------------------- */
module.exports = router;
