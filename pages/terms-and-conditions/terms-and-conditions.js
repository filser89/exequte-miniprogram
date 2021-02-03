// pages/terms-and-conditions/terms-and-conditions.js
import {getInfo, getStrings} from "../../utils/requests/index"

Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
    strings: {},
    terms: {}
  },

  async onShow(){
    const terms = await getInfo('terms')
    const strings = await getStrings('about', this.data.keys)
    this.setData({terms, strings})
  },
  handleLanguageChanged(){
    this.onShow()
  },
  navigateBack(){
    wx.navigateBack({
      delta: 0
    })
  }
})