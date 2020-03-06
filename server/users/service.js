const csv = require('csv-parser');
const fs = require('fs');
const UserQuery = require('./userSchema');
const fileQuery = require('./../files/service');
const normalise = require('./normaliseUserData');
const HttpError = require('../middleWare/errorMiddleware');
const validator = require('./validator');

const get = async (limit, page) => {
  let limitUsers = parseInt(limit, 10);
  let pageToShow = parseInt(page, 10);
  if (isNaN(limitUsers)) {
    limitUsers = 100;
  }
  if (isNaN(pageToShow) || pageToShow < 1) {
    pageToShow = 1;
  }
  try {
    const totalUsers = await UserQuery.countDocuments();
    const pages = Math.ceil(totalUsers / limitUsers);
    const skip = limitUsers * (pageToShow - 1);
    const users = await UserQuery.find({})
      .populate('photo')
      .skip(skip)
      .limit(limitUsers);
    let usersNormal = [];
    if (users.length) {
      usersNormal = users.map(item => normalise(item));
    }
    const resultDB = { totalUsers, pages, usersList: usersNormal };
    return resultDB;
  } catch (error) {
    console.error(`getUsers${error}`);
  }
};

const getOne = id =>
  UserQuery.findOne({ userId: id })
    .populate('photo')
    .then(data => data)
    .catch(err => ({ status: 0, errorMessage: 'Not found' }));

const update = (id, body) =>
  new Promise((resolve, reject) => {
    UserQuery.findOne({ userId: id })
      .populate('photo')
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
            if (key !== 'password' && key !== 'photo') {
              data[key] = body[key];
            }
          });
          return data.save();
        }
        return null;
      })
      .then(resolve)
      .catch(reject);
  });

const create = async body => {
  const testIfExist = await UserQuery.find({ loginName: body.loginName });
  if (testIfExist.length > 0) {
    return new Promise((resolve, reject) => {
      reject(new HttpError('', 409));
    });
  }
  body.registrated = Date.now();

  if (body.photo) {
    const fileData = await fileQuery.saveFile(body);
    body.photo = fileData._id;
  } else {
    body.photo = [];
  }

  if (!body.usergroup) {
    body.usergroup = 'user';
  }

  const newUser = new UserQuery(body);
  return new Promise((resolve, reject) => {
    newUser.save(err => {
      if (err) return reject(err);
      resolve();
      // saved!
    });
  });
};

const addFromCsv = async data => {
  const isValid = [];
  const dbRes = {
    saved: [],
    schemaError: [],
    duplicate: [],
    unnounError: []
  };
  // validator
  data.map(user => {
    if (validator.create(user)) {
      isValid.push(user);
    } else {
      dbRes.schemaError.push(user);
    }
  });
  // save to db
  if (isValid.length) {
    const promisMap = isValid.map(async user => {
      let reqDb;
      try {
        reqDb = await UserQuery(user).save();
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
  }
  return dbRes;
};

const remove = id => UserQuery.findByIdAndRemove(id);

const deleteMany = idS => UserQuery.deleteMany({ userId: idS });

function calcObjectValue(holder, kayName, object) {
  let value = holder[object[kayName]];
  if (!value) {
    value = 0;
  }
  value += 1;
  holder[object[kayName]] = value;
}

const getStats = async () => {
  const userList = await UserQuery.find();
  const userGroup = {};
  const gender = {};
  const countries = {};
  userList.map(user => {
    calcObjectValue(userGroup, 'usergroup', user);
    calcObjectValue(gender, 'gender', user);
    calcObjectValue(countries, 'country', user);
  });
  return { userGroup, gender, countries };
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
  deleteMany,
  addFromCsv,
  getStats
};
