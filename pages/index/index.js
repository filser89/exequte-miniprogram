//index.js
//获取应用实例

import {
  getStrings,
  getBanner,
  getSessions,
  getCurrentUser,
} from '../../utils/requests/index';

Page({
  data: {
    keys: ['cat'], //add the localization keys here
    strings: {},
    user: {},
    banner: {},
    sessions: [],
    dates: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: false
  },

  async onShow() {
    wx.setStorageSync('selectedTab', 1)
    console.log('index page', wx.getStorageSync('selectedTab'))

      wx.showLoading({
        title: 'Just a sec..',
      })

const strings = await getStrings('index', this.data.keys)
const user = await getCurrentUser()
const banner = await getBanner()
const arr =  await getSessions()
console.log("SESSIONS", arr)


const sessions = arr.sessions
const dates = arr.dates.map(d => {
  let sd = d.split(/\s+/)
  return {
    dateW: sd[0],
    dateD: sd[1],
    dateM: sd[2]
  }
 })
Promise.all([strings, user, banner, arr]).then((values) => {
  console.log('values', values)
  this.setData({strings, user, banner, sessions: sessions, dates: dates})
  wx.hideLoading()
})

  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  handleLanguageChanged(){
    this.onShow()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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