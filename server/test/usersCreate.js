const server = require("../server");
const chai = require("chai");
/*~
 * Test the /user/create route
 */

let testUserData = {
  loginName: "Testic",
  password: "12345q"
};

describe("Test the /user/create route", () => {
  describe("New user signup", () => {
    it("Create new user send only  loginName and password - should be status 200", done => {
      chai
        .request(server)
        .post("/users/create")
        .send(testUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.cookie("connect.sid");
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          res.body.result.should.eql(true);
          done();
        });
    });

    it("Create new user send all valid fields - should be status 200", done => {
      const qwerty = {
        loginName: "TesticFull",
        password: "12345q",
        email: "test@test.re",
        phone: "+380935753848",
        photo: "nicePhoto.png"
      };
      chai
        .request(server)
        .post("/users/create")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.cookie("connect.sid");
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          res.body.result.should.eql(true);
          done();
        });
    });

    it("LoginName is exist in db - should be rejected status 409", done => {
      const qwerty = {
        loginName: "Testic",
        password: "12345q"
      };
      chai
        .request(server)
        .post("/users/create")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          res.body.message.should.eql("Login Name is already used");
          done();
        });
    });

    it("Send not valid data - should be rejected status 400", done => {
      const qwerty = {
        loginName: "Hacker"
      };
      chai
        .request(server)
        .post("/users/create")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql("BadRequest");
          done();
        });
    });

    it("Create new user with usergroup fild without admin rights - should rejected 403", done => {
      const qwerty = {
        loginName: "hacker",
        password: "12345q",
        usergroup: "admin"
      };
      chai
        .request(server)
        .post("/users/create")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a("object");
          res.body.message.should.eql("Forbidden");
          done();
        });
    });
  });

  describe("Create user by admin", () => {
    const userCredentials = {
      loginName: process.env.TEST_USER,
      password: process.env.TEST_USER_PASS
    };
    const authenticatedUser = chai.request.agent(server);
    before(function(done) {
      authenticatedUser
        .post("/users/login")
        .send(userCredentials)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.have.cookie("connect.sid");
          done();
        });
    });

    it("Create new user with usergroup admin - should be status 200", done => {
      const qwerty = {
        loginName: "newAdmin",
        password: "12345q",
        usergroup: "admin"
      };
      authenticatedUser
        .post("/users/create")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          res.body.result.should.eql(true);
          done();
        });
    });
  });

  describe("Test new user login", () => {
    it("User should be logined - should be status 200 ", done => {
      chai
        .request(server)
        .post("/users/login")
        .send(testUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.cookie("connect.sid");
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          done();
        });
    });
  });
});
