const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const { Schema } = mongoose;

const schema = new Schema(
  {
    nama: { type: String, default: "" },
    email: { type: String, default: "" },
    type: { type: String, default: "" }, // super admin/ admin/ user
    password: { type: String, default: "" },
    jabatan: { type: String, default: "" },
    profileInformation: { type: String, default: "" },
    mobile: { type: String, default: "" },
    alamatLengkap: { type: String, default: "" },
  },

  {
    timestamps: true,
  }
);

// generating a hash
schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Admin", schema);
