// pages/profile/profile.js
import {getUserDetails, getStrings} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    user: {},
    showPrivacy: false,
    studio: "reshape",
    privilegeOpen: true
  },

  /**
   * Lifecycle function--Called when page load
   */

  async onShow(){
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', 2)
    console.log('profile page', wx.getStorageSync('selectedTab'))
    const currentUser = wx.getStorageSync('user')
    console.log('id', currentUser.id)
    const user = await getUserDetails(currentUser.id)
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({
      user,
      strings
    })
    wx.getPrivacySetting({
      success: res => {
        console.log(res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
        if (res.needAuthorization) {
          // 需要弹出隐私协议
          this.setData({
            showPrivacy: true
          })
        } else {
          // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
          // wx.getUserProfile()
          // wx.chooseMedia()
          // wx.getClipboardData()
          // wx.startRecord()
        }
      },
      fail: () => {},
      complete: () => {}
    })
  },

  closePrivacyPopup(){
    this.setData({
      showPrivacy: false
    })
  },

  handleAgreePrivacyAuthorization(res){ 
    console.log(res)
    this.setData({
      showPrivacy: false
    })
  },


  navigateToMyClasses(){
    console.log('clicked my')
    wx.navigateTo({
      url: `../../pages/my-classes/my-classes`
    })
  },
  navigateToInstructorClasses(){
    let isUserAdmin = false
    if (this.data && this.data.user && this.data.user.admin)
      isUserAdmin = true
    console.log("is_user_admin" + isUserAdmin)
    wx.navigateTo({
      url: `../../pages/instructor-classes/instructor-classes?is_user_admin=` + isUserAdmin
    })
  },
  navigateToAdminClasses(){
    wx.navigateTo({
      url: `../../pages/instructor-classes/instructor-classes?admin=true`
    })
  },

  navigateToProfileUpdate(){
    wx.navigateTo({
      url: `../../pages/profile-update/profile-update`
    })
  },

  navigateToCustomerService(){
    console.log('clicked cs')
    wx.navigateTo({
      url: `../../pages/customer-service/customer-service`
    })
  },

  navigateToWallet(){
    wx.switchTab({url:'/pages/wallet/wallet'})
  },

  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    console.log("studio got changed")
    wx.reLaunch({
      url: '/pages/profile/profile',
    })
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

  },

  togglePrivilege: function () {
    this.setData({
      privilegeOpen: !this.data.privilegeOpen
    });
  },

})