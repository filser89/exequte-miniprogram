// pages/booking-confirmation/booking-confirmation.js
import {getBooking} from '../../utils/requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {
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
    this.setData({booking: await getBooking(this.data.options.bookingId)})
  },
  handleLanguageChanged(){
    this.onShow()
  },
 
})