// pages/booking/components/AccessOptions/AccessOptions.js
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
    session: Object,
    membershipTypes: Array,
    membership: Object,
    classpack: Object,
    selected: String,
    studio: String
  },

  /**
   * Component initial data
   */
  data: {
    current: null
  },

  /**
   * Component methods
   */
  methods: {
    openSubAndChooseOption({currentTarget}){
      // console.log(currentTarget.dataset)
      this.setData({selected: bookingType, current: index})
    },

    chooseOption({currentTarget}){
      // console.log(currentTarget.dataset)
      const {bookingType, membershipTypeId, membershipTypePrice, membershipId, index} = currentTarget.dataset
      console.log(membershipTypeId, membershipTypePrice)
      this.setData({selected: bookingType, current: index})
      this.triggerEvent('optionchanged', {
        selected: bookingType,
         selectedMembershipTypeId: membershipTypeId,
         selectedMembershipTypePrice: membershipTypePrice,
         membershipId
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
