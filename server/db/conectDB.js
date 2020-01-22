const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
mongoose.connect(process.env.DB_CONECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  if (process.env.NODE_ENV === "dev") {
    console.log("db connected!");
  }
});
autoIncrement.initialize(db);
