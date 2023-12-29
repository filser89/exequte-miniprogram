// pages/customer-service/customer-service.js
import {getStrings} from "../../utils/requests/index"

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {}
  },

  async onShow(){
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({strings})
  },
  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },
  navigateBack(){
    wx.navigateBack({
      delta: 0
    })
  }
})