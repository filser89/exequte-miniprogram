// pages/home/home.js
import {getSetting, getUserDetails, getStrings, getBanner, getUsersBookingsWithHrm, getUsersBookings} from "../../utils/requests/index"

import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    custom_strings: {},
    banner: [],
    user: {},
    studio: "",
    info: {},
    lang: "en",
    date: "",
    bookings: [],
    last_bookings: [],
    studiosOpen: false,
    scienceOpen: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  async onShow(){
    wx.showLoading({
      title: 'Just a sec..',
    })
    // this.setData({lang: getApp().globalData.headers['X-API-Lang']})
    this.setData({date: this.todayDateString()})
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', 0)
    console.log('home page', wx.getStorageSync('selectedTab'))
    const currentUser = wx.getStorageSync('user')
    console.log('id', currentUser.id)
    const user = await getUserDetails(currentUser.id)
    let hrm_bookings = await getUsersBookingsWithHrm();
    let bookings = await getUsersBookings();
    const strings = await getStrings(this.route.split('/')[2])
    const banner = await getBanner()
    let custom_strings = {}
    try {
      custom_strings = JSON.parse(await getSetting('strings'));
      const lang = getApp().globalData.headers['X-API-Lang'];
      custom_strings = custom_strings[lang];
      } catch (e){console.log(e); }
    this.setData({custom_strings})
    Promise.all([strings, user, banner, bookings]).then((values) => {
      console.log('values', values)
      try {
        let currentStudio = getApp().globalData.studio
        if (!currentStudio || currentStudio  == ""){
          console.log("current studio null, setting it to reshape");
          currentStudio = "reshape";
        }
        if (bookings && bookings[1]){
          bookings = bookings[1];
        } else {
          bookings = hrm_bookings;
        }
        let last_bookings = hrm_bookings
        if (bookings){
          hrm_bookings = hrm_bookings.filter(booking => booking.session.location === currentStudio || booking.session.location === "" );
          last_bookings = bookings.filter(booking => booking.session.location === currentStudio || booking.session.location === "" );
        }
        this.setData({strings, user, banner, hrm_bookings, bookings})
        if (last_bookings && last_bookings.length > 5){
          last_bookings = last_bookings.slice(0,5);
        }
        
        this.setData({last_bookings})
        wx.hideLoading()
      } catch(e){console.log(e);}
    })
  },


  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  handleStudioChanged(){
    console.log("studio got changed")
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  handleLanguageChanged(){
    this.onShow()
    this.setData({lang: app.globalData.headers['X-API-Lang']})
    console.log(this.data.lang)
  },

  todayDateString() {
    let date = "";
    try {
    date = new Date(Date.now() + (8 * 60 * 60 * 1000));
    console.log('before date function')
    console.log(date);
    console.log(date.toJSON());
    date = date.toJSON().replace(/T.*/, "T00:00:00.000+08:00")
    console.log(date);
    } catch (e){
      date = new Date();
      date = date.toJSON().replace(/T.*/, "T00:00:00.000+08:00")
    }
    return date
  },


  navigateToReshape(){
    console.log('clicked reshape')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=7`
    })
  },
  
  navigateToGlam(){
    console.log('clicked glam')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=8`
    })
  },

  navigateToPt(){
    console.log('clicked pt')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=11`
    })
  },

  navigateToFacilities(){
    console.log('clicked facilities')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=15`
    })
  },
  
  navigateToWS(){
    console.log('clicked workout science')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=9`
    })
  },

  navigateToHS(){
    console.log('clicked hrms science')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=10`
    })
  },

  navigateToFoot(){
    console.log('clicked foot science')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=14`
    })
  },

  navigateToCredits(){
    console.log('clicked credits')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=13`
    })
  },
  
  navigateToTerms(){
    console.log('clicked terms')
    wx.navigateTo({
      url: `/pages/terms-and-conditions/terms-and-conditions`
    })
  },

  navigateToDirections(){
    console.log('clicked directions')
    wx.navigateTo({
      url: `/pages/studios-info/studios-info?id=12`
    })
  },

  toggleStudios: function () {
    this.setData({
      studiosOpen: !this.data.studiosOpen
    });
  },
  toggleScience: function () {
    this.setData({
      scienceOpen: !this.data.scienceOpen
    });
  },
})