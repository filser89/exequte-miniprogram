// pages/instructor-classes/components/SessionCard/SessionCard.js
Component({
  /**
   * Component properties
   */
  properties: {
    session: Object,
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
    navigateToClassAttendance(){
      wx.navigateTo({
        url: `/pages/class-attandence/class-attandence?id=${this.data.session.id}`
      })
    }
  }
})
