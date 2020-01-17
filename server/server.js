const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const passport = require("passport");
// const morgan = require("morgan");
// const json = require("morgan-json");

require("dotenv").config();
//require("./db/connectDB");
const app = express();
const initPassport = require("./middleWare/passportConfig");
const HttpError = require("./middleWare/errorMiddleware");
const validate = require("./middleWare/validateMiddleware");
const validator = require("./users/validator");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const port = process.env.PORT;
// const format = json({
//   method: ":method",
//   url: ":url",
//   status: ":status",
//   length: ":res[content-length]",
//   responseTime: ":response-time ms"
// });

initPassport(passport);

app.use(compression());
//app.use(morgan(format, { stream: accessLogStream }));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "client")));

const users = require("./users/router");

app.use("/users", checkAuthenticated, users);

app.post(
  "/login",
  validate(validator.login),
  checkNotAuthenticated,
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    if (req.user) {
      const { name, loginName, email, phone, usergroup, photo } = req.user;
      res.status(200).send({
        result: {
          name,
          loginName,
          email,
          phone,
          usergroup,
          photo
        }
      });
    }
  },
  (err, req, res, next) => {
    if (err.status == 401) {
      err.message = `Sorry, the member name and password
    you entered do not match. Please try again`;
    }
    next(new HttpError(err.message, err.status));
  }
);

app.get("/logout", function(req, res) {
  req.logout();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  if (error.status) {
    res.status(error.status);
    res.send(error);
  } else {
    let answer = new Error();
    answer.message = "Uncaught exeption!";
    res.status(500).send(answer);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

function checkAuthenticated(req, res, next) {
  if (req.path !== "/create") {
    if (req.isAuthenticated()) {
      return next();
    }
    next(new HttpError("Unauthorized", 401));
  } else {
    return next();
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
