const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    kelas: { type: String, default: "" },
    tingkatan: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kelas", schema);
