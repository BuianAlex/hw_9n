const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

// require("./db/connectDB");
const port = process.NODE_PORT || 8080;
const app = express();
const initPassport = require("./middleWare/passport-config");

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
  checkNotAuthenticated,
  passport.authenticate("local", { failWithError: true }),
  //
  (req, res, next) => {
    if (req.user) {
      const { name, loginName, email, phone, usergroup } = req.user;
      res.status(200).send({
        status: 1,
        result: { name, loginName, email, phone, usergroup }
      });
    }
  },
  (err, req, res, next) => {
    res.status(401).send({
      message: `Sorry, the member name and password
     you entered do not match. Please try again`
    });
  }
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server listening on port ${port}!`)
);

app.use((error, req, res, next) => {
  if (error.status) {
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
    res.status(401).send({
      message: "Unauthorized"
    });
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
