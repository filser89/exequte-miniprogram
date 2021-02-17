// pages/booking-confirmation/booking-confirmation.js
import {getBooking, getStrings} from '../../utils/requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    options: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options){
    this.setData({options})
  },
  async onShow() {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))
    const booking = await getBooking(this.data.options.bookingId)
    const strings = await getStrings(this.route.split('/')[2])

    this.setData({booking, strings})
  },
  handleLanguageChanged(){
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