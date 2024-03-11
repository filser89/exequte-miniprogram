// pages/booking/components/BookingInfo/BookingInfo.js
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
    strings: Object,
    custom_strings: Object,
    session: Object,
    early: Boolean,
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
    navigateToDirections(){
      console.log('clicked directions')
      wx.navigateTo({
        url: `/pages/studios-info/studios-info?id=12`
      })
    },

    async buyCard({currentTarget}) {
      let membershipid = currentTarget.dataset && currentTarget.dataset.membershipId ? currentTarget.dataset.membershipId : ""
      console.log("membershipid:" + membershipid)
      let resp = await wxp.showModal({
        title: this.properties && this.properties.string && this.properties.string.navigate_to_wallet 
        || "You are navigating to the wallet, proceed?",
        cancelText: this.properties && this.properties.string && this.properties.string.book 
        || "Book",
        confirmText: this.properties && this.properties.string && this.properties.string.buy_card  
        || "Wallet",
      })
      if (resp.confirm) {
        wx.reLaunch({url:`/pages/wallet/wallet?selectedMembershipTypeId=${membershipid}`})
      } else {
        return false;
      }
    },
  }
})
