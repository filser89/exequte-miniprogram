// pages/index/components/DateSessions/DateSessions.js
import computedBehavior from 'miniprogram-computed'
import {getSessionsByDate} from '../../../../utils/requests/index'

Component({
  behaviors: [computedBehavior],
  /**
   * Component properties
   */
  properties: {
    strings: Object,
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

  pageLifetimes:{
   async show(){

    let date = this.data.date == "" ? this.todayDateString() : this.data.date
    console.log("DATE", date)
    let sessions  = await getSessionsByDate(date)
     this.setData({sessions})
    }
  },
  
  /**
   * Component methods
   */
  methods: {
    todayDateString() {
      let date = new Date
      date = date.toJSON().replace(/(?<=T).*/, "00:00:00.000+08:00")
      return date
    }
  }
})
