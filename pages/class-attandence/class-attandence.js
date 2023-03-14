// pages/class-attandence/class-attandence.js
import {getSessionAttendance, getStrings} from '../../utils/requests/index'
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    session: {},
    options: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
onLoad(options) {
    this.setData({options})

  },
  async onShow(){
    const session = await getSessionAttendance(this.data.options.id)
    const strings = await getStrings(this.route.split('/')[2])

    let isUserAdmin = false
    if (this.data && this.data.options && this.data.options.is_user_admin == "true"){
      isUserAdmin = true 
    }
    this.setData({session, strings, isUserAdmin})
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