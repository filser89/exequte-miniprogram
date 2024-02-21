// pages/customer-service/customer-service.js
import {getStrings} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    studio: "reshape"
  },

  async onShow(){
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({strings})
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
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