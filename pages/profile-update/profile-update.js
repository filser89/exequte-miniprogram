// pages/profile-update/profile-update.js
import WxValidate from '../../utils/WxValidate'
import {
  getUserDetails,
  updateUser,
  uploadUserAvatar
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
  data: {},

  /**
   * Lifecycle function--Called when page load
   */
  async onShow() {
    this.initValidate()
    const user = wx.getStorageSync('user')
    console.log('id', user.id)
    this.setData({
      user: await getUserDetails(user.id)
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
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  handleLanguageChanged() {
    this.onShow()
  }
})