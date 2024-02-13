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
    last_bookings: []
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
          hrm_bookings = hrm_bookings.filter(booking => booking.session.location === currentStudio);
          last_bookings = bookings.filter(booking => booking.session.location === currentStudio);
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
    let date = new Date
    console.log('before date function')
    date = date.toJSON().replace(/T.*/, "T00:00:00.000+08:00")
    return date
  },


  navigateToStudios(){
    console.log('clicked studios')
    wx.navigateTo({
      url: `/pages/terms-and-conditions/terms-and-conditions`
    })
  },
  navigateToTerms(){
    console.log('clicked terms')
    wx.navigateTo({
      url: `/pages/terms-and-conditions/terms-and-conditions`
    })
  },
})