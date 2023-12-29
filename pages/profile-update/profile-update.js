// pages/profile-update/profile-update.js
import WxValidate from '../../utils/WxValidate'
import {
  getUserDetails,
  updateUser,
  uploadUserAvatar,
  getStrings
} from '../../utils/requests/index'

import {
  promisifyAll,
} from 'miniprogram-api-promise';

const wxp = {}
promisifyAll(wx, wxp)
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    user: {},
    showWaiver: true,
    isWaiverSigned: false,
    /*waiver_default: "I, the participant named below, have agreed to participate in the ExeQute workouts"
    */
  
    waiver_default: "I, the participant named below, have agreed to participate in the ExeQute workouts,\
    exercise and training programs (“Workouts”).\
    I acknowledge and agree that the Workouts:\
    • are a recreational sport activity; and\
    • may involve strenuous physical activity including, but not limited to, muscle\
    strength and endurance training, cardiovascular conditioning and training, and \
    other various fitness activities.\
    I hereby affirm, and I affirm each time I participate in a Workout, that:\
    • I am in good physical condition and do not suffer from any known disability or\
    condition which would prevent or limit my participation in this exercise\
    program; and\
    • I am participating in the Workouts voluntarily and at my own risk.\
    I hereby release ExeQute and their officers,\
    agents and employees (the “Released Parties”) from any claims, demands, and\
    causes of action as a result of my voluntary participation in the Workouts, to the\
    extent permitted by law.\
    I fully understand that I may injure myself as a result of my participation in the\
    workouts and I hereby release the Released Parties from any liability now or in the\
    future for conditions that I may obtain directly or indirectly from participating in the\
    Workouts, to the fullest extent permitted by law. These conditions may include, but\
    are not limited to, heart attacks, muscle strains, muscle pulls, muscle tears, broken\
    bones, shin splints, heat prostration, injuries to knees, injuries to back, injuries to\
    foot, or any other illness or soreness that I may incur, including death."
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options){
    console.log(options)
    this.setData({sessionId: options.sessionId})
    let userId
    if (options.userId){
      console.log('view other user profile')
      this.setData({isOtherUser: true})
      userId = options.userId
    } else {
      this.setData({isOtherUser: false})
      const currentUser = wx.getStorageSync('user')
      console.log('id', currentUser.id)
      userId = currentUser.id
    }
    const user = await getUserDetails(userId)
    let isWaiverSigned = false
    if (user.waiver_signed){
      isWaiverSigned = true
    }
    this.setData({user, isWaiverSigned})
  },
  async onShow() {
    console.log('ON SHOW CALLED')
    this.initValidate()

    const strings = await getStrings(this.route.split('/')[2])
    this.setData({
      strings
    })
  },
  async uploadImage(e) {
    console.log("upload image")
    const res = await wxp.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      courceType: ['album', 'camera']
    })
    const filePath = res.tempFilePaths[0]
    console.log("url", filePath)
    const response = await uploadUserAvatar(this.data.user.id, filePath)
    console.log('response', response)
    wx.showToast({
      title: 'Avatar uploaded',
      icon: 'none',
      duration: 1500
    })
  },



  formSubmit({
    detail
  }) {
    console.info('value:', detail.value)
    const params = detail.value
    // validation     
    if (!this.WxValidate.checkForm(params)) { 
      this.handleValidationFailure()
      return false
    }
    console.log('Authentication successful');
    // Start submission      
    this.submitRequest(params)
  },

  async submitRequest(params) {
    // console.log('submitRequest', params)
    const res = await updateUser(this.data.user.id, params)
    console.log("RES", res)
    if (this.data.sessionId) {
      this.redirectToBooking()

    } else {
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1500,
      })
    }
    console.log("RES.USER", res.user)
    wx.setStorageSync('user', res.user)
  },

  redirectToBooking() {
    wx.redirectTo({
      url: `../../pages/booking/booking?sessionId=${this.data.sessionId}`,
    })
  },


  handleValidationFailure() {
    const error = this.WxValidate.errorList[0]
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 1000,
    })
  },

  initValidate() {
    const rules = {
      first_name: {
        required: true
      },
      last_name: {
        required: true
      },
      phone: {
        required: true
      },
      mp_email: {
        required: true
      },
      emergency_name: {
        required: true
      },
      emergency_phone: {
        required: true
      },
      birthday: {
        required: true
      }

    }
    const messages = {
      first_name: {
        required: "First Name is a required field"
      },
      last_name: {
        required: "Last Name is a required field"
      },
      phone: {
        required: "Phone is a required field"
      },
      mp_email: {
        required: "Email is a required field"
      },
      emergency_name: {
        required: "Emergency Contact Name is a required field"
      },
      emergency_phone: {
        required: "Emergency Contact  Phone is a required field"
      },
      birthday: {
        required: "Birthday is required"
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  handleLanguageChanged() {
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },
/**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  /* form methods */
  async updateWaiver(e) {
    let params = {}
    if (e.detail && e.detail.value && e.detail.value[0]){
      params.waiver_signed = true
    } else {
      params.waiver_signed = false
    }
    params.waiver_signed_at = new Date()
    const res = await updateUser(this.data.user.id, params)
    console.log("RES", res)
    wx.setStorageSync('user', res.user)
  }

})