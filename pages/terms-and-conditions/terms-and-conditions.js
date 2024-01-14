// pages/terms-and-conditions/terms-and-conditions.js
import {getInfo, getStrings} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    terms: {},
    studio: {}
  },

  async onShow(){
    const terms = await getInfo('terms')
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({terms, strings})
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