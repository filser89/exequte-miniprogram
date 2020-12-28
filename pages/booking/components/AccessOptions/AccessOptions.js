// pages/booking/components/AccessOptions/AccessOptions.js
Component({
  /**
   * Component properties
   */
  properties: {
    session: Object,
    membershipTypes: Array,
    selected: String
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
    chooseOption({currentTarget}){
      // console.log(currentTarget.dataset)
      const {bookingType, membershipTypeId, membershipTypePrice, membershipId} = currentTarget.dataset
      console.log(membershipTypeId, membershipTypePrice)
      this.setData({selected: bookingType})
      this.triggerEvent('optionchanged', {
        selected: bookingType,
         selectedMembershipTypeId: membershipTypeId,
         selectedMembershipTypePrice: membershipTypePrice,
         membershipId
        })
      
    }
  }
})
