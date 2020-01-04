const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected!");
  saveNewUser();
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

function userPasword() {
  return new Promise(resolve => {
    rl.question("Set user password (min: 6 characters): ", pass => {
      resolve(pass);
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
    user.password = await userPasword();
  } while (user.password.length < 6);

  const save = await toSave(user.username);
  if (save === "y") {
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
