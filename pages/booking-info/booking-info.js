// pages/booking-info/booking-info.js
import {getBooking, getInstructor, getStrings} from "../../utils/requests/index"
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
    strings: {},
    booking: {},
    instructor:{},
    btnPattern: {
      disabled: false,
      text: "CANCEL",
      action: "askCancel"
    }
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
    const options = this.data.options
    console.log(options)
    const booking = await getBooking(options.bookingId)
    const instructor = await getInstructor(options.instructorId)
    const strings = await getStrings('booking-info', this.data.keys)
    this.setData({
      booking,
      instructor,
      strings
    })

  },
  
  async handleClassCancelled (){
    const booking = await getBooking(this.data.booking.id)
    this.setData({booking})
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