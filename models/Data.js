const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "users",
  //   },
  item: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("data", DataSchema);
