// pages/booking-confirmation/booking-confirmation.js
import {getBooking, getStrings} from '../../utils/requests/index.js'
import { updateBarColors } from '../../utils/util'

import {
  promisifyAll
} from 'miniprogram-api-promise'
const wxp = {}
promisifyAll(wx, wxp)

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    options: {},
    studio: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options){
    this.setData({options})
  },
  async showFollowAccountModal() {
    let modalTitle = this.strings && this.strings.follow_account || "Please remember that this class can be cancelled for free ONLY PLACEHOLDER hours in advance. Later cancellations will incur in one day penalty/no refund.Follow the official account to receive class notifications for bookings!"
  try {
      let cancelBefore = 6
      if (this.data && this.data.booking && this.data.booking.session && this.data.booking.session.cancel_before){
        cancelBefore = this.data.booking.session.cancel_before
      }
      modalTitle = modalTitle.replace("PLACEHOLDER", cancelBefore)
    } catch (e){}
    let res = await wxp.showModal({
      title: modalTitle,
      confirmText: this.properties.strings && this.properties.strings.ok 
      || "Ok",
      cancelText: this.properties.strings && this.properties.strings.close 
      || "Close"
    })
    if (res.confirm) {
      //    
    } else {
    }
  },
  async onShow() {
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
  updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))
    const booking = await getBooking(this.data.options.bookingId)
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({booking, strings})
    this.showFollowAccountModal()
  },
  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
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