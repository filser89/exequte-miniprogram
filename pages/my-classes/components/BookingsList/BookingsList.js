// pages/my-classes/components/BookingCard/BookingsList/BookingsList.js

Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    bookings: Array,
    selected: Number
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
    navigateToBookingInfo({currentTarget}){
      const {bookingId, instructorId} = currentTarget.dataset
      wx.navigateTo({
        url: `../../../../booking-info/booking-info?bookingId=${bookingId}&instructorId=${instructorId}`,
      })
    }
  }
})