const router = require("express").Router();
const service = require("./service");
const passport = require("passport");
const checkPermissios = require("../middleWare/permissionsMiddleware");
const HttpError = require("../middleWare/errorMiddleware");
const validate = require("../middleWare/validateMiddleware");
const validator = require("./validator");
const normalise = require("./normaliseUserData");
const fileQuery = require("./../files/service");
const formidable = require("formidable");
const fs = require("fs");
const stream = require("stream");
const path = require("path");
const csv = require("csv-parser");

router.post(
  "/login",
  validate(validator.login),
  // checkNotAuthenticated,
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    if (req.user) {
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
      .then(data => {
        res.status(200).send({ result: true });
      })
      .catch(err => {
        if (err.code === 11000) {
          next(new HttpError("", 409));
        } else {
          next(err);
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
router.post("/csv", (req, res, next) => {
  // const source = fs.createReadStream(file.photo.path);
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, file) => {
    console.log(file.csvFile.type);
    if (file.csvFile.size === 0) {
      next(new HttpError("", 400));
    } else if (file.csvFile.type !== "text/csv") {
      next(new HttpError("Not accessible file type", 400));
    } else {
      const source = fs.createReadStream(file.csvFile.path);
      const results = [];
      source
        .pipe(csv("loginName", "password", "email", "phone", "photo"))
        .on("data", data => results.push(data))
        .on("end", async () => {
          let senRes = {
            valid: [],
            saved: [],
            error: [],
            duplicate: [],
            unnounError: []
          };
          results.map(async user => {
            if (validator.create(user)) {
              senRes.valid.push(user);
            } else {
              senRes.error.push(user);
            }
          });
          if (senRes.valid.length) {
            const promisMap = senRes.valid.map(async user => {
              let redd;
              try {
                redd = await service.addMany(user);
                console.log(redd);
                senRes.saved.push(user);
              } catch (error) {
                console.log(error.code);
                if (error.code === 11000) {
                  senRes.duplicate.push(user);
                } else {
                  senRes.unnounError.push(user);
                }
              }
              return redd;
            });
            const resres = await Promise.all(promisMap);
            console.log("aft");

            res.send({ res: senRes });
          } else {
            res.send({ res: senRes });
          }
          // console.log(senRes);

          // [
          //   { NAME: 'Daffy Duck', AGE: '24' },
          //   { NAME: 'Bugs Bunny', AGE: '22' }
          // ]
        });
      // const dest = fs.createWriteStream(
      //   path.join(__dirname, "./../build/uploads/", file.csvFile.name)
      // );
      // source.pipe(dest);
      // source.on("end", function() {
      //   res.send({ result: file.csvFile.name });
      // });
      // source.on("error", function(error) {
      //   next(error);
      // });
    }
  });
  // res.send("dfd");
});

module.exports = router;
