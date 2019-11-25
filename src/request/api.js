import { get, json } from './fetch'


const base = 'http://192.168.1.154:8080/';

// const fetch = function(){}


export function getUserInfo(req) {
  return get(base + 'assess/wxinfo', req)
}

export function getUserInfo2(req) {
  return get(base + 'assess/wxinfonotauth', req)
}

export function getTi(req) {
  return get(base + 'assess/list', req)
}

export function submit(req) {
  return json(base + 'assess/list', req)
}
export function queryResutlt(req) {
  return get(base + 'assess/rrrrrrrrrrrrrrrrrrrrrrrr', req)
}
export function queryResutltSchool(req) {
  return get(base + 'assess/schoolcp', req)
}


/**
 * @description: 根据当前地址创建签名
 * @param {}
 */
export function createSignature(req) {
  return get(base + 'assess/getShareData', req)
}
