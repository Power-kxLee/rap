import axios from 'axios'

// 使用vercel提供的服务
//const ctx = 'https://service-dn6zvzcc-1253757220.gz.apigw.tencentcs.com'
const ctx = 'https://service-3u9whpym-1253757220.gz.apigw.tencentcs.com/release/'
const realIP = '116.25.146.177' // 这里随便一个国内ip就可以

const post = ({ url, data, headers, formData = false }:any) => {
  if (formData && Object.keys(data).length > 0) {
    const fParam = new URLSearchParams()

    for (const key in data) {
      fParam.append(key, data[key])
    }
    data = fParam
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data,
      headers,
      withCredentials: true
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
const get = async ({url, data={}}) => {
    let parame = []
    for (let key in data) {
      const val = data[key]
      parame.push(`${key}=${val}`)
    }
    // 向给定ID的用户发起请求
    url = ctx + url + '?' + parame.join('&')
     const {data:data1} =  await axios.get(url);
     return data1
}
const _axios = {
  post,
  get
}
export default _axios