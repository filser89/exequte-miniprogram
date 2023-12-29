// components/TabBar/TabBar.js
Component({
  data: {
    selected: 1,
    color: "#FFFFFF",
    selectedColor: "#97daf540",
    list: [{
      pagePath: "../../pages/about/about",
      iconPath: "../../images/XQ1.svg",
      selectedIconPath: "../../images/XQ1.svg"
    }, {
      pagePath: "../../pages/index/index",
      iconPath: "../../images/schedule.svg",
      selectedIconPath: "../../images/schedule.svg"
    }, {
      pagePath: "../../pages/profile/profile",
      iconPath: "../../images/user.svg",
      selectedIconPath: "../../images/user.svg"
    }]
  },
  ready() {
    this.setData({selected: wx.getStorageSync('selectedTab')})
    console.log('ready',this.data.selected)
  },
  methods: {
    switchTab({currentTarget}) {
      const url = currentTarget.dataset.path
      wx.switchTab({url})
    }
  }
})
