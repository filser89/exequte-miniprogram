// components/Topbar/Topbar.js
const app = getApp()
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    lang: ''
  },
lifetimes: {
  attached(){
    const lang = wx.getStorageSync('lang')
   this.setData({lang})
  }
},
  /**
   * Component methods
   */
  methods: {
    toggleLang(){
      const lang = this.data.lang == 'en' ? 'zh-CN' : 'en'
      this.setData({lang})
      app.globalData.headers['X-API-Lang'] = app.globalData.headers['X-API-Lang'] == 'en' ? 'zh-CN' : 'en'
      this.triggerEvent('languagechanged', '')
    }
  }
})
