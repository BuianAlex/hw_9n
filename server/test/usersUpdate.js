const chai = require("chai");
const server = require("../server");
const userQuery = require("../users/userSchema");

/*~
 * Test the "/update/:id" route
 */
describe(`Test the "/update/:id" route`, () => {
  describe("Update user by admin", () => {
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

    it("Add to the user admin rigths should be status 200", done => {
      userQuery.findOne({ loginName: "Testic" }).then(user => {
        authenticatedUser
          .put(`/users/update/${user.userId}`)
          .send({ usergroup: "admin", loginName: "Testic" })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property("result");
            res.body.result.should.eql(true);
            done();
          });
      });
    });

    it("Update user with not valid ID should be rejected status 404", done => {
      authenticatedUser
        .put(`/users/update/1@1!!!!aaas223334`)
        .send({ usergroup: "superAdmin", loginName: "Testic" })
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    it("Update user with not exist ID should be rejected status 404", done => {
      authenticatedUser
        .put(`/users/update/1223334`)
        .send({ usergroup: "superAdmin", loginName: "Testic" })
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    it("Update user with not valid properties should be rejected status 400", done => {
      authenticatedUser
        .put(`/users/update/193`)
        .send({})
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.message.should.eql("BadRequest");
          done();
        });
    });

    it("Update user with not allowed properties should be rejected status 400", done => {
      authenticatedUser
        .put(`/users/update/${process.env.TEST_USER_ID}`)
        .send({
          usergroup: "superAdmin",
          loginName: "Testic",
          password: "qwerty"
        })
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.message.should.eql("BadRequest");
          done();
        });
    });
  });

  describe("Update user without admin rigths", () => {
    it("Update user should be rejected status 403", done => {
      userQuery.findOne({ loginName: "Testic" }).then(user => {
        chai
          .request(server)
          .put(`/users/update/${user.userId}`)
          .send({ usergroup: "admin", loginName: "Testic" })
          .end(function(err, res) {
            res.should.have.status(403);
            res.body.message.should.eql("Forbidden");
            done();
          });
      });
    });
  });
});
