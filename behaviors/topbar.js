const app = getApp()

export default Behavior ({
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
  async attached(){
    const lang = app.globalData.headers['X-API-Lang']
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