const express = require('express')
const router = express.Router()
//导入querystring模块（解析post请求数据）
const querystring = require('querystring')

const request = require('../utils/request')

/* post account listing. */

/**
 * 用于查文青 http 测试
 *
 * *****************************当前为测试
 */


router.post('/login', function(req, res, next) {
  try {
    
    // const data = JSON.parse(req.body)
    // console.log(data)
    console.log(req.body)
    if (req.body && req.body.username === 'admin' && req.body.pwd === 123456) {
      res.json({
        code: 1,
        data: {
          username: req.body.username,
          pwd: req.body.pwd
        },
msg: '登陆成功'
      })
    } else {
      res.json({
        code: 0,
        data: {
	username: req.body.username,
          pwd: req.body.pwd
},
        msg: '用户名或者密码错误'
      })
    }
  } catch (error) {
    res.json({
      code: 0,
      data: {
	username: '',
          pwd: ''
},
      msg: '网络错误'
    })
  }
})

module.exports = router
