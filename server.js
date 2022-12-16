require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Deployment Configurations
// if (process.env.NODE_ENV === 'production') {
//   // Express will serve up production assets
//   // like our main.js file, or main.css file!
//   app.use(express.static('client/build'));

//   // Express will serve up the index.html file
//   // if it doesn't recognize the route
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), {
//       removeAttributeQuotes: true,
//     });
//   });
// }

app.use("/asset", express.static(path.join(__dirname, "asset")));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./startup/listener")(app);
require("./startup/db");
require("./startup/passport")();
require("./startup/routes")(app);

// Deployment Configurations
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"), {
      removeAttributeQuotes: true,
    });
  });
}

app.get("/", (req, res) => {
  res.json({ message: "oke test message oke" });
});
