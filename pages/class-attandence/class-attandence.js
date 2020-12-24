// pages/class-attandence/class-attandence.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  requestPermission(){
    console.log('clicked')
    wx.requestSubscribeMessage({
      tmplIds: ['gZIWdqNb3uRE1wof2s5XBiI_m0D453T2_QpcoDDlVqI'],
      success(res) {
        console.log(res);
      },
      fail(e){
        console.log(e)
      }
      
    })
  }
  
})