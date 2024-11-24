const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true }, // Token to identify the blacklisted JWT
  createdAt: { type: Date, default: Date.now }, // The creation date of the token
  expiresAt: { type: Date, required: true }, // The expiration date of the token
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

module.exports = Blacklist;
