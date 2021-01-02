// components/getInfoButton/getInfoButton.js
// import {
//   promisifyAll
// } from 'miniprogram-api-promise';

// import {saveUserAvatar} from '../../utils/requests/index'
// const wxp = {}
// promisifyAll(wx, wxp)

import GetInfoButtonBehavior from "../../behaviors/get-info-button"
Component({
  behaviors: [GetInfoButtonBehavior]
  /**
   * Component properties
   */
  // properties: {
  //   itemId: Number
  // },

  // /**
  //  * Component initial data
  //  */
  // data: {

  // },

  // /**
  //  * Component methods
  //  */
  // methods: {

  //   async bindGetUserInfo (e) {
  //     // console.log('GetUserInfo', e)
  //     console.log(e.detail.userInfo)
  //     const data = await wxp.getUserInfo({
  //       lang: "en"
  //     })
  //     console.log('GetUserInfo', data.userInfo)
  //     const user = wx.getStorageSync('user')
  //     const avatarUrl = data.userInfo.avatarUrl
  //     saveUserAvatar(user.id, {avatarUrl})
      
  //   },

  //   navigateToProfileUpdate(){
  //     wx.navigateTo({
  //       url: `../../pages/profile-update/profile-update?sessionId=${this.data.itemId}`
  //     })
  //   }
  // }
})
