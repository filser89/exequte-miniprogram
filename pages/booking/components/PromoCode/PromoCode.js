// components/PromoCode/PromoCode.js
import {
  useCoupon
} from "../../../../utils/requests/index"
Component({
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    couponBtnDisabled: Boolean
  },

  /**
   * Component initial data
   */
  data: {
    couponUsed: false
  },

  /**
   * Component methods
   */
  methods: {
    async formSubmit({
      detail
    }) {
      if (!this.data.couponUsed) {
        console.info("Promocode", detail.value)
        const {
          promoCode
        } = detail.value
        console.log("Promocode logic goes here")
        // submit promocode to backend
        const coupon = await useCoupon(promoCode)
        console.log(coupon)
        if (coupon.discount) {
          this.setData({
            couponUsed: true
          })
          wx.showToast({
            title: 'Promo code used!',
            icon: 'none'
          })
          this.triggerEvent("couponused", {
            couponCode: coupon.coupon_code,
            discount: coupon.discount
          })
        } else {
          wx.showToast({
            title: coupon.msg,
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: 'Promo Code already entered',
          icon: 'none'
        })
      }


    },
  }
})