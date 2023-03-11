// pages/booking/booking.js
import {
  getSession,
  getMembershipTypes,
  getStrings
} from '../../utils/requests/index.js'
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
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
    couponBtnDisabled: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    console.log(options)
    this.setData({options})
  },
  async onShow(){
    const sessionId = this.data.options.sessionId
    const session = await getSession(sessionId)
    const membershipTypes = await getMembershipTypes()
    const selected = this.setSelected(session.access_options)
    console.log("Initial selected", selected)
    const membershipDate = session.membership_date
    const membership = session.usable_membership
    const classpack = session.usable_classpack
    const strings = await getStrings(this.route.split('/')[2])

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

  handleMembershipBought(){
    // wx.redirectTo({
    //   url: `booking?sessionId=${this.data.session.id}`
    // })
    this.onShow()
  },

  handleLanguageChanged(){
    this.onShow()
  },

  // data setters
  setSelected(accessOptions) {
    console.log(accessOptions)
    return accessOptions.hasOwnProperty('drop_in') ? 'drop-in' : 'free'
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