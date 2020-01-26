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

  it("Upload - should be status 200 saved - 39, schemaError - 2, duplicate - 2 ", done => {
    authenticatedUser
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "csvFile",
        path.join(__dirname, `./files/MOCK_DATA_TEST.csv`),
        "MOCK_DATA.csv"
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.body.result.saved.should.be.have.lengthOf(39);
          res.body.result.schemaError.should.be.have.lengthOf(2);
          res.body.result.duplicate.should.be.have.lengthOf(2);
        }
        done();
      });
  });

  it("Upload data which do not match with schema", done => {
    authenticatedUser
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "csvFile",
        path.join(__dirname, `./files/dicerolls.csv`),
        "dicerolls.csv"
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.should.have.status(200);
          res.body.result.saved.should.be.empty;
        }
        done();
      });
  });

  it("Upload data which is not valid csv structure", done => {
    authenticatedUser
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach("csvFile", path.join(__dirname, `./files/dich.csv`), "dich.csv")
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.should.have.status(406);
        }
        done();
      });
  });
});

describe("Test upload userCSV without admin rights", () => {
  it("Send valid csv - should rejected 403", done => {
    chai
      .request(server)
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "csvFile",
        path.join(__dirname, `./files/MOCK_DATA.csv`),
        "MOCK_DATA.cs"
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.should.have.status(403);
          res.body.message.should.eql("Forbidden");
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
