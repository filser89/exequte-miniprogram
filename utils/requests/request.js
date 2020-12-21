import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise';

const app = getApp()
const wxp = {}
promisifyAll(wx, wxp)


const request = async (options) => {
  try {
    let resp = await wxp.request({
      url: `${app.globalData.BASE_URL}${options.url}`,
      method: options.method,
      header: app.globalData.headers,
      data: options.data
    })
    return handleResponse(resp)
  } catch (e) {
    console.error(e.message)
  }
}

const upload = async (options) => {
  try {
    let resp = await wxp.uploadFile({
      filePath: options.filePath,
      name: options.name,
      url: `${app.globalData.BASE_URL}${options.url}`,
      header: app.globalData.headers,
    })
    console.log(resp)
    return handleResponse(resp)
  } catch (e) {
    console.error(e.message)
  }
}

// const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

const handleResponse = resp =>{
  if (resp.statusCode === 200) {
    console.log(resp.data.data)
    return resp.data.data
  } else {
    throw new Error(resp.data.error.message)
  }
}

module.exports = {
  request,
  upload
}