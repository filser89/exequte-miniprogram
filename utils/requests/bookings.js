import {request} from './request'

const getBooking = (bookingId) => {
  const options = {
    method: 'get',
    url: `/bookings/${bookingId}`,
  }
  return request(options)
}

const getBookingWithLoggedWorkout = (bookingId) => {
  const options = {
    method: 'get',
    url: `/bookings/${bookingId}/workout_log`,
  }
  return request(options)
}

const getAttendanceList = () => {
  const options = {
    method: 'get',
    url: '/training_sessions/32/bookings/attendance_list',
  }
  return request(options)
}

const createBooking = (sessionId, params) => {
  const options = {
    method: 'post',
    url: `/training_sessions/${sessionId}/bookings`,
    data: {
      ...params
    }
  }
  return request(options)
}

const updateBookingWorkout = (bookingId, params) => {
  const options = {
    method: 'post',
    url: `/bookings/${bookingId}/log_workout`,
    data: {
      ...params
    }
  }
  return request(options)
}

const cancelBooking = (id) => {
  const options = {
    method: 'put',
    url: `/bookings/${id}/cancel`,
  }
  return request(options)
}

const takeAttendance = (attendance) => {
  const options = {
    method: 'put',
    url: '/bookings/take_attendance',
    data: attendance
  }
  return request(options)
}

const getUsersBookings = () => {
  const options = {
    method: 'get',
    url: `/bookings`,
  }
  return request(options)
}

const getUsersBookingsWithHrm = () => {
  const options = {
    method: 'get',
    url: `/bookings/hrm`,
  }
  return request(options)
}

const getUsersBookingsWithLoggedWorkouts = (isFitnessTest) => {
  let url = "/bookings/workout_logs"
  if (isFitnessTest)
    url = "/bookings/fitness_tests"
  const options = {
    method: 'get',
    url: url,
  }
  return request(options)
}


module.exports = {
  getBooking,
  getAttendanceList,
  createBooking,
  cancelBooking,
  takeAttendance,
  getUsersBookings,
  getUsersBookingsWithHrm,
  getBookingWithLoggedWorkout,
  getUsersBookingsWithLoggedWorkouts,
  updateBookingWorkout
}