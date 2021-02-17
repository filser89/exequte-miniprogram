// pages/booking/components/PromoCodeInput/PromoCodeInput.js
Component({
  behaviors: ['wx://form-field'],
  properties: {
    strings: Object,
  },
  data: {
    value: ''
  },
  methods: {
    onChange ({detail}) {
      this.setData({
        value: detail.value,
      })
    }
  }
})