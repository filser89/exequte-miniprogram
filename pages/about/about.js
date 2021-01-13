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
  }

})