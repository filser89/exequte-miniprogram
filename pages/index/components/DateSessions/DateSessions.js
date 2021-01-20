// pages/index/components/DateSessions/DateSessions.js
import computedBehavior from 'miniprogram-computed'
import {getSessionsByDate} from '../../../../utils/requests/index'

Component({
  behaviors: [computedBehavior],
  /**
   * Component properties
   */
  properties: {
    date: String,
    lang: String
  },

  /**
   * Component initial data
   */
  data: {

  },
  watch: {
    async'date, lang'(date){
    // console.log("COMPUTED SESSIONS")
     let sessions  = await getSessionsByDate(date)
     this.setData({sessions})
    }
  },
  
  /**
   * Component methods
   */
  methods: {

  }
})
