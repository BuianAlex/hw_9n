const server = require("../server");
const chai = require("chai");
const path = require("path");
const fs = require("fs");

describe("Upload users CSV  by admin", () => {
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

  it("Upload - should be status 200", done => {
    authenticatedUser
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "csvFile",
        path.join(__dirname, `./files/MOCK_DATA.csv`),
        "MOCK_DATA.csv"
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log(res.body);
        }
        done();
      });
  });
});

describe("Test upload userCSV", () => {
  it("Send valid csv", done => {
    chai
      .request(server)
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "csvFile",
        path.join(__dirname, `./files/MOCK_DATA.csv`),
        "dicerolls.csv"
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log(res.body);
        }
        done();
      });
  });

  // it("Send empty file", done => {
  //   chai
  //     .request(server)
  //     .post("/users/csv")
  //     .set("Content-Type", "multipart/form-data")
  //     .attach(
  //       "csvFile",
  //       path.join(__dirname, `./files/empty.csv`),
  //       "dicerolls.csv"
  //     )
  //     .end((err, res) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         res.should.have.status(400);
  //         res.body.message.should.eql("BadRequest");
  //       }
  //       done();
  //     });
  // });
});
