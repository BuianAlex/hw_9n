const chai = require("chai");
const server = require("../server");

describe("GET users lits or find one", () => {
  describe("Get list with admin rights", () => {
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

    it("Get list should be staus 200", done => {
      authenticatedUser.get("/users/get").end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("result");
        done();
      });
    });

    it("Get one user should be status 200", done => {
      authenticatedUser
        .get(`/users/get-one/${process.env.TEST_USER_ID}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          done();
        });
    });

    it("Get not exist user should be rejected staus 404", done => {
      authenticatedUser.get("/users/get-one/1930000000").end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
    });

    it("Get user with not valid ID should be rejected status 404", done => {
      authenticatedUser
        .get("/users/get-one/193<script>0000000")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  describe("Get users list or one user without admin rigths", () => {
    it("Get users list should be rejected staus 401", done => {
      chai
        .request(server)
        .get("/users/get")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql("Unauthorized");
          done();
        });
    });

    it("Get one user should be rejected status 401", done => {
      chai
        .request(server)
        .get(`/users/get-one/${process.env.TEST_USER_ID}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql("Unauthorized");
          done();
        });
    });
  });
});
