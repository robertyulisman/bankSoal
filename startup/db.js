const mongoose = require("mongoose");

class database {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log("Database connected!");
    } catch (e) {
      console.error(e);
    }
  }
}

exports.database = new database();
