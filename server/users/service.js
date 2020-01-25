const csv = require("csv-parser");
const fs = require("fs");
const userQuery = require("./userSchema");
const fileQuery = require("./../files/service");
const normalise = require("./normaliseUserData");
const HttpError = require("../middleWare/errorMiddleware");
const validator = require("./validator");
const get = () =>
  userQuery
    .find({})
    .populate("photo")
    .then(data => {
      let cleanedData = [];
      if (data.length > 0) {
        cleanedData = data.map(item => {
          return normalise(item);
        });
      }
      return cleanedData;
    });

const getOne = id =>
  userQuery
    .findOne({ userId: id })
    .populate("photo")
    .then(data => {
      return data;
    })
    .catch(err => {
      return { status: 0, errorMessage: "Not found" };
    });

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    userQuery
      .findOne({ userId: id })
      .populate("photo")
      .then(async data => {
        if (data) {
          if (body.photo) {
            if (!data.photo.length) {
              const fileData = await fileQuery.saveFile(body);
              data.photo = fileData._id;
            }
            if (data.photo.length && data.photo[0].fileName !== body.photo) {
              const fileData = await fileQuery.saveFile(body);
              data.photo = fileData._id;
            }
          }

          Object.keys(body).forEach(async key => {
            if (key === "photo") {
              if (key !== "password" && key !== "photo") {
                data[key] = body[key];
              }
            }
          });
          return data.save();
        } else {
          return null;
        }
      })
      .then(resolve)
      .catch(reject);
  });
};

const create = async body => {
  const testIfExist = await userQuery.find({ loginName: body.loginName });
  if (testIfExist.length > 0) {
    return new Promise((resolve, reject) => {
      reject(new HttpError("", 409));
    });
  }
  body.registrated = Date.now();

  if (body.photo) {
    const fileData = await fileQuery.saveFile(body);
    body.photo = fileData._id;
  }

  if (!body.usergroup) {
    body.usergroup = "user";
  }

  const newUser = new userQuery(body);
  newUser.save();
};

const addFromCsv = async data => {
  let isValid = [];
  let dbRes = {
    saved: [],
    schemaError: [],
    duplicate: [],
    unnounError: []
  };
  //validator
  data.map(user => {
    if (validator.create(user)) {
      isValid.push(user);
    } else {
      dbRes.schemaError.push(user);
    }
  });
  //save to db
  if (isValid.length) {
    const promisMap = isValid.map(async user => {
      let reqDb;
      try {
        reqDb = await userQuery(user).save();
        dbRes.saved.push(user);
      } catch (error) {
        if (error.code === 11000) {
          dbRes.duplicate.push(user);
        } else {
          dbRes.unnounError.push(user);
        }
      }
      return reqDb;
    });
    await Promise.all(promisMap);
    return dbRes;
  } else {
    return dbRes;
  }
};

const remove = id => userQuery.findByIdAndRemove(id);

const deleteMany = idS => userQuery.deleteMany({ userId: idS });

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
  deleteMany,
  addFromCsv
};
