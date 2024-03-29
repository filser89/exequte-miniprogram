// pages/about/about.js
import {getInfo, getAllInstructors, getStrings} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    info: {},
    instructors: [],
    studio: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onShow(){
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', 0)
    console.log('about page', wx.getStorageSync('selectedTab'))

    const info = await getInfo('regular')
    const instructors = await getAllInstructors()
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({info, instructors, strings})
  },
  
  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },
  navigateToTnC(){
    wx.navigateTo({
      url: '../../pages/terms-and-conditions/terms-and-conditions'
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