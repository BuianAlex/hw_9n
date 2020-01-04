const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const User = require("./control/user");

require("./db/connectDB");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.NODE_PORT || 8080;

app.use(express.static(path.join(__dirname, "client/static")));

const users = require("./users/router");

app.use("/users", users);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server listening on port ${port}!`)
);
