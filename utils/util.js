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

module.exports = {
  formatTime: formatTime,
  isLateCancellation: isLateCancellation
}
