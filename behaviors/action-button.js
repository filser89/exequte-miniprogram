import {
  createBooking,
  buyMembership,
  addUserToQueue,
  cancelBooking,
  deleteFailedPayment,
  updateUser
} from '../utils/requests/index'

const app = getApp()

import {
  promisifyAll
} from 'miniprogram-api-promise'
const wxp = {}
promisifyAll(wx, wxp)

export default Behavior({
  properties: {
    strings: Object,
    action: String,
    itemId: Number,
    userId: Number,
    waiverSigned: Boolean,
    isLateCancel: Boolean,
    enforceCancellationPolicy: Boolean,
    btnDisabled: {
      value: false,
      type: Boolean
    },
    params: Object,
    studio: String
  },


  /**
   * Component methods
   */
  methods: {
    takeAction(e) {
      const {
        action
      } = e.currentTarget.dataset
      console.log("in action", e.currentTarget.dataset)
      if (action == "buyMembership") {
        this.buyMembership()
      } else if (action == "bookClass") {
        this.bookClass()
      } else if (action == "topUp") {
        this.topUp()
      } else if (action == "upgradeCredit") {
        this.upgradeCredit()
      } else if (action == "queueUp") {
        this.queueUp()
      } else if (action == "navigateToBooking") {
        this.navigateToBooking()
      } else if (action == "reLaunchToMyClasses") {
        this.reLaunchToMyClasses()
      } else if (action == "reLaunchToIndexPage") {
        this.reLaunchToIndexPage()
      } else if (action == "cancelBooking") {
        this.cancelBooking()
      } else {
        console.log("Unknow action")
      }
    },

    async buyMembership() {
      console.log("buyMembership", this.data.params)
      const {membership, res} = await buyMembership(this.data.itemId, this.data.params)
      console.log("buyMembership", res)
      try {
        if (res !== "free"){
          let response = await wxp.requestPayment(res)
          console.log('RESPONSE:', response)
        } else {
          console.log("free membership, do not initiate payment");
        }
        this.triggerEvent('membershipbought')
      } catch (e) {
        // console.error(e)
        wx.showToast({
          title: this.properties.strings && this.properties.strings.payment_cancelled 
          || "Payment cancelled",
          icon: 'none'
        })
        deleteFailedPayment('memberships', membership.id)
        this.triggerEvent('membershipboughtfailed')
      } finally {
        //this.triggerEvent('membershipbought')
      }
    },

    async bookClass() {
      console.log("bookClass", this.data)
      const {booking, res} = await createBooking(this.data.itemId, this.data.params)
      console.log('response', booking, res)
      if(res){
        this.requestPayment(res, booking)
      } else {
        this.redirectToBookingConfirmation(booking)
      }
    },

    async queueUp() {
      const session = await addUserToQueue(this.properties.itemId)
      console.log(session)
      this.triggerEvent('queuedup', session)
    },

    async navigateToBooking() {
      if (this.properties.waiverSigned) {
        wx.navigateTo({
          url: `../../pages/booking/booking?sessionId=${this.properties.itemId}`,
        }) 
      } else {
        let res = await wxp.showModal({
          title: this.properties.strings && this.properties.strings.booking_waiver_title 
          || "By booking this class, you confirm that you are in good health, and you agree to our “Informed Consent Form”.",
          cancelText: this.properties.strings && this.properties.strings.booking_waiver_cancel
          || "Form",
          confirmText: this.properties.strings && this.properties.strings.booking_waiver_confirm
          || "Agree",
        })
        if (res.confirm) {
          let params = {}
          params.waiver_signed = true
          params.waiver_signed_at = new Date()
          const res = await updateUser(this.properties.userId, params)
          console.log("RES", res)
          wx.setStorageSync('user', res.user)
          wx.navigateTo({
            url: `../../pages/booking/booking?sessionId=${this.properties.itemId}`,
          }) 
        }  else {
          wx.navigateTo({
            url: `../../pages/profile-update/profile-update`,
          }) 
        }
      }
    },

    topUp() {
      wx.reLaunch({
        url: '/pages/wallet/wallet'
      })
    },

    upgradeCredit() {
      let membershipid = this.data.params && this.data.params.membership_id ? this.data.params.membership_id : ""
      console.log("membershipid:" + membershipid)
      wx.reLaunch({
        url: `/pages/wallet/wallet?selectedMembershipTypeId=${membershipid}`
      })
    },
    reLaunchToIndexPage() {
      wx.reLaunch({
        url: '../../pages/index/index',
      })
    },
    reLaunchToMyClasses() {
      wx.reLaunch({
        url: '../../pages/my-classes/my-classes',
      })
    },
    async cancelBooking() {
      let modalTitle = this.properties.strings && this.properties.strings.cancel_booking_normal_title || "Are you sure?"
      if (this.properties.isLateCancel && this.properties.enforceCancellationPolicy){
        modalTitle = this.properties.strings && this.properties.strings.cancel_booking_late_title ||  "Please note that this counts as late cancellation, providing no voucher refund / substracting one day from your current membership.Are you sure?"
      }
      
      let res = await wxp.showModal({
        title: modalTitle,
        cancelText: this.properties.strings && this.properties.strings.cancel_booking_cancel 
        || "No",
        confirmText: this.properties.strings && this.properties.strings.cancel_booking_confirm 
        || "Yes",
      })
      if (res.confirm) {
        this.handleCancelled()
      }
    },

    async handleCancelled() {
      const result = await cancelBooking(this.data.itemId)
      console.log(result)
      wx.showToast({
        title: this.properties.strings && this.properties.strings.booking_cancelled 
        || "Booking cancelled",
        icon: 'none',
        duration: 2500
      })
      this.triggerEvent('classcancelled', {})
    },

    async requestPayment(res, booking){
      console.log("Requesting payment")
      try {
        let response = await wxp.requestPayment(res)
        console.log('RESPONSE:', response)
        this.redirectToBookingConfirmation(booking)
      } catch (e) {
        wx.showToast({
          title: this.properties.strings && this.properties.strings.payment_cancelled 
          || "Payment cancelled",
          icon: 'none'
        })
        deleteFailedPayment('bookings', booking.id)
      } finally {
      }
    },
    redirectToBookingConfirmation(booking){
      wx.redirectTo({
        url: `../../pages/booking-confirmation/booking-confirmation?bookingId=${booking.id}`,
      })
    }
  }
})