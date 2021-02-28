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
    user: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options){
    console.log(options)
    this.setData({sessionId: options.sessionId})
    const currentUser = wx.getStorageSync('user')
    console.log('id', currentUser.id)
    const user = await getUserDetails(currentUser.id)
    this.setData({user})
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

  }


})