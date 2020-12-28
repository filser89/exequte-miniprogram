// pages/booking-confirmation/booking-confirmation.js
import {getBooking} from '../../utils/requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))
    this.setData({booking: await getBooking(options.bookingId)})
  }

 
})