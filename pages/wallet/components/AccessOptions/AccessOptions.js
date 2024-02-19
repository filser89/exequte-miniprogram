// pages/booking/components/AccessOptions/AccessOptions.js
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    session: Object,
    membershipTypes: {
      type: Array,
      observer: 'membershipTypesChanged'
    },
    membership: Object,
    classpack: Object,
    selected: String,
    studio: String,
    selectedMembership: String
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
    membershipTypesChanged(newVal, oldVal) {
      try {
        let selectedMembershipId = this.properties.selectedMembership;
        if (selectedMembershipId && selectedMembershipId !== ""){
          let membershipIdAsInt = parseInt(selectedMembershipId, 10);
          console.log("id:" + membershipIdAsInt);
          let foundIndex = -1; // Initialize with -1 to indicate not found
          let membership = this.properties.membershipTypes.find((element, index) => {
            if (element.id === membershipIdAsInt) {
              foundIndex = index;
              return true; // Stop searching once found
            }
            return false;
          });
      
          if (membership) {
            console.log("Found Membership:", membership);
            console.log("Membership Position in Array:", foundIndex);
            this.forceOption("buy-membership", foundIndex, selectedMembershipId, membership.price, "" )
          } else {
            console.log("Membership not found.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    

    forceOption(bookingType, index, membershipTypeId, membershipTypePrice, membershipId ){
      console.log("someone called me");
      console.log(membershipTypeId, membershipTypePrice)
      this.setData({selected: bookingType, current: index})
      this.triggerEvent('optionchanged', {
        selected: bookingType,
         selectedMembershipTypeId: membershipTypeId,
         selectedMembershipTypePrice: membershipTypePrice,
         membershipId
        })
    },

    chooseOption({currentTarget}){
      console.log("someone called me");
      console.log(currentTarget.dataset)
      const {bookingType, membershipTypeId, membershipTypePrice, membershipId, index, membershipDiscountMultiplier } = currentTarget.dataset
      console.log(membershipTypeId, membershipTypePrice)
      this.setData({selected: bookingType, current: index})
      this.triggerEvent('optionchanged', {
        selected: bookingType,
         selectedMembershipTypeId: membershipTypeId,
         selectedMembershipTypePrice: membershipTypePrice,
         selecteMembershipDiscountMultiplier: membershipDiscountMultiplier,
         membershipId
        })
      
    }
  }
})
