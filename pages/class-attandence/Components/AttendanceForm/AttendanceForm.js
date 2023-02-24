// pages/class-attandence/AttendanceForm/AttendanceForm.js
import {takeAttendance,changeCapacity} from "../../../../utils/requests/index"
Component({
  /**
   * Component properties
   */
  properties: {
    strings:Object,
    bookings: Array,
    session:Object
  },

  /**
   * Component initial data
   */
  data: {
    capacity: Number
  },
  ready() {
    this.setData({capacity: this.properties.session.capacity})
  },
  /**
   * Component methods
   */
  methods: {

    async increaseCapacity(){
      this.properties.session.capacity++
      const res = await changeCapacity(this.properties.session.id, this.properties.session.capacity)
      this.setData({capacity: this.properties.session.capacity})
      wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500,
        })
    }, 
    async decreaseCapacity(){
        if (this.properties.bookings && this.properties.bookings.length && this.properties.session.capacity == this.properties.bookings.length){
          let modalTitle = this.properties.strings && this.properties.strings.bookings_more_than_capacity || "Cannot have capacity less than current bookings"
          wx.showModal({
            title: modalTitle,
            showCancel: false,
            confirmText: this.properties.strings && this.properties.strings.close 
            || "Close",
          })
        } else if (this.properties.session.capacity == 1){ 
          let modalTitle = this.properties.strings && this.properties.strings.capacity_less_than_zero || "Cannot have capacity less than zero"
          wx.showModal({
            title: modalTitle,
            showCancel: false,
            confirmText: this.properties.strings && this.properties.strings.close 
            || "Close"
          })
        } else {
          this.properties.session.capacity--
          const res = await changeCapacity(this.properties.session.id, this.properties.session.capacity)
          this.setData({capacity: this.properties.session.capacity})
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500,
            })
          }
    },    

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
