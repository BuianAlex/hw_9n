const fileQuery = require("./filesSchema");

const saveFile = user => {
  return new fileQuery({
    fileName: user.photo,
    fileAltText: user.loginName,
    storePath: "/img/users/"
  }).save();
};
const removeFile = id => fileQuery.findByIdAndRemove(id);

module.exports = {
  saveFile,
  removeFile
};
