// pages/profile-update/components/ProfileForm/ProfileForm.j
import computedBehavior from 'miniprogram-computed'
Component({
  behaviors: ['wx://form-field-group', computedBehavior],
  /**
   * Component properties
   */
  properties: {
    strings: Object,
    user: Object,
    birthday: String
  },
  watch: {
    'user'(user) {
      // console.log('WATCH', user)
      this.setPickersValues()
    }
  },
  /**
   * Component initial data
   */
  data: {
    activityLevels: ['', 'No activity (0x weekly)', 'Light (1-2x weekly)', 'Moderate (2-3x weekly)', 'High (4-5x weekly)', 'Extreme (5+ weekly)'],
    activityIndex: 0,
    activityIndex: 0,
    genders: ['', 'Male', 'Female', 'Trance / Non-binary / Other', 'Prefer not to disclose', ],
    genderIndex: 0
    // genders: {
    //   array: ['', 'Male', 'Female', 'Trance / Non-binary / Other', 'Prefer not to disclose'],
    //   index: 0
    // }
  },

  /**
   * Component methods
   */
  methods: {
    bindDateChange({
      detail
    }) {
      console.log('date-picker', detail.value)

      this.setData({
        birthday: detail.value
      })

    },
    bindActivityLevelChange(e) {
      console.log('Activity Level', e.detail.value)
      this.setData({
        activityIndex: e.detail.value
      })
    },
    bindGenderChange(e) {
      console.log('gender', e.detail.value)
      this.setData({
        genderIndex: e.detail.value
      })
    },
    setPickersValues() {
      console.log('Activity!', this.data.user)
      const user = this.data.user
      let activityIndex = this.data.activityLevels.indexOf(user.profession_activity_level)
      let genderIndex = this.data.genders.indexOf(user.gender)
      this.setData({activityIndex, genderIndex})
    }
  }
})