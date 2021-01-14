// pages/class-info/class-info.js
import {
  getSession,
  getInstructor,
  getStrings
} from '../../utils/requests/index'
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['min', 'kcal', 'coach', 'cancellation_1', 'cancellation_2', 'date', 'price', 'time'],
    strings: {},
    session: {},
    instructor: {},
    btnPattern: {},
    options:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options){
    this.setData({options})
  },
  async onShow() {
    const user = wx.getStorageSync('user')
      this.setData({
        user
      })
    const {
      sessionId,
      instructorId
    } = this.data.options
    const session = await getSession(sessionId)
    const instructor = await getInstructor(instructorId)
    const strings = await getStrings('class-info', this.data.keys)
    this.setData({
      session,
      instructor,
      strings,
    })
    
    this.setBtnPattern(this.data.session)
  },
  async handleChangedDate({
    detail
  }) {
    const {
      sessionId,
      instructorId
    } = detail
    this.setData({
      session: await getSession(sessionId),
      instructor: await getInstructor(instructorId)
    })
    this.setBtnPattern(this.data.session)
  },
  handleLanguageChanged(){
    this.onShow()
  },

  handleQueuedUp({
    detail
  }) {
    const session = detail
    this.setData({
      session
    })
    console.log(this.data.session)
    this.setBtnPattern(this.data.session)
  },

  setBtnPattern(session) {
    const btnPattern = {
      disabled: session.btn_pattern.disabled,
      text: session.btn_pattern.text,
      action: session.btn_pattern.action,
      sessionId: session.id
    }
    this.setData({
      btnPattern
    })
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