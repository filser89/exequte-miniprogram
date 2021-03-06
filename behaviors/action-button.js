import {
  createBooking,
  buyMembership,
  addUserToQueue,
  cancelBooking,
  deleteFailedPayment
} from '../utils/requests/index'
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
    btnDisabled: {
      value: false,
      type: Boolean
    },
    params: Object
  },

  /**
   * Component initial data
   */
  data: {

  },
  lifetimes: {
    attached() {
      // console.log(this.data)
    }
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
        let response = await wxp.requestPayment(res)
        console.log('RESPONSE:', response)
      } catch (e) {
        // console.error(e)
        wx.showToast({
          title: 'Payment cancelled',
          icon: 'none'
        })
        deleteFailedPayment('memberships', membership.id)
      } finally {
        this.triggerEvent('membershipbought')
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

    navigateToBooking() {
      wx.navigateTo({
        url: `../../pages/booking/booking?sessionId=${this.properties.itemId}`,
      })
    },

    reLaunchToMyClasses() {
      wx.reLaunch({
        url: '../../pages/my-classes/my-classes'
      })
    },
    reLaunchToIndexPage() {
      wx.reLaunch({
        url: '../../pages/index/index',
      })
    },
    async cancelBooking() {
      let res = await wxp.showModal({
        title: "Are you sure?",
        cancelText: "No",
        confirmText: "Yes",
      })
      if (res.confirm) {
        this.handleCancelled()
      }
    },

    async handleCancelled() {
      const result = await cancelBooking(this.data.itemId)
      console.log(result)
      wx.showToast({
        title: result.msg,
        icon: 'none'
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
          title: 'Payment cancelled',
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