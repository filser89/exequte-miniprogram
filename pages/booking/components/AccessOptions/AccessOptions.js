// pages/booking/components/AccessOptions/AccessOptions.js
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    session: Object,
    membershipTypes: Array,
    membership: Object,
    selected: String
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
      
    }
  }
})
