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
  async onLoad(options) {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))

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
  }
})