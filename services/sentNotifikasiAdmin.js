const Notifikasi = require("../models/Notifikasi");
const Token = require("../models/UserToken");
const admin = require("firebase-admin");
const key = require("../config/variabel/keys-variabel.js");

// firebase admin
const serviceAccountAdmin = require("../odee-admin-firebase-adminsdk-4rk5l-66ed039a6e.json");
const firebaseAdmin = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccountAdmin),
    databaseURL: key.FIREBASE_KEY,
  },
  "admin"
);

const sentNotifikasiAdmin = function (user, judul, deskripsi, type) {
  const newNotif = {
    user: user,
    judul: judul,
    deskripsi: deskripsi,
    type: type,
  };
  const notif = new Notifikasi(newNotif);
  const promise = new Promise((resolve, reject) => {
    notif
      .save()
      .then((data) => {
        Token.findOne({
          userId: data.user._id,
        })
          .then((tokensiswa) => {
            // console.log("token guru mana", tokensiswa);
            const message = {
              notification: {
                title: judul,
                body: deskripsi,
              },

              token: tokensiswa.token,
            };
            firebaseAdmin
              .messaging()
              .send(message)
              .then((response) => {
                console.log("Successfully sent message:", response);
                resolve({
                  dataNotifikasi: data,
                  dataNotifikasiFirebase: response,
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((err) => console.log("Error sending message:", err));
      })
      .catch((err) => {
        console.log("Error sending message 2:", err);
        res.status(500).json(err);
      });
  });

  return promise;
};

module.exports = {
  sentNotifikasiAdmin,
};
