//app.js
import { promisifyAll } from 'miniprogram-api-promise';

const wxp = {}
App({
  globalData: {
    ApiKey: 'ExeQuteapikey',

    BASE_URL: 'https://exequte.cn/api/v1',
    //  BASE_URL: 'http://localhost:3000/api/v1',
    // BASE_URL: 'http://exequte.5gzvip.idcfengye.com/api/v1',
    headers: {
      'API-Key': 'ExeQuteapikey'
    }
  },
  onLaunch: function () {

    promisifyAll(wx, wxp)
    // const BASE_URL = 'https://exequte.cn/api/v1'

     const BASE_URL = 'http://localhost:3000/api/v1'
    const HEADERS = {
      'API-Key': 'ExeQuteapikey'
    }
    let user = wx.getStorageSync('user')
    let token = wx.getStorageSync('auth_token')
    let data = {user, token}
    // let data = wx.getStorageSync('current_user')
    // let x = wx.getStorageSync('current_xuser')
    if (data && token.expires > Date.now() ) {
      console.log(data)
      console.log('get user from storage, no need login')
      this.globalData.user = data.user,
      this.globalData.headers['X-Auth-Token'] = data.token.auth_token
    } else {
      console.log('logging in')
      this.login()
    }
    this.getPhoneLanguage()
  },
  login: function() {
    let page = this;
    let headers = page.globalData.headers
    wx.login({
      success: res => {
        console.log("WX_LOGIN SUCCESS",res)
        // console.log(`${page.globalData.BASE_URL}/users/wx_login`)
        wx.request({
          url: `${page.globalData.BASE_URL}/users/wx_login`,
          method: 'post',
          header: headers,
          data: {code: res.code},
          success: user => {
            console.log(user.data)
            wx.setStorageSync('user', user.data.data.user)
            wx.setStorageSync('auth_token', user.data.data.auth_token)
            page.setToken(user.data.data)
          }
        })
      }
    })
  },
  setToken: function (data) {
    console.log(data)
    this.globalData.current_user = data.user,
    this.globalData.headers['X-Auth-Token'] = data.auth_token.auth_token
    let url = './pages/index/index'
    let pages  = getCurrentPages()
    if (pages){
      let p = pages[pages.length -1]
      url = "/" + p.route
      if (Object.keys(p.options).length !== 0) {
        url += "?"
        Object.entries(p.options).forEach((e) => url += `${e[0]}=${e[1]}&`)
        url = url.slice(0, -1)
      }
    }
    console.log("Redirect URL", url)
    wx.reLaunch({
      url
    })
  },
  // get the user's phone language
async getPhoneLanguage() {
  const { language } = await wxp.getSystemInfo()
  console.log('lang:', language)
  this.globalData.headers['X-API-Lang'] = language
}

})