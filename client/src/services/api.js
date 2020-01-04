import axios from "axios";

export async function getAllUsers() {
  let res = {};
  try {
    const servRes = await axios.get("/users/get");
    if (servRes.data.result && servRes.data.result.length > 0) {
      res.result = servRes.data.result;
    } else {
      res.error = "No users in the database";
    }
  } catch (error) {
    if (error) {
      res.error = "Server does not respond.";
    }
  }
  return res;
}

export async function deleteUser(usersId) {
  let res = {};
  try {
    const servRes = await axios.post("/users/delete", usersId);
    // if (servRes.data.result && servRes.data.result.length > 0) {
    //   res.result = servRes.data.result;
    // } else {
    //   res.error = "No comments yet";
    // }
  } catch (error) {
    console.error(error);

    if (error) {
      res.error = "Server does not respond.";
    }
  }
  return res;
}
// export async function deleteUser(usersId) {
//   let res = {};
//   try {
//     const servRes = await axios.post("/users/delete", usersId);
//     // if (servRes.data.result && servRes.data.result.length > 0) {
//     //   res.result = servRes.data.result;
//     // } else {
//     //   res.error = "No comments yet";
//     // }
//   } catch (error) {
//     console.error(error);

//     if (error) {
//       res.error = "Server does not respond.";
//     }
//   }
//   return res;
// }

export async function createUser(userData) {
  let res = {};
  try {
    const servRes = await axios.post("/users/create", userData);
  } catch (error) {
    if (error) {
      res.error = "Server does not respond.";
    }
  }
  return res;
}
export async function updateUser(id, userData) {
  let res = {};
  try {
    const servRes = await axios.put(`/users/update/${id}`, userData);
  } catch (error) {
    if (error) {
      res.error = "Server does not respond.";
    }
  }
  return res;
}
