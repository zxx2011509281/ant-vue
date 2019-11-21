import Vue from 'vue'
import Vuex from 'vuex'
import wx from 'weixin-js-sdk'
import { createSignature } from '../request/api'
// import address from './address/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    updateConfig (state) {
      let {appId, timestamp, nonceStr, signature} = state.wxConfigInfo
      let domain = location.origin + location.pathname
      let shareLink = `${domain}?jumpPage=payment&cid=8`
      let imgUrl = `${domain}shareLogo.png`
      wx.config({
        debug: false,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseWXPay'
        ]
      })
      wx.ready(() => {
        wx.onMenuShareTimeline({
          title: '邀请你报名新东方煎蛋英语', // 分享标题
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl // 分享图标
        })
        wx.onMenuShareAppMessage({
          title: '邀请你报名新东方煎蛋英语', // 分享标题
          desc: '每天15分钟，从听不懂到说出口。学英语。更简单！', // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl // 分享图标
        })
      })
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
      });
    },
    updateConfigInfo (state, configInfo) {
      state.wxConfigInfo = configInfo
    },
    updateLoading (state, bool) {
      state.requestLoading = bool
    }
  },
  actions: {
    wxConfig({state,commit}) {
      console.log(state)
      createSignature().then(data => {
        commit('updateConfigInfo', data)
        commit('updateConfig')
      })
    },
    setLoading ({commit}, bool) {
      commit('updateLoading', bool)
    }
  },
  modules: {
    // address
  },
  strict: true,
  namespaced: true
})
