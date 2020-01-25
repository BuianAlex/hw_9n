const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const autoIncrement = require("mongoose-auto-increment");
const fotoStore = require("./../files/filesSchema");

SALT_WORK_FACTOR = 10;

const userScheme = mongoose.Schema({
  loginName: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  phone: String,
  photo: [{ type: mongoose.Schema.Types.ObjectId, ref: fotoStore }],
  usergroup: String,
  lastVisit: Number,
  registrated: Number,
  online: Boolean
});

userScheme.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userScheme.post("save", function(doc) {
  console.log(typeof doc);
});

userScheme.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
userScheme.plugin(autoIncrement.plugin, { model: "user", field: "userId" });

module.exports = mongoose.model("user", userScheme);
