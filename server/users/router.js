const router = require("express").Router();
const service = require("./service");
const validate = require("../middleWare/validate-middleware");
const validator = require("./validator");
const { onlyAdmin } = require("../middleWare/permissions-middleware");

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
      .catch(err =>
        res.send(JSON.stringify({ status: "0", error_message: err.errors }))
      );
  }
);

router.put("/update/:id", onlyAdmin, (req, res, next) => {
  service
    .update(req.params.id, req.body)
    .then(() => res.send("Success!"))
    .catch(next);
});

router.post("/delete/", (req, res, next) => {
  console.log(req.body);
  service
    .deleteMany(req.body)
    .then(() => res.send("Success!"))
    .catch(next);
});

module.exports = router;
