const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    pic: { type: Schema.Types.ObjectId, ref: "Admin" },
    nama: { type: String, default: "" },
    kelas: { type: String, default: "" },
    pelajaran: { type: String, default: "" },
    kategori: { type: String, default: "" },
    lampiran: { type: String, default: "" },
    jumlahHalaman: { type: String, default: "" },
    jumlahLembar: { type: String, default: "" },
    jumlahFotocopy: { type: String, default: "" },
    tanggalPenggunaan: { type: String, default: "" },
    file: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BankSoal", schema);
