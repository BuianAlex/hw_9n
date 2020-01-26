const router = require("express").Router();
const checkPermissios = require("../middleWare/permissionsMiddleware");
const HttpError = require("../middleWare/errorMiddleware");
const validate = require("../middleWare/validateMiddleware");
const FileType = require("file-type");
const path = require("path");
const fs = require("fs");
const stream = require("stream");
const formidable = require("formidable");
const service = require("./service");

router.post("/upload", (req, res, next) => {
  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, file) => {
    if (file.photo.size === 0) {
      next(new HttpError("", 400));
    } else if (
      file.photo.type !== "image/png" &&
      file.photo.type !== "image/jpeg" &&
      file.photo.type !== "image/svg+xml"
    ) {
      next(new HttpError("Not accessible file type", 400));
    } else if (
      fs.existsSync(
        path.join(__dirname, "./../build/img/users", file.photo.name)
      )
    ) {
      next(
        new HttpError(
          `File whith name ${file.photo.name}  is already stored.`,
          409
        )
      );
    } else {
      const source = fs.createReadStream(file.photo.path);
      const dest = fs.createWriteStream(
        path.join(__dirname, "./../build/uploads/", file.photo.name)
      );
      source.pipe(dest);
      source.on("end", function() {
        res.send({ result: file.photo.name });
      });
      source.on("error", function(error) {
        next(error);
      });
    }
  });
});

module.exports = router;
