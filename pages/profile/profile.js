// pages/profile/profile.js
import {getUserDetails, getStrings} from "../../utils/requests/index"
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
    strings: {},
    user: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onShow(){
    wx.setStorageSync('selectedTab', 2)
    console.log('profile page', wx.getStorageSync('selectedTab'))
    const currentUser = wx.getStorageSync('user')
    console.log('id', currentUser.id)
    const user = await getUserDetails(currentUser.id)
    const strings = await getStrings('profile', this.data.keys)
    this.setData({
      user,
      strings
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