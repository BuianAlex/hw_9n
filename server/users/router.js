const router = require("express").Router();
const service = require("./service");
const validate = require("../middleWare/validate-middleware");
const validator = require("./validator");
const { onlyAdmin } = require("../middleWare/permissions-middleware");
const HttpError = require("./../middleWare/error-middleware");

router.get("/get", (req, res, next) => {
  service
    .get()
    .then(data => res.send(JSON.stringify(data)))
    .catch(next);
});

router.get("/get-one/:id", (req, res, next) => {
  service
    .getOne(req.params.id)
    .then(data => res.send(data))
    .catch(next);
});

router.post(
  "/create",
  onlyAdmin,
  validate(validator.create),
  (req, res, next) => {
    service
      .create(req.body)
      .then(data => res.send(JSON.stringify({ status: "1", result: true })))
      .catch(err => {
        if (err.code === 11000) {
          next(new HttpError("Login Name is already used", 409));
        } else {
          next();
        }
      });
  }
);

router.put("/update/:id", onlyAdmin, (req, res, next) => {
  service
    .update(req.params.id, req.body)
    .then(() => res.send(JSON.stringify({ result: true })))
    .catch(next);
});

router.post("/delete/", onlyAdmin, (req, res, next) => {
  console.log(req.body);
  service
    .deleteMany(req.body)
    .then(() => res.send(JSON.stringify({ result: true })))
    .catch(next);
});

module.exports = router;
