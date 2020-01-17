const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected!");
  saveNewUser();
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

const userQuery = mongoose.model("user", userScheme);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function userName() {
  return new Promise(resolve => {
    rl.question("Set user name (min: 3 letters): ", name => {
      resolve(name);
    });
  });
}

function userPassword() {
  return new Promise(resolve => {
    rl.question("Set user password (min: 6 characters): ", pass => {
      resolve(pass);
    });
  });
}

function userGroup() {
  return new Promise(resolve => {
    rl.question("Set user group user(U), admin(A): ", group => {
      resolve(group);
    });
  });
}

function toSave(name) {
  return new Promise(resolve => {
    rl.question(`Save to db new user with login: ${name} (y/n):`, ans => {
      resolve(ans);
    });
  });
}

async function saveNewUser() {
  let user = {};
  do {
    user.loginName = await userName();
  } while (user.loginName.length < 3);
  do {
    user.password = await userPassword();
  } while (user.password.length < 6);
  user.usergroup = await userGroup();

  const save = await toSave(user.loginName);
  if (save === "y") {
    switch (user.usergroup) {
      case "U":
        user.usergroup = "user";
        break;
      case "A":
        user.usergroup = "admin";
        break;
      default:
        user.usergroup = "user";
        break;
    }
    const newUser = new userQuery(user);
    const res = await newUser.save();
    process.stdout.write("New user was created: \n" + res);
    db.close();
    process.exit(0);
  } else {
    db.close();
    process.exit(0);
  }
}
