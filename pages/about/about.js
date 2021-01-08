// pages/about/about.js
import {getInfo, getAllInstructors} from "../../utils/requests/index"
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  async onShow(){
    wx.setStorageSync('selectedTab', 0)
    console.log('about page', wx.getStorageSync('selectedTab'))

    const info = await getInfo()
    const instructors = await getAllInstructors()
    this.setData({info, instructors})
  },
  
  handleLanguageChanged(){
    this.onShow()
  }

})