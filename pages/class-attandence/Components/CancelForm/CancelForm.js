// pages/class-attandence/CancelForm/CancelForm.js
import {cancelSession} from "../../../../utils/requests/index"
import {
  promisifyAll
} from 'miniprogram-api-promise'
const wxp = {}
promisifyAll(wx, wxp)

Component({
  /**
   * Component properties
   */
  properties: {
    strings:Object,
    session:Object
  },

  /**
   * Component initial data
   */
  data: {
    note: String
  },

  /**
   * Component methods
   */
  methods: {

    async showCancelNotePrompt() {
      let modalTitle = this.properties.strings && this.properties.strings.cancel_training_session_title || "Are you sure you want to cancel this training session?"
      let res = await wxp.showModal({
        title: modalTitle,
        cancelText: this.properties.strings && this.properties.strings.cancel_training_cancel 
        || "No",
        confirmText: this.properties.strings && this.properties.strings.cancel_training_confirm 
        || "Yes",
      })
      if (res.confirm) {
        this.selectComponent("#prompt").showPrompt()
      }
    },

    closePrompt(){
      this.selectComponent("#prompt").hidePrompt()
    },

    getCancellationNote: function (e) {
      this.setData({
        note: e.detail.value
      })
    },

    sendCancellation: function(){
      console.log('sending cancellation')
      console.log(this.properties.session)
      console.log(this.properties.session.id)
      this.submitRequest(this.properties.session.id, this.data.note)
      this.closePrompt()
    },

    async submitRequest(sessionId, note){
      const res = await cancelSession(sessionId, note)
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3500,
        })
        wx.reLaunch({
          url: '../../pages/index/index',
        })
    }
  },
  
})
