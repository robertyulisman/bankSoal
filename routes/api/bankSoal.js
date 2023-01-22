const express = require("express");
const router = express.Router();
const BankSoal = require("../../models/BankSoal");
const upload = require("../../startup/upload");
const path = require("path");
const fs = require("fs");
const { PDFNet } = require("@pdftron/pdfnet-node");

router.get("/", async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  const bank = await BankSoal.find()
    .populate([{ path: "pic", model: "Admin", select: "nama" }])
    .sort({ _id: -1 });
  res.status(200).json(bank);

  // BankSoal.countDocuments()
  //   .then((bank) => {
  //     totalItems = bank;

  //     return BankSoal.find()
  //       .sort({ _id: -1 })
  //       .populate([{ path: "pic", model: "Admin", select: "nama" }])
  //       .skip((+currentPage - 1) * +perPage)
  //       .limit(+perPage);
  //   })
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "Data Soal berhasil dipanggil",
  //       data: result,
  //       total_data: totalItems,
  //       per_page: +perPage,
  //       current_page: +currentPage,
  //     });
  //   });
});

router.get("/:_idUser", async (req, res) => {
  const { _idUser } = req.params;
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  BankSoal.countDocuments({ pic: _idUser })
    .then((bank) => {
      totalItems = bank;

      return BankSoal.find({ pic: _idUser })
        .sort({ _id: -1 })
        .populate([{ path: "pic", model: "Admin", select: "nama" }])
        .skip((+currentPage - 1) * +perPage)
        .limit(+perPage);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Soal berhasil dipanggil",
        data: result,
        total_data: totalItems,
        per_page: +perPage,
        current_page: +currentPage,
      });
    });
});

// router.get("/preview_file", (req, res) => {
//   const { fileName } = req.query;
//   console.log("fileName", `./asset/word/${fileName}`);

//   const inputPath = path.resolve(__dirname, `./asset/word/${fileName}`);
//   const outputPath = path.resolve(__dirname, `./asset/word/${fileName}.pdf`);

//   const convertToPdf = async () => {
//     const pdfdoc = await PDFNet.PDFDoc.create();
//     await pdfdoc.initSecurityHandler();
//     await PDFNet.Convert.toPdf(pdfdoc, inputPath);
//     pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
//   };

//   PDFNet.runWithCleanup(
//     convertToPdf,
//     "demo:1671867833409:7d658504030000000012581676a2f6ca7691985dc1a3f4ea1371ac5dba"
//   )
//     .then(() => {
//       fs.readFile(outputPath, (err, data) => {
//         if (err) {
//           res.statusCode = 500;
//           res.end(err);
//         } else {
//           res.setHeader("ContentType", "application/pdf");
//           res.end(data);
//         }
//       });
//     })
//     .catch((err) => {
//       console.log("err creating pdf", err);
//       res.statusCode = 500;
//       res.end(err);
//     });
// });

router.post("/:_id_PIC", upload.single("file"), (req, res) => {
  const { _id_PIC } = req.params;
  const {
    nama,
    kelas,
    pelajaran,
    kategori,
    lampiran,
    jumlahHalaman,
    jumlahLembar,
    jumlahFotocopy,
    tanggalPenggunaan,
    fileType,
  } = req.body;

  if (req.file === undefined)
    return res.status(400).json({ message: "File Harus di Upload" });

  const newBank = new BankSoal({
    pic: _id_PIC,
    nama,
    kelas,
    pelajaran,
    kategori,
    lampiran,
    jumlahHalaman,
    jumlahLembar,
    jumlahFotocopy,
    tanggalPenggunaan,
    file: req.file.path.replace(/\\/g, "/"),
    fileType,
  });

  newBank
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log("err", err);
      res.status(400).json(err);
    });
});

router.put("/:_id", upload.single("file"), (req, res) => {
  const { _id } = req.params;
  const {
    nama,
    kelas,
    pelajaran,
    kategori,
    lampiran,
    jumlahHalaman,
    jumlahLembar,
    jumlahFotocopy,
    tanggalPenggunaan,
  } = req.body;

  if (req.file === undefined) {
    BankSoal.findById(_id).then((data) => {
      if (nama) {
        data.nama = nama;
      }
      if (kelas) {
        data.kelas = kelas;
      }
      if (pelajaran) {
        data.pelajaran = pelajaran;
      }
      if (kategori) {
        data.kategori = kategori;
      }
      if (lampiran) {
        data.lampiran = lampiran;
      }
      if (jumlahHalaman) {
        data.jumlahHalaman = jumlahHalaman;
      }
      if (jumlahLembar) {
        data.jumlahLembar = jumlahLembar;
      }
      if (jumlahFotocopy) {
        data.jumlahFotocopy = jumlahFotocopy;
      }
      if (tanggalPenggunaan) {
        data.tanggalPenggunaan = tanggalPenggunaan;
      }

      data
        .save()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    const newFile = {
      file: req.file.path.replace(/\\/g, "/"),
    };

    BankSoal.findById(_id).then((data) => {
      if (nama) {
        data.nama = nama;
      }
      if (kelas) {
        data.kelas = kelas;
      }
      if (pelajaran) {
        data.pelajaran = pelajaran;
      }
      if (kategori) {
        data.kategori = kategori;
      }
      if (lampiran) {
        data.lampiran = lampiran;
      }
      if (jumlahHalaman) {
        data.jumlahHalaman = jumlahHalaman;
      }
      if (jumlahLembar) {
        data.jumlahLembar = jumlahLembar;
      }
      if (jumlahFotocopy) {
        data.jumlahFotocopy = jumlahFotocopy;
      }
      if (tanggalPenggunaan) {
        data.tanggalPenggunaan = tanggalPenggunaan;
      }
      if (newFile.file) {
        data.file = newFile.file;
      }

      data
        .save()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
    });
  }
});

router.put("/change_status/:_id", (req, res) => {
  const { _id } = req.params;
  BankSoal.findById(_id).then((data) => {
    if (data.statusDipakai === false) {
      data.statusDipakai = true;
    } else {
      data.statusDipakai = false;
    }

    data
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  BankSoal.findByIdAndRemove(_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(404).json(err));
});

router.delete("/delete_selected/:ids", (req, res) => {
  const { ids } = req.params;
  const data = ids.split(",");

  BankSoal.deleteMany({ _id: { $in: data } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("err delete selected", err);
      res.status(500).json(err);
    });
});

module.exports = router;
