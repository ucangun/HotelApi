"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const protect = require("../helpers/authentication");

const {
  list: listRooms,
  create: createRoom,
  read: readRoom,
  update: updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

// URL: /rooms
router.get("/", listRooms);
router.post("/", protect, createRoom);

router.get("/:id", readRoom);
router.put("/:id", protect, updateRoom);
router.delete("/:id", protect, deleteRoom);

/* ------------------------------------------------------- */
module.exports = router;
