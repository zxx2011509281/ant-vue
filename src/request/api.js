import fetch from './fetch'
import store from '../store/index'
import router from '../router'
import Vue from 'vue'
import { 
  CREATE_SIGNATURE,
  SPECIAL_LOGIN,
  PRODUCT_DETAIL,
  COUPON_LIST,
  PRODUCT_PAY,
  ORDER_LIST,
  CHECK_ORDER,
  LOGIN,
  CURRENT_INFO
} from './url'

/**
 * @description: 获取微信支付需要的信息
 * @param {Object} 
 * productOptIds: 产品id，多个用逗号分隔; 
 * couponIds：使用的优惠券id 多个用逗号分隔
 * payChannel：支付渠道 1-微信 2-支付宝
 * payType：支付类型 1=微信JS API 2=APP支付 3=PC支付
 * payFrom: 订单来源 1=微信公众号 2=微信小程序 3=iOS 4=安卓 
 */
export function productPay ({productOptIds='1', couponIds, payChannel=1, payType = 1, payFrom = 1, channelId}) {
  return fetch({
    url: PRODUCT_PAY,
    method: 'get',
    params: {
      productOptIds,
      couponIds,
      payChannel,
      payType,
      payFrom,
      channelId
    },
    codeResult: true //页面里面需要获取到返回的code
  })
}

/**
 * @description: 支付后检查是否购买成功
 * @param {Sring} 订单号 
 */
export function checkOrder (orderNum) {
  return fetch({
    url: CHECK_ORDER,
    method: 'get',
    params: {
      orderNum
    },
    codeResult: true //页面里面需要获取到返回的code
  })
}

/**
 * @description: 登陆
 * @param {Sring} 订单号 
 */
export async function login () {
  let url = location.href
  let jumpPage = Vue.prototype.$getQueryString('jumpPage')

  // 相关noReturn是用来解决煎蛋1.0跳转过来后退历史有问题加的特殊处理，1.0下架以后要删除
  let noReturn = Vue.prototype.$getQueryString('noReturn')

  let data = await fetch({
    url: LOGIN,
    method: 'get',
    params: {
      url
    },
    codeResult: true //页面里面需要获取到返回的code
  })
  if (data.meta.code === '0') {
    // 登陆成功
    store.commit('updateHeader', data.object.sessionId)
    if (jumpPage && jumpPage !== 'payment') {
      router.replace({name: jumpPage})
    } else {
      if (noReturn) {
        router.replace({name: 'payment', query: {noReturn: 1}})
      } else {
        router.replace({name: 'payment'})
      }
    }
  } else if (data.meta.code === '302') {
    // 重定向
    window.location.href = data.meta.message
  }
}

/**
 * @description: 获取订单列表
 * @param {type} 
 */
export function getOrderList () {
  return fetch({
    url: ORDER_LIST,
    method: 'get'
  })
}

/**
 * @description: 产品详情
 * @param {Number} 产品id 此项目是煎蛋英语产品 默认1 
 */
export function productDetail (productOptId=1) {
  return fetch({
    url: PRODUCT_DETAIL,
    method: 'get',
    params: {
      productOptId
    }
  })
}

/**
 * @description: 获取优惠券列表
 * @param {} 
 */
export function getCouponList () {
  return fetch({
    url: COUPON_LIST,
    method: 'get'
  })
}

/**
 * @description: 自动登录接口用来本地开发使用
 * @param {Object} unionid：用户的unionid, hostname: 需要请求的地址的hostname
 */
export function specialLogin ({unionid, hostname}) {
  return fetch({
    url: SPECIAL_LOGIN,
    method: 'get',
    params: {
      unionid,
      hostname
    }
  })
}

/**
 * @description: 根据当前地址创建签名
 * @param {}
 */
export function createSignature () {
  let url = window.location.href
  if (url.indexOf('#') > -1) {
    url = url.substring(0, url.indexOf('#'))
  }
  return fetch({
    url: CREATE_SIGNATURE,
    method: 'get',
    params: {
      url
    }
  })
}

/**
 * @description: 当前用户状态信息
 * @param {}
 */
export function getCurrentInfo () {
  return fetch({
    url: CURRENT_INFO,
    method: 'get'
  })
}