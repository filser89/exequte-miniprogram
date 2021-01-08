// pages/profile/profile.js
import {getUserDetails} from "../../utils/requests/index"
Page({

  /**
   * Page initial data
   */
  data: {
    user: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onShow(){
    wx.setStorageSync('selectedTab', 2)
    console.log('profile page', wx.getStorageSync('selectedTab'))
    const user = wx.getStorageSync('user')
    console.log('id', user.id)
    this.setData({
      user: await getUserDetails(user.id)
    })
  },

  navigateToClasses(){
    console.log('clicked')
    let direction = this.data.user.instructor ? 'instructor' : 'my'
    wx.navigateTo({
      url: `../../pages/${direction}-classes/${direction}-classes`
    })
  },
  navigateToProfileUpdate(){
    wx.navigateTo({
      url: `../../pages/profile-update/profile-update`
    })
  },
  handleLanguageChanged(){
    this.onShow()
  }
})