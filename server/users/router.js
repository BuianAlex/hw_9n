const router = require("express").Router();
const service = require("./service");
const passport = require("passport");
const checkPermissios = require("../middleWare/permissionsMiddleware");
const HttpError = require("../middleWare/errorMiddleware");
const validate = require("../middleWare/validateMiddleware");
const validator = require("./validator");
const normalise = require("./normaliseUserData");

router.post(
  "/login",
  validate(validator.login),
  // checkNotAuthenticated,
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    if (req.user) {
      // res.status(200).send(JSON.stringify({ result: normalise(req.user) }));
      res.status(200).send({ result: normalise(req.user) });
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

router.get("/logout", function(req, res) {
  req.logout();
  res.send({ result: "Bye" });
});

router.get("/get", checkPermissios.onlyAuthenficated, (req, res, next) => {
  service
    .get()
    .then(data => res.send({ result: data }))
    .catch(next);
});

router.get(
  "/get-one/:id",
  checkPermissios.onlyAuthenficated,
  (req, res, next) => {
    if (/^[0-9]+$/g.test(req.params.id)) {
      service
        .getOne(req.params.id)
        .then(data => {
          if (data) {
            res.send({ result: data });
          } else {
            next(new HttpError("", 404));
          }
        })
        .catch(next);
    } else {
      next(new HttpError("", 404));
    }
  }
);

router.post(
  "/create",
  checkPermissios.userCreate,
  validate(validator.create),
  (req, res, next) => {
    service
      .create(req.body)
      .then(data => res.status(200).send({ result: true }))
      .catch(err => {
        if (err.code === 11000) {
          next(new HttpError("", 409));
        } else {
          next();
        }
      });
  }
);

router.put(
  "/update/:id",
  checkPermissios.onlyAdmin,
  validate(validator.edit),
  (req, res, next) => {
    if (/^[0-9]+$/g.test(req.params.id)) {
      service
        .update(req.params.id, req.body)
        .then(data => {
          if (data) {
            res.send({ result: true });
          } else {
            next(new HttpError("", 404));
          }
        })
        .catch(next);
    } else {
      next(new HttpError("", 404));
    }
  }
);

router.post(
  "/delete",
  checkPermissios.onlyAdmin,
  validate(validator.deleteMany),
  (req, res, next) => {
    service
      .deleteMany(req.body)
      .then(data => {
        res.send({ result: true });
      })
      .catch(err => {
        next;
      });
  }
);

module.exports = router;
