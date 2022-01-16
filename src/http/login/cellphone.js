import axios from '../api'

// 手机登录
function cellphone(phone, password, countrycode = '86') {
  return new Promise((resolve, reject) => {
    axios
      .get('/login/cellphone', {
        params: {
          phone,
          password,
          countrycode
        }
      })
      .then(response => {
        response || reject('操作频繁，请稍候再试')
        let obj = {
          code: 2,
          cookie: response.cookie
        }
        switch (response.code) {
          case 502: // 密码错误
            obj.code = 0
            break
          case 200: // 登录成功
            obj.code = 1
            break
          case 250: // 登录失败
            obj.code = 2
            break
          case 509: // 密码错误超过限制
            obj.code = 3
        }
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default cellphone
