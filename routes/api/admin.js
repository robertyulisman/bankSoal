const express = require("express");
const router = express.Router();

// Require jsonwebtoken to make token for session
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");
const upload = require("../../startup/upload");
const constants = require("../../services/constantTypes");
const validateLoginAdminInput = require("../../validation/loginAdmin");
const validateRegisterAdmin = require("../../validation/registerAdmin");

router.get("/", async (req, res) => {
  try {
    const data = await Admin.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const data = await Admin.findById(_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginAdminInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  Admin.findOne({
    email,
  }).then((data) => {
    if (!data) {
      errors.email = "User tidak ditemukan";
      return res.status(404).json(errors);
    }

    const isValidPassword = data.validPassword(password);
    if (!isValidPassword) {
      errors.password = "Password Salah";
      return res.status(500).json(errors);
    }

    const payload = {
      _id: data._id,
      email: data.email,
      nama: data.nama,
      type: data.type,
    };

    jwt.sign(
      payload,
      process.env.SECRET_OR_KEY,
      { expiresIn: "1w" },
      (err, token) => {
        return res.status(200).json({
          success: true,
          token: "Bearer " + token,
          data,
        });
      }
    );
  });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterAdmin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  Admin.findOne({ email }).then((data) => {
    if (data) {
      errors.email = "Email kamu sudah terdaftar";
      return res.status(400).json(errors);
    } else {
      const admin = {
        nama: req.body.nama,
        email: req.body.email,
        mobile: req.body.mobile,
        type: req.body.type,
      };
      const newAdimn = new Admin(admin);
      newAdimn.password = newAdimn.generateHash(req.body.password);
      newAdimn
        .save()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
    }
  });
});

router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const { nama, email, mobile, profileInformation } = req.body;

  Admin.findById(_id).then((admin) => {
    if (nama) {
      admin.nama = nama;
    }
    if (email) {
      admin.email = email;
    }
    if (mobile) {
      admin.mobile = mobile;
    }
    if (profileInformation) {
      admin.profileInformation = profileInformation;
    }
    admin
      .save()
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(500).json(err));
  });
});
router.put("/update_profile/:_id", upload.single("image"), (req, res) => {
  const { _id } = req.params;
  const { nama, email, mobile, profileInformation } = req.body;

  console.log("req.file", req.file);

  if (req.file === undefined) {
    Admin.findById(_id).then((admin) => {
      if (nama) {
        admin.nama = nama;
      }
      if (email) {
        admin.email = email;
      }
      if (mobile) {
        admin.mobile = mobile;
      }
      if (profileInformation) {
        admin.profileInformation = profileInformation;
      }
      admin
        .save()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    const newFile = {
      image: req.file.path.replace(/\\/g, "/"),
    };
    Admin.findById(_id).then((admin) => {
      if (nama) {
        admin.nama = nama;
      }
      if (email) {
        admin.email = email;
      }
      if (mobile) {
        admin.mobile = mobile;
      }
      if (profileInformation) {
        admin.profileInformation = profileInformation;
      }
      if (newFile.image) {
        admin.image = newFile.image;
      }
      admin
        .save()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
    });
  }
});

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const data = await Admin.findByIdAndRemove(_id);
    res.status(200).json(data);
  } catch (err) {
    console.log("err delete user", err);
    res.status(500).json(err);
  }
});

module.exports = router;
