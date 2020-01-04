const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected!");
});

const userScheme = mongoose.Schema({
  name: String,
  loginName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  phone: String,
  photo: String,
  usergroup: String,
  lastVisit: Number,
  registrated: Number,
  online: Boolean
});

const userQuery = mongoose.model("user", userScheme);

module.exports = { userQuery };
