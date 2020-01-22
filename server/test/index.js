// const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

require("./loginLogout");
require("./usersCreate");
require("./usersUpdate");
require("./usersDelete");
require("./usersGet");
