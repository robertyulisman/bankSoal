const express = require("express");
const router = express.Router();
const Kategori = require("../../models/Kategori");

router.get("/", async (req, res) => {
  const kategori = await Kategori.find().sort({ nama: 1 });
  res.status(200).json(kategori);
});

router.post("/", (req, res) => {
  const { nama } = req.body;
  const newKategori = new Kategori({
    nama,
  });
  newKategori
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const { nama } = req.body;

  Kategori.findById(_id).then((data) => {
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
  Kategori.findByIdAndRemove(_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
