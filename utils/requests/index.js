import {request} from './request'

import {
  getInstructorSessions,
  getSession,
  getSessions,
  addUserToQueue,
  getSessionDates,
  getSessionAttendance
} from './sessions'

import {
  getBooking,
  getAttendanceList,
  createBooking,
  cancelBooking,
  takeAttendance,
  getUsersBookings
} from './bookings.js'

import {
  getMembershipTypes,
  buyMembership
} from './memberships.js'

import {
  getInstructor,
  getCurrentUser,
  getUserDetails,
  updateUser,
  saveUserAvatar,
  uploadUserAvatar

} from './users.js'

const getStrings = (keys) => {
  const options = {
    method: 'post',
    url: '/pages',
    data: keys
  }
  return request(options)
}



const getBanner = async () => {
  const options = {
    method: 'get',
    url: '/banners',
  }
  return request(options)
}

module.exports = {
  getStrings,
  getCurrentUser,
  getInstructor,
  getUserDetails,
  updateUser,
  saveUserAvatar,
  uploadUserAvatar,
  getMembershipTypes,
  buyMembership,
  addUserToQueue,
  getInstructorSessions,
  getBooking,
  getAttendanceList,
  createBooking,
  cancelBooking,
  getUsersBookings,
  getSession,
  getSessions,
  takeAttendance,
  getBanner,
  getSessionDates,
  getSessionAttendance
}