// pages/about/about.js
import {getInfo, getAllInstructors, getStrings} from "../../utils/requests/index"
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
    strings: {},
    info: {},
    instructors: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onShow(){
    wx.setStorageSync('selectedTab', 0)
    console.log('about page', wx.getStorageSync('selectedTab'))

    const info = await getInfo()
    const instructors = await getAllInstructors()
    const strings = await getStrings('about', this.data.keys)
    this.setData({info, instructors, strings})
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