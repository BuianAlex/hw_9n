const userQuery = require("./userSchema");
const normalise = require("./normaliseUserData");

const get = () =>
  userQuery.find({}).then(data => {
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
      .then(data => {
        if (data) {
          Object.keys(body).forEach(key => {
            if (key !== "password") {
              data[key] = body[key];
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

const create = body => {
  body.registrated = Date.now();
  if (!body.usergroup) {
    body.usergroup = "user";
  }
  const newUser = new userQuery(body);
  return newUser.save();
};

const remove = id => userQuery.findByIdAndRemove(id);

const deleteMany = idS => userQuery.deleteMany({ userId: idS });

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
  deleteMany
};
