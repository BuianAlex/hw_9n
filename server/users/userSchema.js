const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
const fotoStore = require('./../files/filesSchema');

SALT_WORK_FACTOR = 10;

const scheme = mongoose.Schema({
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
  gender: String,
  country: String,
  email: String,
  phone: String,
  photo: [{ type: mongoose.Schema.Types.ObjectId, ref: fotoStore }],
  usergroup: String,
  lastVisit: Number,
  registrated: Number,
  online: Boolean
});

scheme.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

scheme.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

scheme.plugin(autoIncrement.plugin, { model: 'user', field: 'userId' });

const userScheme = mongoose.model('user', scheme);

module.exports = userScheme;
