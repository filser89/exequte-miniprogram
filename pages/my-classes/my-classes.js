import {getUsersBookings, getStrings} from "../../utils/requests/index"
// pages/my-classes/my-classes.js
Page({

  /**
   * Page initial data
   */
  data: {
    keys: ['cat'], //add the localization keys here
    strings: {},
    bookings: [],
    selected: 0
  },

  /**
   * Lifecycle function--Called when page load
   */

  async onShow() {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))

    const bookings = await getUsersBookings()
    const strings = await getStrings('my-classes', this.data.keys)
    this.setData({bookings, strings})
    // console.log("On load", this.data.bookings)
  },

  switchTab({currentTarget}){
    const {selected} = currentTarget.dataset
    Number.parseInt(selected, 10)
    // console.log('page1', this.data.selected)

    this.setData({selected: Number.parseInt(selected, 10)})
    // console.log('page', this.data.selected)
  },
  handleLanguageChanged(){
    this.onShow()
  }
})