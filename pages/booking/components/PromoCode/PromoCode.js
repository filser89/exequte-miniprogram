// components/PromoCode/PromoCode.js
import {useCoupon} from "../../../../utils/requests/index" 
Component({
  /**
   * Component properties
   */
  properties: {
    couponBtnDisabled: Boolean
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
    async formSubmit ({detail}) {
      console.info( "Promocode", detail.value)
      const {promoCode} = detail.value
      console.log("Promocode logic goes here")
      // submit promocode to backend
      const coupon = await useCoupon(promoCode)
      console.log(coupon)
      if (coupon.discount){
        this.setData({btnDisabled: true})
        wx.showToast({
          title: 'Promo code used!',
        })
        this.triggerEvent("couponused", {couponCode: coupon.coupon_code, discount: coupon.discount})
      } else {
        wx.showToast({
          title: coupon.msg,
        })
      }
      
    },
  }
})
