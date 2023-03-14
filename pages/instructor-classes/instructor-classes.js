// pages/instructor-classes/instructor-classes.js
import {getInstructorSessions, getAdminSessions, getStrings} from '../../utils/requests/index'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    sessions: [],
    selected: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({options})
  },

  async onShow() {
    console.log(this.data.options)
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))
    let sessions
    if (this.data.options && this.data.options.admin){
      console.log('admin, get all sessions')
      sessions = await getAdminSessions()
      this.setData({
        isUserAdmin: true
      })
    } else {
      console.log('instructor, get instructor sessions')
      sessions = await getInstructorSessions()
      this.setData({
        isUserAdmin: false
      })
    }
    if (this.data.options && this.data.options.is_user_admin == "true"){
      console.log('>>is admin')
      console.log(this.data.options.is_user_admin)
      this.setData({
        isUserAdmin: true
      })
    }
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({sessions, strings})
    console.log("On load", this.data.sessions)
  },

  switchTab({currentTarget}){
    const {selected} = currentTarget.dataset
    this.setData({selected})
  },
  
  handleLanguageChanged(){
    this.onShow()
  }

})