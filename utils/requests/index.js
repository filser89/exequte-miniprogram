import {request} from './request'

import {
  getInstructorSessions,
  getAdminSessions,
  getSession,
  getSessions,
  addUserToQueue,
  getSessionDates,
  getSessionAttendance,
  getDates,
  getSessionsByDate,
  cancelSession,
  changeCapacity
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
  getMembershipTypesBySession,
  buyMembership
} from './memberships.js'

import {
  getInstructor,
  getAllInstructors,
  getCurrentUser,
  getUserDetails,
  updateUser,
  saveUserAvatar,
  uploadUserAvatar,
  processUserInfo

} from './users.js'

import {
  getHrmDataForBooking,
  getHrmGraphForBooking,
  getHrmDataGraphForBooking
} from './hrms.js'

const getStrings = (page) => {
  const options = {
    method: 'post',
    url: '/pages',
    data: {
      page
    }
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

const useCoupon = async (coupon) => {
  const options = {
    method: 'get',
    url: `/coupons?coupon_code=${coupon}`,
  }
  return request(options)
}

const getInfo = async (scope) => {
  const options = {
    method: 'get',
    url: `/infos?scope=${scope}`,
  }
  return request(options)
}

const deleteFailedPayment = async (controller, id) =>{
  const options = {
    method: 'delete',
    url: `/${controller}/${id}`
  }
  return request(options)
}


module.exports = {
  getInfo,
  getStrings,
  useCoupon,
  getCurrentUser,
  deleteFailedPayment,
  getInstructor,
  getAllInstructors,
  getUserDetails,
  updateUser,
  saveUserAvatar,
  uploadUserAvatar,
  processUserInfo,
  getMembershipTypes,
  getMembershipTypesBySession,
  buyMembership,
  addUserToQueue,
  getInstructorSessions,
  getAdminSessions,
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
  getSessionAttendance,
  getDates,
  getSessionsByDate,
  cancelSession,
  changeCapacity,
  getHrmDataForBooking,
  getHrmGraphForBooking,
  getHrmDataGraphForBooking
}