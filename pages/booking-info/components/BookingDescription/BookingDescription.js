// pages/booking-info/components/BookingDescription/BookingDescription.js
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    session: Object,
    booking: Object,
    instructor: Object,
    studio: String
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

    navigateToHrmData({currentTarget}){
      const {bookingId,hrmId} = currentTarget.dataset
      console.log('clicked hrm-view')
      wx.navigateTo({
        url: `../../pages/hrm-data/hrm-data?&bookingId=${bookingId}&hrmId=${hrmId}`
      })
    }

  }
})
