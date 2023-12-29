// pages/my-classes/components/BookingCard/BookingsList/BookingsList.js
const app = getApp()

Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    bookings: Array,
    selected: Number,
    studio: String
  },


  /**
   * Component methods
   */
  methods: {
    navigateToBookingInfo({currentTarget}){
      const {bookingId, instructorId} = currentTarget.dataset
      wx.navigateTo({
        url: `../../../../booking-info/booking-info?bookingId=${bookingId}&instructorId=${instructorId}`,
      })
    }
  }
})