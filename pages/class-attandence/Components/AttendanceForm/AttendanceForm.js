// pages/class-attandence/AttendanceForm/AttendanceForm.js
import {takeAttendance} from "../../../../utils/requests/index"
Component({
  /**
   * Component properties
   */
  properties: {
    strings:Object,
    bookings: Array
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

    formSubmit({detail}) {
      console.log('SUBMIT', detail.value)
      let result = Object.entries(detail.value)
      const attendance = result.map((x) => {
        let obj = {}
        obj.id = x[0]
        obj.attended = x[1].length > 0
        return obj
      })
      this.submitRequest(attendance)
    },
    async submitRequest(params){
      // console.log('submitRequest', params)
      const res = await takeAttendance(params)
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })

    }
  },
  
})
