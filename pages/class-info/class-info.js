// pages/class-info/class-info.js
import {
  getSession,
  getInstructor
} from '../../utils/requests/index'
Page({

  /**
   * Page initial data
   */
  data: {
    session: {},
    instructor: {},
    btnPattern: {},
    options:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    console.log(options)
    const user = wx.getStorageSync('user')
      this.setData({
        user
      })
    const {
      sessionId,
      instructorId
    } = options
    this.setData({
      session: await getSession(sessionId),
      instructor: await getInstructor(instructorId),
      options
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
    this.onLoad(this.data.options)
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
  }
})