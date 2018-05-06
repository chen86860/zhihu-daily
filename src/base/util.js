export const util = {
  /**
     * @param {*url} str
     *  解析URL参数，返回查询对象
     */
  parseURL(str) {
    if (typeof str !== 'string') {
      return {}
    }
    if (str.match(/\?/)) str = str.slice((str.match(/\?/)).index + 1)
    return decodeURIComponent(str).split('&').map(param => {
      const tmp = param.split('=')
      const key = tmp[0]
      let value = tmp[1] || true
      if (typeof value === 'string' && isNaN(Number(value)) === false) {
        value = Number(value)
      }

      return { key, value }
    }).reduce((params, item) => {
      const { key, value } = item
      if (typeof params[key] === 'undefined') {
        params[key] = value
      } else {
        params[key] = Array.isArray(params[key]) ? params[key] : [params[key]]
        params[key].push(value)
      }

      return params
    }, {})
  },

  /**
     *  读取cookie
     *
     * @param {any} name
     * @returns
     */
  getCookie(name) {
    if (document.cookie.length < 1) return ''
    const cookie = {}
    const cookieArr = document.cookie.split(';')

    cookieArr.forEach((e) => {
      const name = e.split('=')[0].trim()
      const value = e.split('=')[1].trim()
      if (typeof cookie[name] === 'undefined') {
        cookie[name] = value
      } else {
        cookie[name] = Array.isArray(cookie[name]) ? cookie[name] : [cookie[name]]
        cookie[name].push(value)
      }
    })

    return cookie[name] && window.unescape(cookie[name])
  },
  /**
     * 设置cookie, 域名为.adbats.com
     *
     * @param {any} name
     * @param {any} value
     */
  setCookie(name, value) {
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';domain=.adbats.com;path=/;expires=' + exp.toGMTString()
  },
  /**
   *  获取 UA
   *  返回ios/android/pc
   * @returns
   */
  getUA() {
    var ua = window.navigator.userAgent
    if (ua.match(/iphone/ig)) return 'ios'
    if (ua.match(/android/ig)) return 'android'
    return 'pc'
  },

  /**
   * 判断是否是微信环境
   *
   * @returns
   */
  isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger'
  },
  isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]'
  },
  isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]'
  },
  /**
   * 函数防抖
   *
   * @param {any} fn
   * @param {any} delay
   * @returns
   */
  debounce(fn, delay) {
    let timer = null
    return function () {
      var context = this,
        args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  },
  /**
   * 函数节流
   * @param {any} fn
   * @param {any} delay
   * @param {any} mustRunDelay
   * @returns
   */
  throttle(fn, delay, mustRunDelay) {
    let timer = null
    let tStart
    return function () {
      var context = this, args = arguments, tCurr = +new Date()
      clearTimeout(timer)
      if (!tStart) {
        tStart = tCurr
      }
      if (tCurr - tStart >= mustRunDelay) {
        fn.apply(context, args)
        tStart = tCurr
      } else {
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }
  },
  supportWebp() {
    let elem = document.createElement('canvas')

    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } else {
      return false
    }
  }
}
