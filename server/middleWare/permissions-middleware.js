const HttpError = require("./error-middleware");

function onlyAdmin(req, res, next) {
  if (req.user) {
    if (req.user.usergroup !== process.env.USER_ADMIN) {
      console.log("cke");
      next(new HttpError("Forbidden for your user group", 403));
    }
    next();
  } else {
    next(new HttpError("Forbidden for your user group", 403));
  }
}

module.exports = { onlyAdmin };
