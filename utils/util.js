const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//check if the current time counts as late cancellation (if its less than the hours in advance allowed to cancel)
const isLateCancellation = (classBeginDate, hoursAllowed) => {
  return (new Date(classBeginDate) - new Date()) < hoursAllowed * 3600000
}

const updateBarColors = (studio) => {
  if (!studio || studio === ""){
    studio = "reshape";
  }
  let studioTitle = "reshape"
  let barBgColor = "#141e2d";
  if (studio === "reshape"){
    wx.setTabBarItem({
      index: 0,
      text: '',
      'iconPath': '/images/home-unselected.png',
      'selectedIconPath': '/images/home-selected-reshape.png'
    });
    wx.setTabBarItem({
      index: 1,
      text: '',
      'iconPath': '/images/wallet-unselected.png',
      'selectedIconPath': '/images/wallet-selected-reshape.png'
    });
    wx.setTabBarItem({
      index: 2,
      text: '',
      'iconPath': '/images/schedule-unselected.png',
      'selectedIconPath': '/images/schedule-selected-reshape.png'
    });
    wx.setTabBarItem({
      index: 3,
      text: '',
      'iconPath': '/images/user-unselected.png',
      'selectedIconPath': '/images/user-selected-reshape.png'
    });
    studioTitle = "exeQute - Reshape";
    barBgColor = "#141e2d"
  } else {
    wx.setTabBarItem({
      index: 0,
      text: '',
      'iconPath': '/images/home-unselected.png',
      'selectedIconPath': '/images/home-selected-glam.png'
    });
    wx.setTabBarItem({
      index: 1,
      text: '',
      'iconPath': '/images/wallet-unselected.png',
      'selectedIconPath': '/images/wallet-selected-glam.png'
    });
    wx.setTabBarItem({
      index: 2,
      text: '',
      'iconPath': '/images/schedule-unselected.png',
      'selectedIconPath': '/images/schedule-selected-glam.png'
    });
    wx.setTabBarItem({
      index: 3,
      text: '',
      'iconPath': '/images/user-unselected.png',
      'selectedIconPath': '/images/user-selected-glam.png'
    });
    studioTitle = "exeQute - Glam";
    //barBgColor = "#c6b0a2";
    barBgColor = "#c8a2c8";
  }
  wx.setNavigationBarColor({
    frontColor: "#ffffff",
    backgroundColor: barBgColor,
    animation: {
      duration: 400,
      timingFunc: 'easeIn'
    }
  })
  wx.setNavigationBarTitle({
    title: studioTitle
  })
  wx.setTabBarStyle({
    color: barBgColor,
    backgroundColor: barBgColor,
    borderStyle: 'white'
  }) 
}

module.exports = {
  formatTime: formatTime,
  isLateCancellation: isLateCancellation,
  updateBarColors: updateBarColors
}
