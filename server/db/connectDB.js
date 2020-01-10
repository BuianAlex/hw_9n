const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected!");
});

SALT_WORK_FACTOR = 10;

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

userScheme.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      console.log(hash);

      user.password = hash;
      next();
    });
  });
});

userScheme.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const userQuery = mongoose.model("user", userScheme);

module.exports = { userQuery };
