// splash.js
Page({
    /**
   * Page initial data
   */
  data: {
  },

  /**
   * Lifecycle function--Called when page load
   */

  async onShow() {
    console.log('splash page')
  },
  handleReshape() {
    // Logic for handling the Reshape button click
    getApp().globalData.studio = 'reshape';
    console.log('Reshape button clicked');
    getApp().globalData.splashSeen = true
    wx.switchTab({url:'../index/index'})
  },
  handlePt() {
    // Logic for handling the Reshape button click
    //@todo , show PT slots
    getApp().globalData.studio = 'reshape';
    console.log('pt button clicked');
    getApp().globalData.splashSeen = true
    wx.switchTab({url:'../index/index'})
  },
  handleGlam() {
    // Logic for handling the Glam button click
    getApp().globalData.studio = 'glam';
    console.log('Glam button clicked');
    getApp().globalData.splashSeen = true
    wx.switchTab({url:'../index/index'})
  },
});