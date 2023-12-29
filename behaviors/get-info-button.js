import {
  promisifyAll
} from 'miniprogram-api-promise';

import {processUserInfo} from '../utils/requests/index'
const wxp = {}
const app = getApp()
promisifyAll(wx, wxp)

export default Behavior ({
  properties: {
    itemId: Number,
    profileFilled: Boolean,
    studio: String
  },
  data: {
    studio: 'reshape'
  },
  lifetimes: {
    async attached(){
      const studio = app.globalData.studio
      console.log("studio:" + studio)
     this.setData({studio})
    }
  },
  /**
   * Component methods
   */
  methods: {

    async bindGetUserInfo (e) {
      console.log('GetUserInfo', e)
      const page = this
      console.log(e.detail.userInfo)
      wxp.getUserInfo({
        lang: "en",
        withCredentials: true,
        async success(res){
          console.log(res)
          let user = wx.getStorageSync('user')
          if (!user.has_wx_info) page.saveWxInfo(user.id, res)
          
          if (page.data.profileFilled) {
            page.navigateToBooking()
          } else {
            page.navigateToProfileUpdate()
          }
        },
        fail(err){
          console.log(err)
          //page.navigateToProfileUpdate()
        }
      })
    },

    navigateToProfileUpdate(){
      console.log('WE ARE NAVIGATING TO PROFILE')
      let sessionQuery = this.data.itemId ? `?sessionId=${this.data.itemId}` : ''
      wx.navigateTo({
        url: `../../pages/profile-update/profile-update${sessionQuery}`
      })
    },
    navigateToBooking(){
      console.log('WE ARE NAVIGATING TO BOOKING')
      wx.navigateTo({
        url: `../../pages/booking/booking?sessionId=${this.data.itemId}`,
      })
    },
    async saveWxInfo(id, data){
      console.log("UserID", id)
          let updatedUser = await processUserInfo(id, data)
          console.log("After info processed", updatedUser)
          wx.setStorageSync('user', updatedUser)
    },
    doNothing(){
      console.log("Doing nothing")
    }
  }
})