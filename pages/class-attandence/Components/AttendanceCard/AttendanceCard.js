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
  }
})
