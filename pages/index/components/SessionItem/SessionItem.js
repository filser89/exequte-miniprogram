// pages/index/components/SessionItem/SessionItem.js
import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise';

const app = getApp()
const wxp = {}
promisifyAll(wx, wxp)
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    session: Object,
    studio: String
  },

  /**
   * Component initial data
   */
  data: {
    user: {}
  },
  lifetimes: {
    attached() {
    this.setUser()
    },
  },

  pageLifetimes: {
    show() {
    this.setUser()
  }
  },
  /**
   * Component methods
   */
  methods: {
    navigateToClassInfo(e) {
      const {
        sessionId,
        instructorId
      } = e.currentTarget.dataset
      wx.navigateTo({
        url: `../class-info/class-info?sessionId=${sessionId}&instructorId=${instructorId}`,
      })
    },
    handleQueuedUp({
      detail
    }) {
      const session = detail
      this.setData({
        session
      })
      console.log(this.data.session)
    },
    setUser(){
      const user = wx.getStorageSync('user')
      this.setData({
        user
      })
    }
  }
})