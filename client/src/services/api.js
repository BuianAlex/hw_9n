import axios from 'axios'
import { setLocalUser, removeLocalUser } from './localStorage'

//axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export async function loginUser(user) {
  let apiRes = {}
  try {
    const servRes = await axios.post('./users/login', user)
    if (typeof servRes.data.result === 'object') {
      setLocalUser(servRes.data.result)
      apiRes.result = true
    }
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = 'Server does not respond.'
    } else {
      apiRes.error = error.response.data.message
    }
  }
  console.log(apiRes)

  return apiRes
}

export async function logoutUser() {
  try {
    await axios.get('./users/logout')
    removeLocalUser()
    document.location.href = '/'
  } catch (error) {
    if (error.response.status === 500) {
      return 'Server does not respond.'
    }
    return error.response.data.message
  }
}

export async function getAllUsers(limit, page) {
  let apiRes = {}
  try {
    const servRes = await axios.get(`/users/get`, {
      params: {
        limit,
        page
      }
    })
    if (servRes.data.result.usersList.length > 0) {
      apiRes.result = servRes.data.result
    } else {
      apiRes.error = 'No users in the database'
    }
  } catch (error) {
    console.log(Object.keys(error.response))

    if (error.response && error.response.status === 401) {
      removeLocalUser()
      document.location.href = '/'
    } else {
      apiRes.error = 'Server does not respond.'
    }
  }
  return apiRes
}

export async function deleteUser(usersId) {
  let apiRes = {}
  try {
    const servRes = await axios.post('/users/delete', usersId)
    apiRes.result = servRes.data.result
  } catch (error) {
    if (error.response && error.response.status === 500) {
      apiRes.error = 'Server does not respond.'
    } else {
      apiRes.error = error.response.data.message
    }
  }
  return apiRes
}

export async function createUser(userData) {
  //temp userData.photo
  // userData.photo = "user.svg";
  let apiRes = {}
  try {
    const servRes = await axios.post('/users/create', userData)
    console.log(servRes.data.status)

    if (servRes.data.status === 1) {
      apiRes.result = true
    } else {
      apiRes.error = servRes.data.error
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      apiRes.error = 'Server does not respond.'
    }
    apiRes.error = error.response.data.message
    // TODO: type of user
  }
  return apiRes
}

export async function updateUser(id, userData) {
  let apiRes = {}
  try {
    const servRes = await axios.put(`/users/update/${id}`, userData)
    apiRes.result = servRes.data.result
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = 'Server does not respond.'
    } else {
      apiRes.error = error.response.data.message
    }
  }
  return apiRes
}

export async function uploadUserPhoto(file) {
  let apiRes = {}
  try {
    const formData = new FormData()
    formData.append('photo', file[0])
    const servRes = await axios.post('files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    apiRes.fileName = servRes.data.result
  } catch (error) {
    if (error.response.status === 500) {
      apiRes.error = 'Server does not respond.'
    } else {
      apiRes.error = error.response.data.message
    }
  }
  return apiRes
}

export function sendCsv(file) {
  const formData = new FormData()
  formData.append('csvFile', file[0])
  return axios.post('/users/csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  // .then(apiData => apiData)
  // .catch(error => {
  //   if (error.response) {
  //     return error.response.data.message;
  //   } else {
  //     return "Server does not respond.";
  //   }
  // });
}
