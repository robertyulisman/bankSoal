module.exports = (app) => {
  app.use("/api/admin", require("../routes/api/admin"));
  app.use("/api/kelas", require("../routes/api/kelas"));
};
