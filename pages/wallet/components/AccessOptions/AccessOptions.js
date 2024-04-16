// pages/booking/components/AccessOptions/AccessOptions.js
import {
  promisifyAll
} from 'miniprogram-api-promise';

const wxp = {}
promisifyAll(wx, wxp)

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
    user: Object,
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

    async chooseOption({currentTarget}){
      console.log("someone called me");
      console.log(currentTarget.dataset)
      const {bookingType, membershipTypeId, membershipTypePrice, membershipId, index, membershipDiscountMultiplier, membershipOnlyFemale  } = currentTarget.dataset
      console.log(membershipTypeId, membershipTypePrice)
      try {
        console.log("is women only? " + membershipOnlyFemale)
        if (membershipOnlyFemale){
          if (this.properties && this.properties.user && this.properties.user.gender){
            if (this.properties.user.gender === "Female"){
              console.log("user is female, can proceed")
              this.setData({selected: bookingType, current: index})
              this.triggerEvent('optionchanged', {
                selected: bookingType,
                 selectedMembershipTypeId: membershipTypeId,
                 selectedMembershipTypePrice: membershipTypePrice,
                 selecteMembershipDiscountMultiplier: membershipDiscountMultiplier,
                 membershipId
                })
            } else {
              console.log("women only, dont click");
              wx.showToast({
                title: this.properties.strings && this.properties.strings.womennoclick 
                || "This is a women-only membership",
                icon: 'none',
                duration: 3000,
              })
              return false;
            }
          } else {  
            let res = await wxp.showModal({
              title: this.properties.strings && this.properties.strings.genderupdate 
              || "Please update your gender in profile before buying this membershi.",
              cancelText: this.properties.strings && this.properties.strings.maybelater
              || "Later",
              confirmText: this.properties.strings && this.properties.strings.updatenow
              || "Update",
            })
            if (res.confirm) {
              wx.navigateTo({
                url: `/pages/profile-update/profile-update`
              })
            } else {
              return false;
            }
          }
        } else {
          this.setData({selected: bookingType, current: index})
          this.triggerEvent('optionchanged', {
            selected: bookingType,
             selectedMembershipTypeId: membershipTypeId,
             selectedMembershipTypePrice: membershipTypePrice,
             selecteMembershipDiscountMultiplier: membershipDiscountMultiplier,
             membershipId
            })
        }
      } catch (e){
        console.log(e);
        console.log("something went wrong, allowing to click and proceed");
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
  }
})
