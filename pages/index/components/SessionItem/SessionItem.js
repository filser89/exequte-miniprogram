// pages/index/components/SessionItem/SessionItem.js
import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise';

const app = getApp()
const wxp = {}
promisifyAll(wx, wxp)

Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    session: Object,
    studio: String,
    size: String
  },

  /**
   * Component initial data
   */
  data: {
    user: {}
  },
  lifetimes: {
    attached() {
    this.setUser()
    },
  },

  pageLifetimes: {
    show() {
    this.setUser()
    console.log(this.data.size)
  }
  },
  /**
   * Component methods
   */
  methods: {
    async navigateToClassInfo(e) {
      const {
        sessionId,
        instructorId
      } = e.currentTarget.dataset
      if (this.properties && this.properties.studio === "glam"){
        if (this.data && this.data.user && this.data.user.gender){
          if (this.data.user.gender === "Female"){
            wx.navigateTo({
              url: `../class-info/class-info?sessionId=${sessionId}&instructorId=${instructorId}`,
            })
          } else {
            console.log("women only, dont click");
            wx.showToast({
              title: this.properties.strings && this.properties.strings.womennoclick 
              || "This is a women-only session",
              icon: 'none',
              duration: 3000,
            })
            return false;
          }
        } else {  
          let res = await wxp.showModal({
            title: this.properties.strings && this.properties.strings.genderupdate 
            || "Please update your gender in profile before booking.",
            cancelText: this.properties.strings && this.properties.strings.maybelater
            || "Later",
            confirmText: this.properties.strings && this.properties.strings.updatenow
            || "Update",
          })
          if (res.confirm) {
            wx.navigateTo({
              url: `/pages/profile-update/profile-update`
            })
          } else {
            return false;
          }
        }
      } else {
        wx.navigateTo({
          url: `../class-info/class-info?sessionId=${sessionId}&instructorId=${instructorId}`,
        })
      }
    },
    handleQueuedUp({
      detail
    }) {
      const session = detail
      this.setData({
        session
      })
      console.log(this.data.session)
    },
    setUser(){
      const user = wx.getStorageSync('user')
      this.setData({
        user
      })
    }
  }
})