const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    guestNumber: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      default: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.night * this.price;
      }, // Create
      transform: function () {
        return this.night * this.price;
      }, //Update
    },
  },
  {
    timestamps: true,
    collection: "reservations",
  }
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
