// pages/class-info/class-info.js
import {
  getSession,
  getInstructor,
  getStrings
} from '../../utils/requests/index'
import {isLateCancellation} from "../../utils/util"
import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    session: {},
    instructor: {},
    isLateCancel: false,
    enforceCancellationPolicy: true,
    btnPattern: {},
    options:{},
    studio: "",
    studioParameter: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options){
    this.setData({options})
  },
  async onShow() {
    const {
      sessionId,
      instructorId,
      studioParameter
    } = this.data.options
    console.log(studioParameter)
    if (studioParameter && studioParameter !== getApp().globalData.studio){
      console.log('updating studio')
      getApp().globalData.studio = studioParameter;
    }
    this.setData({studio: getApp().globalData.studio})
    updateBarColors(getApp().globalData.studio)
    const user = wx.getStorageSync('user')
      this.setData({
        user
      })

    let session = await getSession(sessionId)
    try {
      session.credit_price = session.credits * 6.5;
    } catch(e){}
    const instructor = await getInstructor(instructorId)
    const strings = await getStrings(this.route.split('/')[2])
    if (session && session.begins_at){
      const isLateCancel = isLateCancellation(session.begins_at, session.cancel_before)
      const enforceCancellationPolicy = session.enforce_cancellation_policy
      this.setData({
        isLateCancel,
        enforceCancellationPolicy
      })
    }
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
    let session = await getSession(sessionId)
    try {
      session.credit_price = session.credits * 6.5;
    } catch(e){}
    this.setData({
      session,
      instructor: await getInstructor(instructorId)
    })
    this.setBtnPattern(this.data.session)
  },
  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
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

  async handleClassCancelled (){
    this.onShow()
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