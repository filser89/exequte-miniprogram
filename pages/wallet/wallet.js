// pages/wallet/wallet.js
import {getSetting, getUserDetails, getStrings, getMembershipTypes } from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    user: {},
    studio: "",
    info: {},
    selected: '',
    selectedMembershipTypeId: '',
    selectedMembershipTypeLoad: '',
    selectedMembershipTypePrice: 0,
    selecteMembershipDiscountMultiplier: 1,
    btnPattern: { price: 0, text: "Pay" },
    membershipDate: '',
    membership: {},
    classpack: {},
    privilegeOpen: true,
    discount: 0,
    couponCode: null,
    couponBtnDisabled: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({options})
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
    if (this.data.options && this.data.options.selectedMembershipTypeId){
      console.log("updating membership selected");
      this.setData({
        selectedMembershipTypeLoad: this.data.options.selectedMembershipTypeId
      })
    }
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
    wx.setStorageSync('selectedTab', 1)
    console.log('wallet page', wx.getStorageSync('selectedTab'))
    const currentUser = wx.getStorageSync('user')
    console.log('id', currentUser.id)
    const user = await getUserDetails(currentUser.id)
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({
      user,
      strings
    })
    try {
    let info = JSON.parse(await getSetting('signup_text'));
    const lang = getApp().globalData.headers['X-API-Lang'];
    info = info[lang];
    this.setData({info})
    } catch (e){console.log(e)}

    let membershipTypesUnsorted = await getMembershipTypes()
    
    let membershipTypes = membershipTypesUnsorted;
    try {
      membershipTypes = membershipTypesUnsorted.sort((a, b) => JSON.parse(a.settings).order - JSON.parse(b.settings).order).map(membershipType => {
        return {
            ...membershipType,
            settings: JSON.parse(membershipType.settings)
        };
    });
      
    } catch(e){
      console.log("something went wrong sorting memberships")
    }
    this.setData({
      membershipTypes
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
      url: '/pages/wallet/wallet',
    })
  },

  handleLanguageChanged(){
    this.onShow()
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
  handleStudioChanged(){
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
      case 'buy-membership':
        console.log("buying membership btn_pattern");
        console.log("Price:" + this.data.selectedMembershipTypePrice);
        try {
        price = this.data.selectedMembershipTypePrice * (1- (this.data.discount * this.data.selecteMembershipDiscountMultiplier))
        } catch(e){
          price = this.data.selectedMembershipTypePrice
        }
        this.setData({
          btnPattern: {
            price,
            action: 'buyMembership',
            text: this.properties.strings && this.properties.strings.pay  || `Pay`,
            params: {
              start_date: this.todayDateString(),
              price_cents: price * 100,
              coupon: this.data.couponCode,
            }
          }
        })
        break;
    }
    console.log('btnPattern', this.data.btnPattern)
  },

  todayDateString() {
    let date = new Date
    console.log('before date function')
    date = date.toJSON().replace(/T.*/, "T00:00:00.000Z")
    return date
  },

  togglePrivilege: function () {
    this.setData({
      privilegeOpen: !this.data.privilegeOpen
    });
  },

  handleCouponUsed({detail}){
    console.log("handleCouponUsed", detail)
    const {discount, couponCode} = detail
    this.setData({couponCode, discount, couponBtnDisabled: true})
    this.setBtnPattern(this.data.selected)
  },
})