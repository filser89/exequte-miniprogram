// pages/booking-info/booking-info.js
import {getBooking, getInstructor} from "../../utils/requests/index"
Page({

  /**
   * Page initial data
   */
  data: {
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
    this.setData({
      booking,
      instructor
    })

  },
  
  async handleClassCancelled (){
    const booking = await getBooking(this.data.booking.id)
    this.setData({booking})
  },

  handleLanguageChanged(){
    this.onShow()
  }


})