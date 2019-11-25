import Vue from 'vue'
import Vuex from 'vuex'
import wx from 'weixin-js-sdk'
import router from '../router';
import { createSignature, getUserInfo, getTi, getUserInfo2 } from '../request/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      cpNum: 5,
      headimgurl: null,
      isTest: false,
      nickname: '',
      openid: '',
      schoolName: "",
    },
    eduId: 1,
    isFirst: true,
    ti: [{
      answer: "[]",
      category: 1,
      id: 1,
      topic: ""
    }],
    inputObj: {
      childName: '',
      sex: 'male',
      birthday: ''
    },
    result: { // 测评结果
      childName: '',
      sex: 'male',
      birthday: '',
      advantage: '',
      disadvantage: '',
      rcList: []
    }
  },
  mutations: {
    updateConfig(state, configInfo) {
      let { appId, timestamp, nonceStr, signature,
        title, desc, cpUrl, imgUrl
      } = configInfo
      wx.config({
        debug: false,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ]
      })
      wx.ready(() => {
        wx.updateAppMessageShareData({
          title: title, // 分享标题
          link: cpUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl // 分享图标
        })
        wx.updateTimelineShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: cpUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl // 分享图标
        })
      })
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
      });
    },
    updateLoading(state, bool) {
      state.requestLoading = bool
    },
    setUserInfo(state, r) {
      state.userInfo = r
    },
    getTiCommit(state, r) {
      state.ti = r
    },
    saveSchoolId(state, id) {
      state.eduId = id
    },
    saveInput(state, res) {
      state.inputObj = res
    },
    saveResult(state, res) {
      state.result = res
    },
    commitIsFirst(state, res) {
      state.isFirst = res
    }
  },
  actions: {
    wxConfig({ commit }, req) {
      createSignature({ openId: req.openid, eduId: req.eduId }).then(res => {
        commit('updateConfig', res.data)
      })
    },
    setLoading({ commit }, bool) {
      commit('updateLoading', bool)
    },
    getUserInfo({ commit, dispatch }, reqD) {
      commit('saveSchoolId', reqD.state)
      getUserInfo(reqD).then(res => {

        dispatch('wxConfig', { openid: res.data.openid, eduId: reqD.state })
        commit('setUserInfo', res.data)
        if (res.data.isTest) {
          router.push({ path: '/appraisaled', query: { isPerson: false } })
        }
      })
    },
    getUserInfo2({ commit, dispatch }, reqD) {
      commit('saveSchoolId', reqD.state)
      getUserInfo2(reqD).then(res => {
        if (res.data.isAuth) {
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcf51843f06fd8ebb&redirect_uri=http://rycp.3ikids.cn/index.html&response_type=code&scope=snsapi_userinfo&state=" + this.state.eduId + '_1' + "#wechat_redirect"
        }
        dispatch('wxConfig', { openid: res.data.openid, eduId: reqD.state })
        commit('setUserInfo', res.data)
        if (res.data.isTest) {
          router.push({ path: '/appraisaled', query: { isPerson: false } })
        }
      })
    },
    getTi({ commit }, req) {
      getTi(req).then(res => {
        commit('getTiCommit', res.data)
      })
    }
  },
  modules: {
    // address
  },
  strict: true,
  namespaced: true
})
