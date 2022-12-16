const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
  nama: { type: String, default: "" },
});

module.exports = mongoose.model("Kelas", schema);
