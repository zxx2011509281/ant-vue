import axios from 'axios'
import store from '@/store'
// import { Toast } from 'vant'

// 创建axios 实例
const service = axios.create({
  // baseURL: '', // api的base_url
  timeout: 10000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置

    // loading + 1
    store.dispatch('setLoading', true)

    return config
  },
  error => {
    // 这里处理一些请求出错的情况
    // loading 清 0
    setTimeout(function () {
      store.dispatch('setLoading', 0)
    }, 300)

    console.log(error)
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑

    // loading - 1
    store.dispatch('setLoading', false)

    return res
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    // loading - 1
    store.dispatch('setLoading', false)

    return Promise.reject(error)
  }
)

let fetch = (options) => {
  return new Promise((resolve, reject) => {
    service({
      ...options,
      withCredentials: true
      // paramsSerializer: params => {
      //   return qs.stringify(params, { indices: false })
      // }
    }).then(data => {
      // 对createSignature 单独处理
      // if (options.url === '/weixin/createSignature') {
      //   resolve(data)
      //   return
      // }

      resolve(data)
      //请求成功后操作
      // if (options.codeResult) { // 需要返回全部数据
      //   resolve(data)
      // } else {
      //   let { code, message } = data.meta
      //   if (code === '0') {
      //     resolve(data.object)
      //   } else if (code === '1001') {
      //     login()
      //   } else {
      //     Toast(message)
      //     // resolve(data)
      //     reject({
      //       code,
      //       message
      //     })
      //   }
      // }
    }).catch(error => {
      console.log('请求异常信息：' + error)
      reject(error)
    })
  }).catch(error => {
    console.log(`code:${error.code},message: ${error.message}`)
  })
}

export default fetch