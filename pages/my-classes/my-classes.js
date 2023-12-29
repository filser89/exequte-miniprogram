import {getUsersBookings, getStrings} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

// pages/my-classes/my-classes.js
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    bookings: [],
    selected: 0,
    studio: "reshape"
  },

  /**
   * Lifecycle function--Called when page load
   */

  async onShow() {
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))

    const bookings = await getUsersBookings()
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({bookings, strings})
    // console.log("On load", this.data.bookings)
  },

  switchTab({currentTarget}){
    const {selected} = currentTarget.dataset
    Number.parseInt(selected, 10)
    // console.log('page1', this.data.selected)

    this.setData({selected: Number.parseInt(selected, 10)})
    // console.log('page', this.data.selected)
  },
  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    console.log("studio got changed")
    wx.reLaunch({
      url: '/pages/my-classes/my-classes',
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