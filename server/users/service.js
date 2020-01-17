const { userQuery } = require("../db/connectDB");

const get = () =>
  userQuery.find({}).then(data => {
    let cleanedData = [];
    if (data.length > 0) {
      cleanedData = data.map(item => {
        const {
          _id,
          userId,
          loginName,
          email,
          phone,
          photo,
          usergroup,
          lastVisit,
          registrated,
          online
        } = item;

        return {
          _id,
          userId,
          loginName,
          email,
          phone,
          photo,
          usergroup,
          lastVisit,
          registrated,
          online
        };
      });
    }
    return cleanedData;
  });

const getOne = id =>
  userQuery
    .findOne({ _id: id })
    .then(data => {
      return { status: 1, result: data };
    })
    .catch(err => {
      return { status: 0, errorMessage: "Not found" };
    });

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    userQuery
      .findOne({ _id: id })
      .then(data => {
        Object.keys(body).forEach(key => {
          if (key !== "password") {
            data[key] = body[key];
          }
        });
        return data.save();
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

const deleteMany = idS => userQuery.deleteMany({ _id: idS });

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
  deleteMany
};
