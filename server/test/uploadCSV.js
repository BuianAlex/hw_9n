const server = require("../server");
const chai = require("chai");
const path = require("path");
const fs = require("fs");

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

  // it("Send csv with not valid structure", done => {
  //   chai
  //     .request(server)
  //     .post("/users/csv")
  //     .set("Content-Type", "multipart/form-data")
  //     .attach(
  //       "csvFile",
  //       path.join(__dirname, `./files/dicerolls.csv`),
  //       "dicerolls.csv"
  //     )
  //     .end((err, res) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         console.log(res.body);
  //       }
  //       done();
  //     });
  // });

  it("Send empty file", done => {
    chai
      .request(server)
      .post("/users/csv")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "csvFile",
        path.join(__dirname, `./files/empty.csv`),
        "dicerolls.csv"
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.should.have.status(400);
          res.body.message.should.eql("BadRequest");
        }
        done();
      });
  });

  // it("Send empty file", done => {
  //   chai
  //     .request(server)
  //     .post("/files/upload")
  //     .set("Content-Type", "multipart/form-data")
  //     .attach("photo", path.join(__dirname, "./files/empty.jpg"), "calce.jpg")
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

  // it("Send not valid file", done => {
  //   chai
  //     .request(server)
  //     .post("/files/upload")
  //     .set("Content-Type", "multipart/form-data")
  //     .attach("photo", path.join(__dirname, "./files/txt.txt"), "calce.jpg")
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
