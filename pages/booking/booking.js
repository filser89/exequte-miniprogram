// pages/booking/booking.js
import {
  getSession,
  // getMembershipTypes,
  getMembershipTypesBySession,
  getStrings,
  getSetting
} from '../../utils/requests/index.js'
import { updateBarColors } from '../../utils/util'

import {
  promisifyAll,
} from 'miniprogram-api-promise';

const wxp = {}
promisifyAll(wx, wxp)

const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    custom_strings: {},
    session: {},
    selected: '',
    selectedMembershipTypeId: '',
    selectedMembershipTypePrice: 0,
    btnPattern: {},
    membershipDate: '',
    membership: {},
    classpack: {},
    discount: 0,
    couponCode: null,
    couponBtnDisabled: false,
    studio: "reshape",
    studioParameter: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    console.log(options)
    this.setData({options})
  },
  async onShow(){
    const studioParameter = this.data.options.studioParameter
    console.log(studioParameter)
    if (studioParameter && studioParameter !== getApp().globalData.studio){
      console.log('updating studio')
      getApp().globalData.studio = studioParameter;
    }
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    
    const sessionId = this.data.options.sessionId
    const session = await getSession(sessionId)
    //const membershipTypes = await getMembershipTypes()
    const membershipTypes = await getMembershipTypesBySession(sessionId)
    const selected = "empty" //this.setSelected(session.access_options_credits)
    console.log("Initial selected", selected)
    const membershipDate = session.membership_date
    const membership = session.usable_membership
    const classpack = session.usable_classpack
    const strings = await getStrings(this.route.split('/')[2])
    let custom_strings = {}
    try {
      custom_strings = JSON.parse(await getSetting('strings'));
      const lang = getApp().globalData.headers['X-API-Lang'];
      custom_strings = custom_strings[lang];
      } catch (e){console.log(e); }
    this.setData({custom_strings})

    this.setData({
      session,
      selected,
      membershipDate,
      membershipTypes,
      membership,
      classpack,
      strings
    })
    this.setBtnPattern(this.data.selected)
    //this.setBtnPattern(this.data.btnPattern)
  },

 //event handlers
  handleCouponUsed({detail}){
    console.log("handleCouponUsed", detail)
    const {discount, couponCode} = detail
    this.setData({couponCode, discount, couponBtnDisabled: true})
    this.setBtnPattern(this.data.selected)
  },

  handleOptionChange({
    detail
  }) {
    this.setData(detail)
    console.log("detail", detail)
    this.setBtnPattern(detail.selected)
  },

  handleDateChange({
    detail
  }) {
    console.log("handleDateChange", detail)
    const membershipDate = JSON.stringify(new Date(detail.membershipDateString))
    console.log("handleDateChange", membershipDate)
    this.setData({
      membershipDate,
    })
    this.setBtnPattern(this.data.selected)
    console.log("handleDateChange", this.data.membershipDate)
  },

  async handleMembershipBought(){
    // wx.redirectTo({
    //   url: `booking?sessionId=${this.data.session.id}`
    // })
    this.onShow()
  },
  async handleMembershipBoughtFailed(){
    // wx.redirectTo({
    //   url: `booking?sessionId=${this.data.session.id}`
    // })
    this.onShow()
  },

  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },

  // data setters
  setSelected(accessOptions) {
    console.log(accessOptions)
    if (accessOptions){
    return accessOptions.hasOwnProperty('drop_in') ? 'drop-in' : 'free'
    } else {
      return 'drop-in';
    }
  },

  setBtnPattern(accessOption) {
    let price
    console.log("setBtnPattern", accessOption)
    switch (accessOption) {
      case 'free':
        console.log('in free')
        this.setData({
          btnPattern: {
            action: 'bookClass',
            text: this.properties.strings && this.properties.strings.join_for_free || 'JOIN FOR FREE',
            params: {
              booked_with: 'free'
            }
          }
        })
        break
      case 'drop-in':
        console.log('in drop-in')
        price = this.data.session.price * (1- this.data.discount)
        console.log(price)
        this.setData({
          btnPattern: {
            price,
            action: 'bookClass',
            text: this.properties.strings && this.properties.strings.pay || `Pay`,
            params: {
              booked_with: 'drop-in',
              price_cents: price * 100,
              coupon: this.data.couponCode,
            }
          }
        })
        break
      case 'buy-membership':
        price = this.data.selectedMembershipTypePrice * (1 - this.data.discount)
        this.setData({
          btnPattern: {
            price,
            action: 'buyMembership',
            text: this.properties.strings && this.properties.strings.pay  || `Pay`,
            params: {
              start_date: this.data.membershipDate,
              price_cents: price * 100,
              coupon: this.data.couponCode,
            }
          }
        })
        break;
      case 'voucher':
        console.log("setBtnPattern", 2)
        this.setData({
          btnPattern: {
            action: 'bookClass',
            text: this.properties.strings && this.properties.strings.use_voucher  || 'Use Voucher',
            params: {
              booked_with: 'voucher'
            }
          }
        })
        break
      case 'membership':
        this.setData({
          btnPattern: {
            action: 'bookClass',
            text: this.properties.strings && this.properties.strings.book_class  || 'Book Class',
            params: {
              booked_with: 'membership',
              membership_id: this.data.session.usable_membership.id
            }
          }
        })
        break;
      case 'classpack':
        this.setData({
          btnPattern: {
            action: 'bookClass',
            text: this.properties.strings && this.properties.strings.book_class  || 'Book Class',
            params: {
              booked_with: 'class-pack',
              membership_id: this.data.session.usable_classpack.id
            }
          }
        })
        break;
        case 'credits':
          this.setData({
            btnPattern: {
              action: 'bookClass',
              text: this.properties.strings && this.properties.strings.book_class  || 'Book Class',
              params: {
                booked_with: 'credits',
                membership_id: ''
               }
            }
          })
          break;
          case 'buy-credits':
            this.setData({
              btnPattern: {
                action: 'topUp',
                text: this.properties.strings && this.properties.strings.top_up  || 'TOP UP'
              }
            })
          break;
          case 'empty':
            this.setData({
              btnPattern: {
                disabled: true,
                text: this.properties.strings && this.properties.strings.chooseabove  || 'CLICK ONE OF THE OPTIONS'
              }
            })
          break;      
          case 'upgrade-credits':
            this.setData({
              btnPattern: {
                action: 'upgradeCredit',
                text: this.properties.strings && this.properties.strings.upgrade_credit  || 'UPGRADE',
                params: {
                  membership_id: (this.data.session.access_options_credits && this.data.session.access_options_credits.upgrade_membership) ? this.data.session.access_options_credits.upgrade_membership.id : ''
                }
              }
            })
          break;   
    }
    console.log('btnPattern', this.data.btnPattern)
  },

/**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }


})