const axios = require("axios");
const Notifikasi = require("../models/Notifikasi");
const Siswa = require("../models/Siswa");
const Token = require("../models/UserToken");
const admin = require("firebase-admin");
const key = require("../config/variabel/keys-variabel.js");

// firebase user
const serviceAccount = require("../e-meghan-firebase-adminsdk-dg1e7-dc4d16795c.json");
const firebaseUser = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: key.FIREBASE_KEY,
  },
  "user"
);

// firebase kurir
const serviceAccountKurir = require("../odee-kurir-firebase-adminsdk-n7cdc-5ddf389864.json");
const firebaseKurir = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccountKurir),
    databaseURL: key.FIREBASE_KEY,
  },
  "kurir"
);

const sentNotifikasi = function (user, judul, deskripsi, type, userType) {
  const adminFirebase = userType === "user" ? firebaseUser : firebaseKurir;
  // console.log("user", user);
  // console.log("judul", judul);
  // console.log("deskripsi", deskripsi);
  // console.log("user", user);
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
              android: {
                priority: "high",
                notification: {
                  title: judul,
                  body: deskripsi,
                  sound: "default",
                  priority: "high",
                  channelId:
                    userType === "user"
                      ? "emeghanchannelid"
                      : "odeeKurirchannelid",
                },
              },

              token: tokensiswa.token,
            };
            adminFirebase
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
        reject(err);
        // res.status(500).json(err);
      });
  });

  return promise;
};

module.exports = {
  sentNotifikasi,
};
