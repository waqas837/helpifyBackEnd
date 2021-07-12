const mongoose = require("mongoose");
const createAddSh = mongoose.Schema({
  userId: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
  },
  pickupaddress: String,
  dropoffaddress: String,
});
module.exports = mongoose.model("creatAdd", createAddSh);
