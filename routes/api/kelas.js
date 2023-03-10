const express = require("express");
const router = express.Router();
const Kelas = require("../../models/Kelas");
// const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const kelas = await Kelas.find().sort({ kelas: 1 });
  res.status(200).json(kelas);
});

router.post("/", (req, res) => {
  const { kelas, tingkatan } = req.body;
  const newKelas = new Kelas({
    kelas,
    tingkatan,
  });
  newKelas
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

// update kategori
router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const { kelas, tingkatan } = req.body;

  Kelas.findById(_id).then((data) => {
    if (kelas) {
      data.kelas = kelas;
    }
    if (tingkatan) {
      data.tingkatan = tingkatan;
    }
    data
      .save()
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(500).json(err));
  });
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Kelas.findByIdAndRemove(_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
