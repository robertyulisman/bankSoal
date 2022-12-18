const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    nama: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kategori", schema);
