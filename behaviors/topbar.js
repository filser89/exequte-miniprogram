const app = getApp()

export default Behavior ({
  /**
   * Component properties
   */
  properties: {
    disableStudioChange: Boolean
  },

  /**
   * Component initial data
   */
  data: {
    lang: '',
    studio: ''
  },
lifetimes: {
  async attached(){
    const lang = app.globalData.headers['X-API-Lang']
    const studio = app.globalData.studio
   this.setData({lang, studio})
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
    },
    toggleStudio(){
      const studio = this.data.studio == 'reshape' ? 'glam' : 'reshape'
      this.setData({studio})
      app.globalData.studio = app.globalData.studio == 'reshape' ? 'glam' : 'reshape'
      this.triggerEvent('studiochanged', '')
    }

  }
})