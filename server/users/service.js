const { userQuery } = require("../db/connectDB");

const get = () =>
  userQuery.find({}).then(data => {
    if (data.length > 0) {
      return { status: 1, result: data };
    } else {
      return { status: 0, error_message: "No users yet" };
    }
  });

const getOne = id =>
  userQuery
    .findOne({ _id: id })
    .then(data => {
      return { status: 1, result: data };
    })
    .catch(err => {
      return { status: 0, error_message: "Not found" };
    });

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    userQuery
      .findOne({ _id: id })
      .then(data => {
        Object.keys(body).forEach(key => {
          data[key] = body[key];
        });
        return data.save();
      })
      .then(resolve)
      .catch(reject);
  });
};

const create = body => {
  //TODO: test if user exist  error massage
  body.registrated = Date.now();
  if (!body.usergroup) {
    body.usergroup = "user";
  }
  const newUser = new userQuery(body);
  return newUser.save();
};

const remove = id => userQuery.findByIdAndRemove(id);

const deleteMany = idS => userQuery.deleteMany({ _id: idS });
console.log(deleteMany);

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
  deleteMany
};
