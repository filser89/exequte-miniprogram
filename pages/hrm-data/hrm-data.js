// pages/hrm-data/hrm-data.js
import {getStrings,getSession,getBooking,getHrmDataForBooking, getHrmGraphForBooking, getHrmDataGraphForBooking} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    booking: {},
    hrmId: {},
    hrmData: {},
    hrmCombinedGraph: {},
    studio: "reshape",
    ranking: [
      {
        "name":"Jay",
        "rank":"1",
        "avatarUrl":"https://exequte.oss-cn-shanghai.aliyuncs.com/jay.jpeg",
        "calories":"1000"
      },
      {
        "name":"Eliana",
        "rank":"2",
        "avatarUrl":"https://exequte.oss-cn-shanghai.aliyuncs.com/eliana.jpeg",
        "calories":"800"
      },
      {
        "name":"Alberto",
        "rank":"3",
        "avatarUrl":"https://exequte.oss-cn-shanghai.aliyuncs.com/albi-half.jpeg",
        "calories":"700"
      },
      {
        "name":"Oran",
        "rank":"4",
        "avatarUrl":"https://exequte.oss-cn-shanghai.aliyuncs.com/oran.jpeg",
        "calories":"600"
      },
      {
        "name":"Aldo",
        "rank":"5",
        "avatarUrl":"https://exequte.oss-cn-shanghai.aliyuncs.com/xq-avatar.png",
        "calories":"500"
      },
      {
        "name":"Massimo",
        "rank":"6",
        "avatarUrl":"https://exequte.oss-cn-shanghai.aliyuncs.com/xq-avatar.png",
        "calories":"400"
      }
    ]
  },

  
  onLoad(options){
    this.setData({options})
   },

  async onShow() {
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)

    const options = this.data.options
    console.log(options)
    const bookingId = this.data.options.bookingId
    const hrmId = this.data.options.hrmId
    const booking = await getBooking(bookingId)
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({
      booking,
      strings,
      hrmId
    }) 
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
  },

  async refreshHrmData(){
    wx.showLoading({
      title: this.properties.strings && this.properties.strings.loading_graph 
      || "Please hold on...",
    })
    const hrmData = await getHrmDataGraphForBooking(this.data.options.bookingId, false);
    // const hrmData =  await getHrmDataForBooking(this.data.options.bookingId);
    console.log(hrmData);
    this.setData({
       hrmData: hrmData.hrm_data
     })
    this.setData({
      hrmCombinedGraph: hrmData.hrm_combined_graph
    })
    
    wx.hideLoading();
    if (hrmData.error) {
      wx.showToast({
        title: this.properties.strings && this.properties.strings.hrm_empty 
        || "No record yet...",        
        icon: 'none'
      })
    }
    
  },

  async refreshHrmDataForce(){
    wx.showLoading({
      title: this.properties.strings && this.properties.strings.loading_graph 
      || "Please hold on...",
    })
    const hrmData = await getHrmDataGraphForBooking(this.data.options.bookingId, true);
    console.log(hrmData);
    this.setData({
       hrmData: hrmData.hrm_data
     })
    this.setData({
      hrmCombinedGraph: hrmData.hrm_combined_graph
    })
    wx.hideLoading();
  },
  loadCalories(){
    
  },

  preview_img: function () {
    wx.previewImage({
      current: this.data.hrmCombinedGraph.imageUrl,
      urls: [this.data.hrmCombinedGraph.imageUrl]
    })
  },


})