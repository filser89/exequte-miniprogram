import {getUsersBookings} from "../../utils/requests/index"
// pages/my-classes/my-classes.js
Page({

  /**
   * Page initial data
   */
  data: {
    bookings: [],
    selected: 0
  },

  /**
   * Lifecycle function--Called when page load
   */

  async onShow() {
    wx.setStorageSync('selectedTab', -1)
    console.log('non-tabbar page', wx.getStorageSync('selectedTab'))

    this.setData({bookings: await getUsersBookings()})
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