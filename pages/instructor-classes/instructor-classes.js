// pages/instructor-classes/instructor-classes.js
import {getInstructorSessions} from '../../utils/requests/index'

Page({

  /**
   * Page initial data
   */
  data: {
    sessions: [],
    selected: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onShow() {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))

    this.setData({sessions: await getInstructorSessions()})
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