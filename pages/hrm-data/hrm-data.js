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
    ranking: [],
    my_ranking: "",
    studio: "reshape"
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
    this.setData({
      ranking: hrmData.ranking
    })
    this.setData({
      my_ranking: hrmData.my_ranking
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
    this.setData({
      ranking: hrmData.ranking
    })
    this.setData({
      my_ranking: hrmData.my_ranking
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