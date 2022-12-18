const express = require("express");
const router = express.Router();
const Pelajaran = require("../../models/Pelajaran");

router.get("/", async (req, res) => {
  const pelajaran = await Pelajaran.find().sort({ nama: 1 });
  res.status(200).json(pelajaran);
});

router.post("/", (req, res) => {
  const { nama } = req.body;
  const newPelajaran = new Pelajaran({
    nama,
  });
  newPelajaran
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const { nama } = req.body;

  Pelajaran.findById(_id).then((data) => {
    if (nama) {
      data.nama = nama;
    }

    data
      .save()
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(500).json(err));
  });
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Pelajaran.findByIdAndRemove(_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
