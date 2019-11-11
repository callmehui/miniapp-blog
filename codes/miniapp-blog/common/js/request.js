module.exports = {
  request: request
}

function request (options) {
  const {
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    success,
    fail,
    complete,
    showError
  }  = options  

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success (res) {
        accessPermission(res.data, showError)
          .then (data => {
            resolve(data)
          })
          .catch (data => {
            reject(data)
          })
      },
      fail (res) {
        reject(res)
      },
      complete
    })
  })
}

function accessPermission(res, showError) {
  return new Promise((resolve, reject) => {
    if (res.errcode >= 200 && res.errcode < 300 || res.errcode === 304 ) {
      resolve(res.data)
    } else {
      if (!showError) {  // showError为真（默认为真），由这个方法显示错误信息
        uni.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      } else {  // showError为真，把错误信息暴露给外部
        reject(res.message)
      }
    }
  })
}