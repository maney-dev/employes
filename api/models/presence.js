const mongoose = require("mongoose");

const presenceSchema = new mongoose.Schema({
  employeId: {
    type: String,
    required: true,
  },
  employeName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Presence = mongoose.model("Presence", presenceSchema);

module.exports = Presence;
