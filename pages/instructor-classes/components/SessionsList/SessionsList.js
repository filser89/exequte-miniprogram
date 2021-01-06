// pages/instructor-classes/components/SessionsList/SessionsList.js
import computedBehavior from 'miniprogram-computed'


Component({
  behaviors: [computedBehavior],
  /**
   * Component properties
   */
  properties: {
    sessions: Array,
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