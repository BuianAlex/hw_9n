import axios from 'axios';

//axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export function loginUser(user) {
  return axios
    .post('./users/login', user)
    .then(servRes => {
      return servRes.data.result;
    })
    .catch(error => {
      let errMsg;
      if (error.response.status === 500) {
        errMsg = 'Server does not respond.';
      } else {
        errMsg = error.response.data.message;
      }
      return Promise.reject(errMsg);
    });
}

export function logoutUser() {
  return axios
    .get('./users/logout')
    .then(() => {
      return true;
    })
    .catch(error => {
      let errMsg;
      if (error.response.status === 500) {
        errMsg = 'Server does not respond.';
      }
      errMsg = error.response.data.message;
      return errMsg;
    });
}

export function getAllUsers(limit, page) {
  return axios.get(`/users/get`, {
    params: {
      limit,
      page
    }
  });
  // let apiRes = {};
  // try {
  //   const servRes = await axios.get(`/users/get`, {
  //     params: {
  //       limit,
  //       page
  //     }
  //   });
  //   if (servRes.data.result.usersList.length > 0) {
  //     apiRes.result = servRes.data.result;
  //   } else {
  //     apiRes.error = 'No users in the database';
  //   }
  // } catch (error) {
  //   if (error.response && error.response.status === 401) {
  //     // document.location.href = '/';
  //   } else {
  //     apiRes.error = 'Server does not respond.';
  //   }
  //   console.log(apiRes.error);

  //   return error;
  // }
  // return apiRes;
}

export async function deleteUser(usersId) {
  let apiRes = {};
  try {
    const servRes = await axios.post('/users/delete', usersId);
    apiRes.result = servRes.data.result;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      apiRes.error = 'Server does not respond.';
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}

export function createUser(userData) {
  return axios
    .post('/users/create', userData)
    .then(servRes => {
      console.log(1);

      return servRes.data.result;
    })
    .catch(error => {
      let errMsg;
      if (error.response.status === 500) {
        errMsg = 'Server does not respond.';
      } else {
        errMsg = error.response.data.message;
      }
      return Promise.reject(errMsg);
    });

  //temp userData.photo
  // userData.photo = "user.svg";
  // let apiRes = {};
  // try {
  //   const servRes = await axios.post('/users/create', userData);
  //   if (servRes.data.status === 1) {
  //     apiRes.result = true;
  //   } else {
  //     apiRes.error = servRes.data.error;
  //   }
  // } catch (error) {
  //   if (error.response && error.response.status === 500) {
  //     apiRes.error = 'Server does not respond.';
  //   }
  //   apiRes.error = error.response.data.message;
  //   // TODO: type of user
  // }
  // return apiRes;
}

export async function updateUser(id, userData) {
  let apiRes = {};
  try {
    const servRes = await axios.put(`/users/update/${id}`, userData);
    apiRes.result = servRes.data.result;
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = 'Server does not respond.';
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}

export async function uploadUserPhoto(file) {
  let apiRes = {};
  try {
    const formData = new FormData();
    formData.append('photo', file[0]);
    const servRes = await axios.post('files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    apiRes.fileName = servRes.data.result;
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = 'Server does not respond.';
    } else {
      apiRes.error = error.response.data.message;
    }
  }
  return apiRes;
}

export function sendCsv(file) {
  const formData = new FormData();
  formData.append('csvFile', file[0]);
  return axios.post('/users/csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  // .then(apiData => apiData)
  // .catch(error => {
  //   if (error.response) {
  //     return error.response.data.message;
  //   } else {
  //     return "Server does not respond.";
  //   }
  // });
}
