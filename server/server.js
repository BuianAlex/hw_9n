const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const passport = require("passport");
const morgan = require("morgan");
const json = require("morgan-json");

require("dotenv").config();
require("./db/conectDB");
const app = express();
const HttpError = require("./middleWare/errorMiddleware");
const initPassport = require("./middleWare/passportConfig");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const port = process.env.PORT;
const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  length: ":res[content-length]",
  responseTime: ":response-time ms"
});

initPassport(passport);

app.use(compression());
app.use(morgan(format, { stream: accessLogStream }));
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

app.use("/users", users);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.use((error, req, res, next) => {
  process.env.NODE_ENV === "dev" && console.log(error);
  if (error) {
    res.status(error.status);
    res.send(error);
  } else {
    let answer = new Error();
    answer.message = "Uncaught exeption!";
    res.status(500).send(answer);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

module.exports = app;
