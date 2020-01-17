const HttpError = require("./errorMiddleware");

class InvalidRequestError extends HttpError {
  constructor(errors, msg = "Invalid data") {
    super(msg);
    this.errors = errors;
    this.name = "ValidationError";
  }
}

let validate = (validator, ...args) => (req, res, next) => {
  let validatorFnc;
  if (args.length > 0) {
    validatorFnc = validator(...args.map(arg => arg(req)));
  } else {
    validatorFnc = validator;
  }
  if (!validatorFnc(req.body)) {
    console.log(validatorFnc.errors);

    // let answer = new Error();
    // answer.message = "Invalid data";
    // next(new InvalidRequestError(validatorFnc.errors));
    next(new HttpError("Invalid data"));
  } else {
    next();
  }
};

module.exports = validate;
module.exports.InvalidRequestError = InvalidRequestError;
