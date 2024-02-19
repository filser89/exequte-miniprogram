// pages/class-attandence/class-attandence.js
import {getSessionAttendance, getStrings, uploadSessionPhoto} from '../../utils/requests/index'
import { updateBarColors } from '../../utils/util'
import {
  promisifyAll,
} from 'miniprogram-api-promise';

const wxp = {}
promisifyAll(wx, wxp)

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    session: {},
    options: {},
    studio: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
onLoad(options) {
    this.setData({options})

  },
  async onShow(){
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)

    const session = await getSessionAttendance(this.data.options.id)
    const strings = await getStrings(this.route.split('/')[2])

    let isUserAdmin = false
    if (this.data && this.data.options && this.data.options.is_user_admin == "true"){
      isUserAdmin = true 
    }
    this.setData({session, strings, isUserAdmin})
  },

  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },
  async uploadImage(e) {
    console.log("upload image")
    const res = await wxp.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      courceType: ['album', 'camera']
    })
    const filePath = res.tempFilePaths[0]
    console.log("url", filePath)
    wx.showLoading({
      title: 'Uploading...',
    })
    let that = this
    uploadSessionPhoto(this.data.options.id, filePath).then((res) => {
      console.log('response', res)
      getSessionAttendance(that.data.options.id).then((res) =>{
        let session = res
        that.setData({session})
        wx.hideLoading();
      }) 
    })
  },
  preview_img: function ({target}) {
    wx.previewImage({
      current: target.dataset.url,
      urls: [target.dataset.url]
    })
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }

  
})