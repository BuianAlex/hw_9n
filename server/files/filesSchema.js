const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const autoIncrement = require("mongoose-auto-increment");

const filesScheme = mongoose.Schema({
  fileName: {
    type: String,
    //required: true,
    index: true
    // unique: true
  },
  fileAltText: {
    type: String
    // required: true
  },
  storePath: {
    type: String
  }
});

filesScheme.pre("save", function(next) {
  const file = this;
  const newFilePath = path.join(
    __dirname,
    "./../build/uploads/",
    file.fileName
  );
  if (fs.existsSync(newFilePath)) {
    const source = fs.createReadStream(newFilePath);
    const dest = fs.createWriteStream(
      path.join(__dirname, "./../build/img/users/", file.fileName)
    );

    source.pipe(dest);

    source.on("end", function() {
      fs.unlinkSync(newFilePath);
      next();
    });

    source.on("error", function(error) {
      next(error);
    });
  } else {
    next();
    console.error("file is not exist");
  }
});

filesScheme.plugin(autoIncrement.plugin, { model: "files", field: "fileID" });

module.exports = mongoose.model("files", filesScheme);
