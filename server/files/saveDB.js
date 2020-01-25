const fileQuery = require("./filesSchema");

module.exports = body => {
  return new fileQuery({
    fileName: body.photo,
    fileAltText: body.loginName,
    storePath: "/img/"
  }).save();
};
