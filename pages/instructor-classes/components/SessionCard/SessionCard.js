// pages/instructor-classes/components/SessionCard/SessionCard.js
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
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
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }

})
