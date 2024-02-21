// pages/studios-info/studios-info.js
import {getInfoById, getStrings} from "../../utils/requests/index"
import { updateBarColors } from '../../utils/util'

Page({

  /**
   * Page initial data
   */
  data: {
    strings: {},
    infos: {},
    studio: {}
  },

  onLoad(options){
    this.setData({options})
  },

  async onShow(){
    const infos = await getInfoById(this.data.options.id)
    const strings = await getStrings(this.route.split('/')[2])
    this.setData({infos, strings})
    this.setData({ studio : getApp().globalData.studio ? getApp().globalData.studio : "reshape" })
    updateBarColors(getApp().globalData.studio)
  },
  handleLanguageChanged(){
    this.onShow()
  },
  handleStudioChanged(){
    this.onShow()
  },
  navigateBack(){
    wx.navigateBack({
      delta: 0
    })
  },

  onTapImg({currentTarget}) {
    try {
      const {nodes} = currentTarget.dataset
      console.log(nodes);
      if (nodes){
        const imgTags = currentTarget.dataset.nodes.match(/<img.*?>/g);
        const urls = [];
        if (imgTags) {
          imgTags.forEach((tag) => {
            const url = tag.match(/src="(.*?)"/);
            if (url) {
              urls.push(url[1]);
            }
          });
        }
        wx.previewImage({
          urls: urls,
        });
      }
    } catch(e){

    }
  },
  
})