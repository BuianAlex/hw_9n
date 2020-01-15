const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
require("dotenv").config();
const port = process.env.PORT || 31415;
// require("./db/connectDB");
const app = express();
const initPassport = require("./middleWare/passport-config");
const HttpError = require("./middleWare/error-middleware");
const validate = require("./middleWare/validate-middleware");
const validator = require("./users/validator");

initPassport(passport);

app.use(compression());
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
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

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
