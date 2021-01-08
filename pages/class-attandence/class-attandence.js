// pages/class-attandence/class-attandence.js
import {getSessionAttendance} from '../../utils/requests/index'
Page({

  /**
   * Page initial data
   */
  data: {
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
    this.setData({session: await getSessionAttendance(this.data.options.id)})
  },

  handleLanguageChanged(){
    this.onShow()
  }
  
})