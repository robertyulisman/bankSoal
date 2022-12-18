module.exports = (app) => {
  app.use("/api/admin", require("../routes/api/admin"));
  app.use("/api/kelas", require("../routes/api/kelas"));
  app.use("/api/pelajaran", require("../routes/api/pelajaran"));
  app.use("/api/kategori", require("../routes/api/kategori"));
  app.use("/api/bank_soal", require("../routes/api/bankSoal"));
};
