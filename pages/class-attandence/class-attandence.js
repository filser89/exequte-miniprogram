// pages/class-attandence/class-attandence.js
import {getSessionAttendance} from '../../utils/requests/index'
Page({

  /**
   * Page initial data
   */
  data: {
    session: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    console.log(options)
    const session = await getSessionAttendance(options.id)
    this.setData({session})
  },

  
})