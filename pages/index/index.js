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
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    keys: ['title', 'dog', 'focus'],
  },

  async onLoad() {
    wx.setStorageSync('selectedTab', 1)
    console.log('index page', wx.getStorageSync('selectedTab'))

      wx.showLoading({
        title: 'Just a sec..',
      })

const strings = await getStrings(this.data.keys)
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

  onShow() {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

  

})