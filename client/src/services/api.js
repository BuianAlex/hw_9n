import axios from "axios";
import { setLocalUser, removeLocalUser } from "./localStorage";

export async function loginUser(user) {
  let apiRes = {};
  try {
    const servRes = await axios.post("/login", user);

    if (servRes.data.status === 1) {
      setLocalUser(servRes.data.result);
      apiRes.result = true;
    }
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = "Server does not respond.";
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}

export async function logoutUser() {
  try {
    const servRes = await axios.get("/logout");
    removeLocalUser();
    document.location.href = "/";
  } catch (error) {
    if (error.response.status === 500) {
      return "Server does not respond.";
    }
    return error.response.data.message;
  }
}

export async function getAllUsers() {
  let res = {};
  try {
    const servRes = await axios.get("/users/get");
    if (servRes.data.status === 1) {
      if (servRes.data.result && servRes.data.result.length > 0) {
        res.result = servRes.data.result;
      } else {
        res.error = "No users in the database";
      }
    }
  } catch (error) {
    if (error.response.status === 401) {
      removeLocalUser();
      document.location.href = "/";
      console.log(error.code);
    } else {
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
    // }lastName
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
  let apiRes = {};
  try {
    const servRes = await axios.post("/users/create", userData);
    console.log(servRes.data.status);

    if (servRes.data.status === 1) {
      apiRes.result = true;
    } else {
      apiRes.error = servRes.data.error;
    }
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = "Server does not respond.";
    }
  }
  return apiRes;
}

export async function updateUser(id, userData) {
  let apiRes = {};
  try {
    const servRes = await axios.put(`/users/update/${id}`, userData);
    if (servRes.data.status === 200) {
      apiRes.result = true;
    }
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = "Server does not respond.";
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}
