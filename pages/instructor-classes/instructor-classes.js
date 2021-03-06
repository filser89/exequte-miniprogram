// pages/instructor-classes/instructor-classes.js
import {getInstructorSessions, getStrings} from '../../utils/requests/index'

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
  async onShow() {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))
    const sessions = await getInstructorSessions()
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