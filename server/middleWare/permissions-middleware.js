const HttpError = require("./error-middleware");

function onlyAdmin(req, res, next) {
  if (req.user) {
    if (req.user.usergroup !== process.env.USER_ADMIN) {
      next(new HttpError("Forbidden for your user group", 403));
    }
    next();
  } else {
    next(new HttpError("Forbidden for your user group", 403));
  }
}

function userCreate(req, res, next) {
  if (req.body.hasOwnProperty("usergroup")) {
    onlyAdmin(req, res, next);
  } else {
    next();
  }
}
module.exports = { onlyAdmin, userCreate };
