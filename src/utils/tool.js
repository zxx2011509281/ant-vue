import Vue from 'vue'

/**
 * 获取网页参数
 */
Vue.prototype.$getQueryString = param => {
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

Vue.prototype.$toDouble = (value) => {
    return value > 9 ? value : `0${value}`
}

Vue.prototype.$deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}