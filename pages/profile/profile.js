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

  navigateToMyClasses(){
    console.log('clicked my')
    wx.navigateTo({
      url: `../../pages/my-classes/my-classes`
    })
  },
  navigateToInstructorClasses(){
    console.log('clicked instructor')
    wx.navigateTo({
      url: `../../pages/instructor-classes/instructor-classes`
    })
  },


  navigateToProfileUpdate(){
    wx.navigateTo({
      url: `../../pages/profile-update/profile-update`
    })
  },
  handleLanguageChanged(){
    this.onShow()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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