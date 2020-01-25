const server = require("../server");
const chai = require("chai");
const path = require("path");
const fs = require("fs");

describe("Test upload photo", () => {
  const fileName = "calce.jpg";
  it("Send valid photo", done => {
    chai
      .request(server)
      .post("/files/upload")
      .set("Content-Type", "multipart/form-data")
      .attach("photo", path.join(__dirname, `./files/${fileName}`), fileName)
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          res.should.have.status(200);
          res.body.result.should.eql("calce.jpg");
          const isUploaded = fs.existsSync(
            path.join(__dirname, "./../build/uploads", res.body.result)
          );
          isUploaded.should.eql(true);
        }
        done();
      });
  });
  it("Send empty file", done => {
    chai
      .request(server)
      .post("/files/upload")
      .set("Content-Type", "multipart/form-data")
      .attach("photo", path.join(__dirname, "./files/empty.jpg"), "calce.jpg")
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

  it("Send not valid file", done => {
    chai
      .request(server)
      .post("/files/upload")
      .set("Content-Type", "multipart/form-data")
      .attach("photo", path.join(__dirname, "./files/txt.txt"), "calce.jpg")
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

  after(function() {
    const isUploaded = fs.existsSync(
      path.join(__dirname, "./../build/uploads", fileName)
    );
    isUploaded.should.eql(true);

    // runs after all tests in this block
  });
});
