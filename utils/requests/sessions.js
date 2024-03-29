import {request, upload} from './request'

const getDates = () => {
  const options = {
    method: 'get',
    url: '/training_sessions',
  }
  return request(options)
}

const getSessionsByDate = (date) => {
  const options = {
    method: 'get',
    url: `/training_sessions/sessions?date=${date}`,
  }
  return request(options)
}

const getInstructorSessions = () => {
  const options = {
    method: 'get',
    url: '/training_sessions/instructor_sessions',
  }
  return request(options)
}

const getAdminSessions = () => {
  const options = {
    method: 'get',
    url: '/training_sessions/admin_sessions',
  }
  return request(options)
}

const getSession = (id) => {
  const options = {
    method: 'get',
    url: `/training_sessions/${id}`,
  }
  return request(options)
}

const getSessions = () => {
  const options = {
    method: 'get',
    url: '/training_sessions',
  }
  return request(options)
}

const addUserToQueue = (sessionId) => {
  const options = {
    method: 'put',
    url: `/training_sessions/${sessionId}/add_user_to_queue`,
  }
  return request(options)
}

const getSessionDates = (trainingId) =>{
  const options = {
    method: 'get',
    url: `/training_sessions/dates_list?training_id=${trainingId}`,
  }
  return request(options)
}

const getSessionAttendance = (id) =>{
  const options = {
    method: 'get',
    url: `/training_sessions/${id}/session_attendance`,
  }
  return request(options)
}

const cancelSession = (id, note) => {
  const options = {
    method: 'put',
    url: `/training_sessions/${id}/cancel?note=${note}`,
  }
  return request(options)
}

const changeCapacity = (id, capacity) => {
  const options = {
    method: 'put',
    url: `/training_sessions/${id}/change_capacity?capacity=${capacity}`,
  }
  return request(options)
}

const uploadSessionPhoto = async (id, filePath) => {
  const options = {
    url: `/training_sessions/${id}/group_picture`,
    filePath,
    name: 'group_picture'
  }
  return upload(options)
}

// /training_sessions/:id/session_attendance

module.exports = {
  getInstructorSessions,
  getAdminSessions,
  getSession,
  getSessions,
  addUserToQueue,
  getSessionDates,
  getSessionAttendance,
  uploadSessionPhoto,
  getDates,
  getSessionsByDate,
  cancelSession,
  changeCapacity
}