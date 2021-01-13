// pages/booking-confirmation/booking-confirmation.js
import {getBooking, getStrings} from '../../utils/requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
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
    const strings = await getStrings('booking-confirmation', this.data.keys)

    this.setData({booking, strings})
  },
  handleLanguageChanged(){
    this.onShow()
  },
 
})