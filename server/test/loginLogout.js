const server = require("../server");
const chai = require("chai");

describe('Test the "/login"  rout', () => {
  describe("Login", () => {
    it("User should be logined - shuld be status 200", done => {
      const qwerty = {
        loginName: process.env.TEST_USER,
        password: process.env.TEST_USER_PASS
      };
      chai
        .request(server)
        .post("/users/login")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.cookie("connect.sid");
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          done();
        });
    });

    it("Not valid password - should be rejected staus 401", done => {
      const qwerty = {
        loginName: "alex",
        password: "werewrewrwe"
      };
      chai
        .request(server)
        .post("/users/login")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    it("Send only loginName - should be rejected status 400", done => {
      const qwerty = {
        loginName: "alex"
      };
      chai
        .request(server)
        .post("/users/login")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    it("Send not valid data - should be rejected status 400", done => {
      const qwerty = "ququ";
      chai
        .request(server)
        .post("/users/login")
        .send(qwerty)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  describe("Test user logout", () => {
    it("User logout - should be status 200", done => {
      chai
        .request(server)
        .get("/users/logout")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          done();
        });
    });

    it("Try to access to the private route - shult be rejected status 403", done => {
      chai
        .request(server)
        .get("/users/get")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });
});
