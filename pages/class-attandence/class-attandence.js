// pages/class-attandence/class-attandence.js
import {getSessionAttendance, getStrings} from '../../utils/requests/index'
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
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
    const strings = await getStrings('class-attandence', this.data.keys)

    this.setData({session, strings})
  },

  handleLanguageChanged(){
    this.onShow()
  }
  
})