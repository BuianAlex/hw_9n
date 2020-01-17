const fs = require("fs");
const path = require("path");
const stream = require("stream");
const logFilePath = "../access.log";

function parsEventData(buf) {
  const dataJson = [];
  let start = false;
  let end = false;
  let temp = "";
  let hasChildren = 0;

  for (let i = 0; i < buf.length; i++) {
    if (/{/.test(buf[i])) {
      if (start) {
        hasChildren += 1;
      }
      start = true;
    }
    if (/}/.test(buf[i])) {
      if (hasChildren > 0) {
        hasChildren -= 1;
      } else {
        end = true;
        hasChildren = 0;
      }
    }
    if (start) {
      temp += buf[i];
    }
    if (end) {
      dataJson.push(JSON.parse(temp));
      temp = "";
      start = false;
      end = false;
    }
  }
  return dataJson;
}

async function getStats() {
  const file = fs.createReadStream(logFilePath);

  let fileData = "";

  file.on("data", data => {
    console.log(data.toString());
    fileData += data.toString();
  });

  file.on("close", () => {
    const data = parsEventData(fileData);
    console.log(data[0].response - time);
  });

  file.on("error", err => {
    if (err.code === "ENOENT") {
      console.log("File not exist");
    }
  });
}

getStats();
