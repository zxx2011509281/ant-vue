import axios from 'axios';
// import router from '../router/index'
// import { loStorage } from '@/libs/storage.js';
import store from '@/store'
import qs from 'qs'

axios.defaults.timeout = 3000;

axios.defaults.baseURL = '';

//http request 拦截器
axios.interceptors.request.use(
    config => {

      store.dispatch('setLoading', true)
        const _isJSON = config.responseType === 'json' || config.responseType === 'JSON';

        const data = config.data;

        config.data = !_isJSON ? qs.stringify(data) : JSON.stringify(data);

        config.headers['Content-Type'] = _isJSON ? 'application/json' : 'application/x-www-form-urlencoded';

        config.headers['auth-token'] = localStorage.getItem('token');
        config.headers['x-auth-token'] = localStorage.getItem('token');

        return config;
    },
    error => {
      store.dispatch('setLoading', false)
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
      store.dispatch('setLoading', false)
        return response;

       
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    // console.log('getrtttt', url, params)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: { ...params }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function json(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'post',
            data: data,
            responseType: 'json'
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
