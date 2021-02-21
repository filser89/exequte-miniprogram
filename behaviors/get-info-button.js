import {
  promisifyAll
} from 'miniprogram-api-promise';

import {processUserInfo} from '../utils/requests/index'
const wxp = {}
promisifyAll(wx, wxp)

export default Behavior ({
  properties: {
    itemId: Number
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {

    async bindGetUserInfo (e) {
      // console.log('GetUserInfo', e)
      console.log(e.detail.userInfo)
      const data = await wxp.getUserInfo({
        lang: "en",
        withCredentials: true
      })
      console.log('GetUserInfo', data)
      const user = wx.getStorageSync('user')
      processUserInfo(user.id, data)
      
    },

    navigateToProfileUpdate(){
      wx.navigateTo({
        url: `../../pages/profile-update/profile-update?sessionId=${this.data.itemId}`
      })
    }
  }
})