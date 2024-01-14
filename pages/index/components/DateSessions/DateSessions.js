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
    lang: String,
    studio: String,
    size: String
  },

  /**
   * Component initial data
   */
  data: {

  },
  watch: {
    async'date, lang, studio'(date){
    // console.log("COMPUTED SESSIONS")
     let sessions  = await getSessionsByDate(date)
     try {
      let currentStudio = getApp().globalData.studio
      if (!currentStudio || currentStudio  == ""){
        console.log("current studio null, setting it to reshape");
        currentStudio = "reshape";
      }
      console.log("current studio for filter:" + currentStudio);
      sessions = sessions.filter(session => session.location === currentStudio);
      console.log('filtered sessions:');
      console.log(sessions);
     } catch(e){console.log(e)}
     this.setData({sessions})
    }
  },

  pageLifetimes:{
   async show(){

    let date = this.data.date == "" ? this.todayDateString() : this.data.date
    console.log("DATE", date)
    let sessions  = await getSessionsByDate(date)
    try {
     let currentStudio = getApp().globalData.studio
     if (!currentStudio || currentStudio  == ""){
       console.log("current studio null, setting it to reshape");
       currentStudio = "reshape";
     }
     console.log("current studio for filter:" + currentStudio);
     sessions = sessions.filter(session => session.location === currentStudio);
     console.log('filtered sessions:');
     console.log(sessions);
    } catch(e){console.log(e)}
    this.setData({sessions})
     
    }
  },
  
  /**
   * Component methods
   */
  methods: {
    todayDateString() {
      let date = new Date
      console.log('before date function')
      date = date.toJSON().replace(/T.*/, "T00:00:00.000+08:00")
      return date
    }
  }
})
