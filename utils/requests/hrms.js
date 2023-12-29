import {request} from './request'

const getHrmDataForBooking = (bookingId) => {
  const options = {
    method: 'get',
    url: `/hrms/get_data?bookingId=${bookingId}`,
  }
  return request(options)
}

const getHrmGraphForBooking = (bookingId) => {
  const options = {
    method: 'get',
    url: `/hrms/get_graph?bookingId=${bookingId}`,
  }
  return request(options)
}


const getHrmDataGraphForBooking = (bookingId, forceRefresh) => {
  const options = {
    method: 'get',
    url: `/hrms/get_data_graph?bookingId=${bookingId}&force=${forceRefresh}`,
  }
  return request(options)
}
module.exports = {
  getHrmDataForBooking,
  getHrmGraphForBooking,
  getHrmDataGraphForBooking
}