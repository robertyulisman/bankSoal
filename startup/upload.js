const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    const isPdf = file.mimetype === "application/pdf";
    const isExcel =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isWord =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    let uploadError = new Error("Invalid image type.");

    if (isValid) {
      uploadError = null;
    }

    if (isPdf) {
      cb(uploadError, "asset/pdf");
    } else if (isExcel) {
      cb(uploadError, "asset/excel");
    } else if (isWord) {
      cb(uploadError, "asset/word");
    } else {
      cb(uploadError, "asset/images");
    }
  },
  filename: function (req, file, cb) {
    const fileName = `${new Date().getTime()}${file.originalname
      .toLowerCase()
      .replace(/ /g, "-")}`;
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, fileName);
  },
});
// path.split('\\').join('/')

const upload = multer({ storage });

module.exports = upload;
