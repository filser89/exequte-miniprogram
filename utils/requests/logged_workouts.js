import {request} from './request'

const updateLoggedWorkout = (workoutId, params) => {
  const options = {
    method: 'post',
    url: `/logged_workouts/${workoutId}/log_workout`,
    data: {
      ...params
    }
  }
  return request(options)
}
const approveLoggedWorkout = (workoutId, params) => {
  const options = {
    method: 'post',
    url: `/logged_workouts/${workoutId}/approve_workout`,
    data: {
      ...params
    }
  }
  return request(options)
}
const denyLoggedWorkout = (workoutId, params) => {
  const options = {
    method: 'post',
    url: `/logged_workouts/${workoutId}/deny_workout`,
    data: {
      ...params
    }
  }
  return request(options)
}

const getLoggedExercisesHistory = (exerciseId) => {
  const options = {
    method: 'get',
    url: `/logged_exercises/${exerciseId}/show_all_by_logged_exercise_id`,
  }
  return request(options)
}


module.exports = {
  updateLoggedWorkout,
  getLoggedExercisesHistory,
  approveLoggedWorkout,
  denyLoggedWorkout
}