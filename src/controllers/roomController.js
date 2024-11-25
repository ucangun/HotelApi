"use strict";

const Room = require("../models/roomModel");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Room, {});

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Room),
      data,
    });
  },

  create: async (req, res) => {
    const data = await Room.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Room.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Room.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Room.findOne({ _id: req.params.id }),
    });
  },

  deleteRoom: async (req, res) => {
    const data = await Room.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
