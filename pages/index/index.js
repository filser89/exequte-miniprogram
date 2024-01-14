//index.js
//获取应用实例

import {
  getStrings,
  getBanner,
  // getSessions,
  getCurrentUser,
  getDates
} from '../../utils/requests/index';
import { updateBarColors } from '../../utils/util'
const app = getApp()

Page({
  data: {
    strings: {},
    user: {},
    banner: [],
    dates: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    showSplash: true,
    size: "big"
  },

  async onShow() {
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', 1)
    console.log('index page', wx.getStorageSync('selectedTab'))

      wx.showLoading({
        title: 'Just a sec..',
      })

const strings = await getStrings(this.route.split('/')[2])
const user = await getCurrentUser()
const banner = await getBanner()
// const arr =  await getSessions()
const rawDates= await getDates()

let currentLang = 'en'
if (app && app.globalData && app.globalData.headers && app.globalData.headers['X-API-Lang']){
  currentLang = app.globalData.headers['X-API-Lang']
}

const dates = rawDates.map(d => {
  let date = new Date(d).toString()
  let sd = date.split(/\s+/)
  if (currentLang == "zh-CN"){
    switch (sd[0]) {
      case 'Mon':
        sd[0] = '周一';
        break;
      case 'Tue':
        sd[0] = '周二';
        break;
      case 'Wed':
        sd[0] = '周三';
        break;
      case 'Thu':
        sd[0] = '周四';
        break;
      case 'Fri':
        sd[0] = '周五';
        break;
      case 'Sat':
        sd[0] = '周六';
        break;
      case 'Sun':
        sd[0] = '周日';
        break;        
      default:
        break;
    }
    sd[2] += '日'
   sd[1] = new Date(d).getMonth() + 1 + "月"
  } 
  return {
    dateW: sd[0],
    dateD: sd[2],
    dateM: sd[1]
  }
})

Promise.all([strings, user, banner, rawDates]).then((values) => {
  console.log('values', values)
  this.setData({strings, user, banner, dates, rawDates})
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
    this.setData({lang: app.globalData.headers['X-API-Lang']})
    console.log(this.data.lang)
  },
  handleStudioChanged(){
    this.onShow()
    this.setData({studio: app.globalData.studio})
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

  },

  onLoad: function(){
    
  }


})