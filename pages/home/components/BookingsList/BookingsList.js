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
    studio: String,
    picture: String,
    fitness: String
  },


  /**
   * Component methods
   */
  methods: {

    navigateToHrmData({currentTarget}){
      const {bookingId,hrmId} = currentTarget.dataset
      console.log('clicked hrm-view')
      wx.navigateTo({
        url: `/pages/hrm-data/hrm-data?&bookingId=${bookingId}&hrmId=${hrmId}`
      })
    },
    navigateToFitness({currentTarget}){
      const {bookingId} = currentTarget.dataset
      console.log('clicked fitness-view')
      wx.navigateTo({
        url: `/pages/fitness-test/fitness-test?&bookingId=${bookingId}`
      })
    },
    preview_img: function ({target}) {
      wx.previewImage({
        current: target.dataset.url,
        urls: [target.dataset.url]
      })
    }

  }
})