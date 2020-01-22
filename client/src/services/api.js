import axios from "axios";
import { setLocalUser, removeLocalUser } from "./localStorage";

export async function loginUser(user) {
  let apiRes = {};
  try {
    const servRes = await axios.post("./users/login", user);
    if (typeof servRes.data.result === "object") {
      setLocalUser(servRes.data.result);
      apiRes.result = true;
    }
    console.error("servRes.data.result");
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
    await axios.get("./users/logout");
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
  let apiRes = {};
  try {
    const servRes = await axios.get("/users/get");
    if (servRes.data.result.length > 0) {
      apiRes.result = servRes.data.result;
    } else {
      apiRes.error = "No users in the database";
    }
  } catch (error) {
    if (error.response.status === 401) {
      removeLocalUser();
      document.location.href = "/";
    } else {
      apiRes.error = "Server does not respond.";
    }
  }
  return apiRes;
}

export async function deleteUser(usersId) {
  let apiRes = {};
  try {
    const servRes = await axios.post("/users/delete", usersId);
    console.log(servRes);
    apiRes.result = servRes.data.result;
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = "Server does not respond.";
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}

export async function createUser(userData) {
  //temp userData.photo
  userData.photo = "user.svg";
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
    apiRes.error = error.response.data.message;
    // TODO: type of user
  }
  return apiRes;
}

export async function updateUser(id, userData) {
  let apiRes = {};
  try {
    const servRes = await axios.put(`/users/update/${id}`, userData);
    apiRes.result = servRes.data.result;
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = "Server does not respond.";
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}
