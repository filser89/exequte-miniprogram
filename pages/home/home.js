// pages/home/home.js
import {getSetting, getUserDetails, getStrings, getBanner, getUsersBookingsWithHrm} from "../../utils/requests/index"

import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    banner: [],
    user: {},
    studio: "",
    info: {},
    lang: "en",
    date: "",
    bookings: [],
    last_bookings: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  async onShow(){
    wx.showLoading({
      title: 'Just a sec..',
    })
    // this.setData({lang: getApp().globalData.headers['X-API-Lang']})
    this.setData({date: this.todayDateString()})
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', 0)
    console.log('home page', wx.getStorageSync('selectedTab'))
    const currentUser = wx.getStorageSync('user')
    console.log('id', currentUser.id)
    const user = await getUserDetails(currentUser.id)
    const bookings = await getUsersBookingsWithHrm();
    const strings = await getStrings(this.route.split('/')[2])
    const banner = await getBanner()
    try {
      let info = JSON.parse(await getSetting('signup_text'));
      const lang = getApp().globalData.headers['X-API-Lang'];
      info = info[lang];
      this.setData({info})
      } catch (e){console.log(e)}
    Promise.all([strings, user, banner, bookings]).then((values) => {
      console.log('values', values)
      this.setData({strings, user, banner, bookings})
      let last_bookings = bookings
      if (bookings && bookings.length > 5){
        last_bookings = bookings.slice(0,5);
      }
      this.setData({last_bookings})
      wx.hideLoading()
    })
  },


  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  handleStudioChanged(){
    console.log("studio got changed")
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  handleLanguageChanged(){
    this.onShow()
    this.setData({lang: app.globalData.headers['X-API-Lang']})
    console.log(this.data.lang)
  },

  todayDateString() {
    let date = new Date
    console.log('before date function')
    date = date.toJSON().replace(/T.*/, "T00:00:00.000+08:00")
    return date
  },


  navigateToStudios(){
    console.log('clicked studios')
    wx.navigateTo({
      url: `/pages/terms-and-conditions/terms-and-conditions`
    })
  },
  navigateToTerms(){
    console.log('clicked terms')
    wx.navigateTo({
      url: `/pages/terms-and-conditions/terms-and-conditions`
    })
  },
})