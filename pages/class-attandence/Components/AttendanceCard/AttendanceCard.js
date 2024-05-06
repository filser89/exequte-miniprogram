// pages/class-attandence/Components/AttendanceCard/AttendanceCard.js
Component({
  behaviors: ['wx://form-field-group'],
  /**
   * 
   * Component properties
   */
  properties: {
    strings: Object,
    item: Object,
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
    goToUserProfile(e) {
      const {
        userId
      } = e.currentTarget.dataset
      console.log(userId)
      wx.navigateTo({
        url: `../../pages/profile-update/profile-update?userId=${userId}`,
      }) 
    },    
    goToFitnessTest(e) {
      const {
        bookingId,
        isFitnessTest
      } = e.currentTarget.dataset
      console.log(bookingId + " booking is fitness_test:" + isFitnessTest)
      if (isFitnessTest){
        wx.navigateTo({
          url: `../../pages/fitness-test/fitness-test?is_admin=true&bookingId=${bookingId}`,
        }) 
      } else {
        console.log("not fitness test, do nothing")
      }
    },
  }
})
