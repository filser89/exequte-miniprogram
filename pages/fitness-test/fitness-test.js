// pages/fitness-test/fitness-test.js
import {getStrings,getBookingWithLoggedWorkout,updateLoggedWorkout,getLoggedExercisesHistory, approveLoggedWorkout, denyLoggedWorkout} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'
import {
  promisifyAll,
} from 'miniprogram-api-promise';

const wxp = {}
promisifyAll(wx, wxp)

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    booking: {},
    current: {},
    circular: false,
    historyCircular: true,
    vertical: false,
    previousMargin: 0,
    nextMargin: 0,
    past_exercises: {},
    studio: "reshape"
  },

  
  onLoad(options){
    this.setData({options})
   },

  async onShow() {
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)

    const options = this.data.options
    console.log(options)
    const bookingId = this.data.options.bookingId
    const booking = await getBookingWithLoggedWorkout(bookingId)
    if (booking && booking.workout && booking.workout.exercises_workouts['block-a']) {
      console.log("jere");
      console.log(booking.workout.exercises_workouts['block-a']);
      let current = {}
      for (let i = 0; i < booking.workout.exercises_workouts['block-a'].length; i++){
        let tmp = booking.workout.exercises_workouts['block-a'][i];
          current[tmp.id] = 1;
      }
      this.setData({current});
    }
    const strings = await getStrings(this.route.split('/')[2])
    if (booking && booking.workout){
      switch (booking.workout.validation_status) {
        case "denied":
          booking.workout.validation_status_str = strings ? strings.denied || "DENIED" : "DENIED"
          booking.workout.validation_status_color = strings ? strings.denied_color || "#ff0000010" : "#ff0000010"
          break;
        case "approved":
          booking.workout.validation_status_str = strings ? strings.approved || "APPROVED" : "APPROVED"
          booking.workout.validation_status_color = strings ? strings.approved_color || "#00ff0010" : "#00ff0010"
          break;
        case "pending":
          booking.workout.validation_status_str = strings ? strings.pending || "WAITING FOR APPROVAL" : "WAITING FOR APPROVAL"
          booking.workout.validation_status_color = strings ? strings.pending_color || "#F2C94C10" : "#F2C94C10"
          break;
        default:
          booking.workout.validation_status_str = strings ? strings.none || "WAITING SUBMISSION" : "WAITING SUBMISSION"
          booking.workout.validation_status_color = strings ? strings.waiting_color || "#97daf540" : "#97daf540"
          break;
      }
    }
    this.setData({
      booking,
      strings
    })    
  },

  async submitWorkout({detail}) {
    const loggedExercises = [];
    try {
      Object.keys(detail.value).forEach(key => {
        const [id, attribute] = key.split('-'); 
        let exercise = loggedExercises.find(exercise => exercise.id === id);
        if (!exercise) {
          exercise = { id };
          loggedExercises.push(exercise);
        }
        exercise[attribute] = detail.value[key];
      });
      let request_payload = { "logged_exercises" : loggedExercises }
      this.submitRequest(this.data.booking.workout.id, request_payload);
    } catch(e){
      console.log(e);
    }
  },
  

  async loadHistory({currentTarget}){
    const {exerciseId, exerciseName} = currentTarget.dataset
    console.log(exerciseId + "," + exerciseName)
    let res = await getLoggedExercisesHistory(exerciseId)
    let workout_date = this.data.booking.date
    let currentDate = new Date(workout_date);
  
  // Filter out objects with updated_at greater than the current date
  //@todo double check why current exercise shows
  let filteredExercises = res.filter(exercise => {
    let logged_workout_date = new Date(exercise.logged_workout_date);
    return (exercise.logged_workout_validation_status === "approved") && logged_workout_date < currentDate;
  });
  
  // Parse updated_at to local date format
  filteredExercises.forEach(exercise => {
    exercise.logged_workout_date = new Date(exercise.logged_workout_date).toLocaleString();
  });

  let past_exercises = this.data.past_exercises;
  past_exercises[exerciseId] = filteredExercises;
    
    this.setData({past_exercises})
    if (past_exercises[exerciseId] && past_exercises[exerciseId].length > 0){
      console.log(past_exercises[exerciseId]);
      //this.data.past_exercises[exerciseId] = res
      let current = this.data.current
      current[exerciseId] = 0
      this.setData({current})
    } else {
      wx.showToast({
        title: this.data.strings && this.data.strings.no_past_data 
        || "No past data",
        icon: 'error',
        duration: 2500
      })
    }
  },

  hideHistory({currentTarget}){
    const {exerciseId, exerciseName} = currentTarget.dataset
    console.log(exerciseId + "," + exerciseName)
    let past_exercises = this.data.past_exercises
    past_exercises[exerciseId] = {}
    this.setData({past_exercises})
    let current = this.data.current
    current[exerciseId] = 1
    this.setData({current})
  },

  async approveWorkout(){
    let user_name = "eXequte";
    if (getApp() && getApp().globalData && getApp().globalData.user){
      user_name = getApp().globalData.user.first_name || "exeQute";
    }
    let params = { "validated_by": user_name}
    let res = await approveLoggedWorkout(this.data.booking.workout.id, params);
    if (res && res.status === "ok") {
      wx.showToast({
        title: this.data.strings && this.data.strings.approved 
        || "Workout Approved",
        icon: 'success',
        duration: 2500
      })
    } else {
      wx.showToast({
        title: this.data.strings && this.data.strings.other_error 
        || "Error",
        icon: 'error',
        duration: 2500
      })
    }
  },

  async denyWorkout(){
    let user_name = "eXequte";
    if (getApp() && getApp().globalData && getApp().globalData.user){
      user_name = getApp().globalData.user.first_name || "exeQute";
    }
    let params = { "validated_by": user_name}
    let res = await denyLoggedWorkout(this.data.booking.workout.id, params);
    if (res && res.status === "ok") {
      wx.showToast({
        title: this.data.strings && this.data.strings.denied 
        || "Workout Denied",
        icon: 'success',
        duration: 2500
      })
    } else {
      wx.showToast({
        title: this.data.strings && this.data.strings.other_error 
        || "Error",
        icon: 'error',
        duration: 2500
      })
    }
  },

  async submitRequest(workoutId, requestPayload) {
    const res = await updateLoggedWorkout(workoutId, requestPayload)
    console.log("RES", res)
    if (res && res.msg){
      console.log(res.msg)
      // console.log("RES.USER", res.user)
      // wx.setStorageSync('user', res.user)
    }
    let resp = await wxp.showModal({
      title: this.data && this.data && this.data.strings && this.data.strings.workout_submitted 
      || "Fitness test submitted for approval!",
      cancelText: this.data && this.data && this.data.strings && this.data.strings.close 
      || "Close",
      confirmText: this.data && this.data && this.data.strings && this.data.strings.log_another 
      || "Back",
    })
    if (resp.confirm) {
        wx.reLaunch({
          url: '/pages/home/home',
        })
    } else {
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  },


  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },
  navigateBack(){
    wx.navigateBack({
      delta: 0
    })
  },


})