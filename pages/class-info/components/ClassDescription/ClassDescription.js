// pages/class-info/components/ClassDescription/ClassDescription.js
Component({
  /**
   * Component properties
   */
  properties: {
    session: Object,
    instructor: Object,
    strings: Object
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
    async handleChangedDate({
      detail
    }) {
      this.triggerEvent( 'changeddate', detail)
    },
  }
})
