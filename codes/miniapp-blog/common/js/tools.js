

export default {
  install (Vue, options) {
    // 全局函数的hasClass()、addClass()、removeClass()
    // 用法示例：this.funcName()
    Vue.prototype.hasClass = hasClass
    Vue.prototype.addClass = addClass
    Vue.prototype.removeClass = removeClass
    Vue.prototype.dateToString = dateToString
    Vue.prototype.timeMillisFormat = timeMillisFormat
    Vue.prototype.translateTimeToText = translateTimeToText
    Vue.prototype.getUUid = getUUid
    Vue.prototype.getRandomList = getRandomList
  }
}

function removeClass () {
  let elem = arguments[0]
  let cls = arguments[1]
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '')
    return true
  }
  return false
}

function addClass () {
  let elem = arguments[0]
  let cls = arguments[1]
  if (!hasClass(elem, cls)) {
    elem.className = elem.className === '' ? cls : elem.className + ' ' + cls
    return true
  }
  return false
}

function hasClass () {
  let elem = arguments[0]
  let cls = arguments[1]
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0) {
    // 当cls没有参数时，返回false
    return false
  }
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

function dateToString (date, stringType) {
  let dateObj
  dateObj = Date.parse(arguments[0])
  dateObj = new Date(dateObj)
  let year = dateObj.getFullYear()
  let month = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)
  let day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()
  let hour = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()
  let minute = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
  let second = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds()
  let dateString = ''
  if (arguments.length > 1 && arguments[1] === 'date') {
    dateString = year + '-' + month + '-' + day
  } else if (arguments.length > 1 && arguments[1] === 'time') {
    dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (arguments.length === 1) {
    dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  }
  return dateString
}

/**
 * 时间戳格式化
 * @param {Long} 时间戳
 * @param {String} 格式化, 如: yyyy-MM-dd
 */
function timeMillisFormat (timeMillis, pattern = 'yyyy-MM-dd hh:mm:ss') {
  let dateObj
  if (!isNaN(timeMillis)) {
    dateObj = new Date(Number(timeMillis))
  } else {
    // 转换时间格式2018-11-11为2018/11/11
    dateObj = new Date(Date.parse(timeMillis))
  }
  return dformat(dateObj, pattern)
}

function dformat (date, fmt) {
  if (date instanceof Date) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  } else {
    return date
  }
}

/**
 * 把日期转换为例如：几分钟前，几天前这种格式显示
 * @param {String} timeString 时间字符串，要求能够转换为时间戳
 */
function translateTimeToText (timeString) {
  const time = Math.ceil((Date.now() - Date.parse(timeString)) / 1000)
  let timeText = ''
  if (time <= 60) {
    timeText = '刚刚'
  } else if (time < 3600) {
    timeText = `${Math.ceil(time / 60)}分钟前`
  } else if (time < 86400) {
    timeText = `${Math.ceil(time / (60 * 3600))}小时前`
  } else if (time < 86400 * 30) {
    timeText = `${Math.ceil(time / (60 * 3600 * 24))}天前`
  } else if (time < 86400 * 365) {
    timeText = `${Math.ceil(time / (60 * 3600 * 24 * 30))}个月前`
  } else if (time >= 86400 * 365) {
    timeText = `${Math.ceil(time / (60 * 3600 * 24 * 365))}年前`
  }
  return timeText
}

function getUUid () { // 获取唯一值
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 获取指定长度数据范围内指定书目的随机数
 * @param {*} length 随机数长度范围
 * @param {*} count 随机数随机数目
 */
function getRandomList (length, count) {
  if (length >= count) {
    const lengthArray = []
    const randomArray = []
    for (let i = 0; i < length; i++) {
      lengthArray[i] = i
    }
    lengthArray.sort(() => {
      return 0.5 - Math.random()
    })
    for (let i = 0; i < count; i++) {
      randomArray.push(lengthArray[i])
    }
    return randomArray
  } else {
    return false
  }
}
