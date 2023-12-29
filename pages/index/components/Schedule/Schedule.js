// pages/index/components/Schedule/Schedule.js
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    rawDates: Array,
    dates: Array,
    lang: String,
    studio: String
  },

  /**
   * Component initial data
   */
  data: {
    current: 0
  },

  /**
   * Component methods
   */
  methods: {
    toggleCurrent(e) {

      this.setData({current: e.currentTarget.dataset.index})
      console.log("current changed", this.data.current)
    }
  },

  logSession(e) {
    console.log(e.target)
  },
  splitDates(){
    
  }

  
})
