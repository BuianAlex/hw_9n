const HttpError = require("./error-middleware");

function onlyAdmin(req, res, next) {
  if (req.user) {
    if (req.user.usergroup !== process.env.USER_ADMIN) {
      console.log("cke");
      next(new HttpError("Forbidden", 403));
    }
  }
  next();
}

module.exports = { onlyAdmin };
