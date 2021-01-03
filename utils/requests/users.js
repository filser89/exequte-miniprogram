import {request, upload} from './request'

const getCurrentUser = async () => {
  const options = {
    method: 'get',
    url: '/users/info',
  }
  return request(options)
}

const getInstructor = async (id) => {
  const options = {
    method: 'get',
    url: `/users/${id}/instructor`,
  }
  return request(options)
}

const getAllInstructors = async () => {
  const options = {
    method: 'get',
    url: `/users/instructors`,
  }
  return request(options)
}

const getUserDetails = async (id) => {
  const options = {
    method: 'get',
    url: `/users/${id}`,
  }
  return request(options)
}

const updateUser =  async (id, params) => {
  const options = {
    method: 'put',
    url: `/users/${id}`,
    data: {...params}
  }
  return request(options)
}

const saveUserAvatar = async (id, params) => {
  const options = {
    method: 'put',
    url: `/users/${id}/wechat_avatar`,
    data: params
  }
  return request(options)
}

const uploadUserAvatar = async (userId, filePath) => {
  const options = {
    url: `/users/${userId}/avatar`,
    filePath,
    name: 'avatar'
  }
  return upload(options)
}

module.exports = {
  getCurrentUser,
  getInstructor,
  getAllInstructors,
  getUserDetails,
  updateUser,
  saveUserAvatar,
  uploadUserAvatar
}