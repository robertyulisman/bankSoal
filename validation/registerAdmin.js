const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterAdmin(data) {
  let errors = {};

  data.nama = !isEmpty(data.nama) ? data.nama : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.nama)) {
    errors.nama = "kolom wajib diisi";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email tidak valid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Masukkan email";
  }

  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password minimal 6 dan mak 30 angka";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Masukkan password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
