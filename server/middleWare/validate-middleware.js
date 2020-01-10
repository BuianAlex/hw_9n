const HttpError = require("./error-middleware");

class InvalidRequestError extends HttpError {
  constructor(errors, msg = "Invalid data") {
    super(msg);
    this.errors = errors;
    this.name = "ValidationError";
  }
}

let validate = (validator, ...args) => (req, res, next) => {
  let validatorFnc;
  console.log(args);
  if (args.length > 0) {
    validatorFnc = validator(...args.map(arg => arg(req)));
  } else {
    validatorFnc = validator;
  }

  if (!validatorFnc(req.body)) {
    let answer = new Error();
    answer.message = "Invalid data";
    return next(new InvalidRequestError(validatorFnc.errors));
  }
  next();
};

module.exports = validate;
module.exports.InvalidRequestError = InvalidRequestError;
