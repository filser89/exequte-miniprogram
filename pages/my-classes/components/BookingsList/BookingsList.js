// pages/my-classes/components/BookingCard/BookingsList/BookingsList.js
import computedBehavior from 'miniprogram-computed'


Component({
  behaviors: [computedBehavior],
  /**
   * Component properties
   */
  properties: {
    bookings: Array,
    selected: Number
  },

  computed: {
    tab(data){
      return data.selected
    }
  },

  /**
   * Component initial data
   */
  data: {

  },
  lifetimes: {
    attached(){
    console.log(this.data.selected)
    }
  },
  // console.log(selected)

  /**
   * Component methods
   */
  methods: {

  }
})
