const path = require('path');
const fs = require('fs');
const file = path.join(__dirname, '../data', 'users');

function dbRead() {
  if (fs.existsSync(file)) {
    const readFile = fs.createReadStream(file);
    return new Promise((resolve, reject) => {
      readFile.on('end', () => {
        resolve(true);
      });
      readFile.on('error', e => {
        reject(e);
      });
    });
  } else {
    return false;
  }
}

async function tyert() {}

tyert();

function addUser(req, res) {
  res.send('addUser');
}

async function getAllYser(req, res) {
  let userDB = [];
  let error = '';
  try {
    const data = await dbRead();
    if (data) {
      userDB = userDB;
    } else {
      error = 'db error';
    }
  } catch (error) {
    error = 'db error';
    console.error(error);
  }
  console.log('dfd');

  res.send({ error: error, data: userDB });
}

function saveUser(req, res) {
  res.send('saveUser');
}

function updateUser(req, res) {
  res.send('updateUser');
}
function deleteUser(req, res) {
  res.send('deleteUser');
}

module.exports = { addUser, getAllYser, saveUser, updateUser, deleteUser };
