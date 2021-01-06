// pages/my-classes/components/BookingCard/BookingCard.js
Component({
  /**
   * Component properties
   */
  properties: {
    booking: Object,
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
    navigateToBookingInfo(){
      const bookingId = this.data.booking.id
      const instructorId = this.data.booking.session.instructor_id
      wx.navigateTo({
        url: `../../../../booking-info/booking-info?bookingId=${bookingId}&instructorId=${instructorId}`,
      })
    }
  }
})
