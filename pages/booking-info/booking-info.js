// pages/booking-info/booking-info.js
import {getBooking, getInstructor, getStrings} from "../../utils/requests/index"
import {isLateCancellation, updateBarColors} from "../../utils/util"
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    booking: {},
    isLateCancel: false,
    enforceCancellationPolicy: true,
    instructor:{},
    btnPattern: {
      disabled: false,
      text: "CANCEL",
      action: "askCancel"
    },
    studio: "reshape"
  },

  /**
   * Lifecycle function--Called when page load
   */

   onLoad(options){
    this.setData({options})
   },
  async onShow() {
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio);

    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))
    const options = this.data.options
    console.log(options)
    const booking = await getBooking(options.bookingId)
    const instructor = await getInstructor(options.instructorId)
    const strings = await getStrings(this.route.split('/')[2])
    if (booking && booking.session && booking.session.begins_at){
        const isLateCancel = isLateCancellation(booking.session.begins_at, booking.session.cancel_before)
        const enforceCancellationPolicy = booking.session.enforce_cancellation_policy
        this.setData({
          isLateCancel,
          enforceCancellationPolicy
        })
    }
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
  handleStudioChanged(){
    console.log("studio got changed")
    wx.reLaunch({
      url: '/pages/booking-info/booking-info',
    })
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