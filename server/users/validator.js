const create = require("./validateSchemas/create");
const login = require("./validateSchemas/login");
const edit = require("./validateSchemas/edit");
const deleteMany = require("./validateSchemas/deleteMany");
module.exports = { create, login, edit, deleteMany };
