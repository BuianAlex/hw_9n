const chai = require("chai");
const server = require("../server");
const userQuery = require("../users/userSchema");
/*~
 * Test the /user/delete route
 */

describe("User DELETE rout", () => {
  describe("Delete user by admin", () => {
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

    it("Delete many users - should be staus 200", done => {
      const toDelete = ["Testic", "TesticFull", "newAdmin", "hacker"];
      let userID = [];
      userQuery.find({ loginName: { $in: toDelete } }).then(users => {
        for (let key of users) {
          userID.push(key.userId);
        }
        authenticatedUser
          .post("/users/delete")
          .send(userID)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("result");
            res.body.result.should.eql(true);
            done();
          });
      });
    });

    it("Send not valid user list 'String' - should be rejected staus 400", done => {
      authenticatedUser
        .post("/users/delete")
        .send("notValid")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql("BadRequest");
          done();
        });
    });

    it("Send not valid user list 'Array of Strings' - should be rejected status 400", done => {
      const toDelete = ["Testic", "TesticFull", "newAdmin", "hacker"];
      authenticatedUser
        .post("/users/delete")
        .send(toDelete)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql("BadRequest");
          done();
        });
    });

    after(() => {
      authenticatedUser.close();
    });
  });

  describe("Delete user without admin rigths", () => {
    it("Delete user - should be rejected status 403", done => {
      chai
        .request(server)
        .post("/users/delete")
        .send([process.env.TEST_USER_ID])
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql("Forbidden");
          done();
        });
    });
  });
});
