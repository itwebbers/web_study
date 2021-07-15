const express = require('express')
const router = express.Router()
//导入querystring模块（解析post请求数据）
const querystring = require('querystring')

const request = require('../utils/request')

/* post account listing. */

// function GetMeterInfo(){
//     request({
//       url: '?funcname=GetMeterInfo',
//       methods: 'post',
//       data: req.body
//     }).then(
//       result => {
//         res.json(result.data)
//       },
//       error => {
//         res.json(error)
//       }
//     )
// }

/**
 * 查询用户基本信息
 */
router.post('/queryUserMeterInfo', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userCode.trim() !== '') {
            console.log(req.body)
            // 如果表号和控制命令序号存在进行表计查询
            request({
                url: '?funcname=GetMeterInfo',
                methods: 'post',
                data: { IS_ADMIN: 0, GROUP_SLT_ID: '' }
            }).then(
                result => {
                    try {
                        // 查询表计是否存在档案中
                        if (result.data && result.data.length > 0) {
                            let hasMeters = result.data.filter(element => {
                                return element.USER_NUM === req.body.userCode
                            });

                            // 如果表计存在档案中,进行表计的合闸控制
                            if (hasMeters && hasMeters.length > 0) {
                                // 将表计信息重新赋值
                                let meterList = [], item = {}
                                hasMeters.forEach((element, index) => {
                                    item['meterAddr'] = element.M_ADDR_CODE
                                    item['meterTypeID'] = element.M_TYPE
                                    item['remnant'] = ''

                                    meterList.push(item)
                                });
                                res.json({
                                    resultCode: 1,
                                    msg: "操作成功",
                                    userCode: hasMeters[0].M_ADDR_CODE, // 用户编号
                                    userName: hasMeters[0].USER_NAME, // 户名
                                    address: hasMeters[0].M_INSTALL_ADDR, // 安装地址
                                    phone: hasMeters[0].USER_TEL, //手机号
                                    meterList: meterList // 表计列表
                                })
                                // res.json(result.data)
                            } else {
                                res.json({
                                    resultCode: 1,
                                    msg: '用户不存在'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 1,
                                msg: '用户不存在'
                            })
                        }
                    } catch (error) {
                        res.json(error)
                    }
                },
                error => {
                    res.json(error)
                }
            )
        } else {
            res.json({
                resultCode: 1,
                msg: '参数表号不能为空'
            })
        }
    } catch (error) {
        res.json(error)
    }
})

/**
 * 修改用户信息
 */
router.post('/updateUserInfo', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userCode.trim() !== '') {
            console.log(req.body)
            // 如果表号和控制命令序号存在进行表计查询
            request({
                url: '?funcname=GetMeterInfo',
                methods: 'post',
                data: { IS_ADMIN: 0, GROUP_SLT_ID: '' }
            }).then(
                result => {
                    try {
                        // 查询表计是否存在档案中
                        if (result.data && result.data.length > 0) {
                            let hasMeters = result.data.filter(element => {
                                return element.USER_NUM === req.body.userCode
                            });
                            // 如果表计存在档案中,进行表计的合闸控制
                            if (hasMeters && hasMeters.length > 0) {
                                // 将表计信息更新成参数传入的数据
                                let updateMeter = req.body
                                hasMeters.forEach((element, index) => {
                                    element.M_ADDR_CODE = updateMeter.userCode
                                    element.USER_NAME = updateMeter.userName
                                    element.M_INSTALL_ADDR = updateMeter.address
                                    element.USER_TEL = updateMeter.phone
                                });
                                console.log(hasMeters[0])
                                try {
                                    request({
                                        url: '?funcname=UpdateMeterInfo',
                                        methods: 'POST',
                                        data: JSON.stringify(hasMeters[0])
                                    }).then(
                                        result => {
                                            // if (result.data && result.data[0].CODE === 'SUCCESS') {
                                            //     res.json({ "resultCode": 0, "msg": "操作成功" })
                                            // } else {
                                            //     res.json({ "resultCode": 1, "msg": "终端设备离线" })
                                            // }
                                            res.json(result.data)

                                        },
                                        error => {
                                            res.json(error)
                                        }
                                    )
                                } catch (error) {
                                    res.json(error)
                                }
                            } else {
                                res.json({
                                    resultCode: 1,
                                    msg: '用户不存在'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 1,
                                msg: '用户不存在'
                            })
                        }
                    } catch (error) {
                        res.json(error)
                    }
                },
                error => {
                    res.json(error)
                }
            )
        } else {
            res.json({
                resultCode: 1,
                msg: '参数表号不能为空'
            })
        }
    } catch (error) {
        res.json(error)
    }
})

/**
 * 查询当前数据 
 */
router.post('/QueryReadNowData', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userCode.trim() !== '') {
            console.log(req.body)
            // 如果表号和控制命令序号存在进行表计查询
            request({
                url: '?funcname=GetMeterInfo',
                methods: 'post',
                data: { IS_ADMIN: 0, GROUP_SLT_ID: '' }
            }).then(
                result => {
                    try {
                        // 查询表计是否存在档案中
                        if (result.data && result.data.length > 0) {
                            let hasMeters = result.data.filter(element => {
                                return element.USER_NUM === req.body.userCode
                            });
                            // 如果表计存在档案中,进行表计的合闸控制
                            if (hasMeters && hasMeters.length > 0) {
                                // 将表计信息更新成参数传入的数据
                                let allMeterMID = '', meterList = [], item = {}
                                hasMeters.forEach((element, index) => {
                                    allMeterMID += '|' + element.M_ID

                                    item['meterAddr'] = element.M_ADDR_CODE
                                    item['meterTypeID'] = element.M_TYPE

                                    meterList.push(item)
                                });
                                console.log(allMeterMID)
                                try {
                                    request({
                                        url: '?funcname=GetMRealData',
                                        methods: 'POST',
                                        data: { GROUP_MID: allMeterMID, ELEMENT: "129|131" }
                                    }).then(
                                        result => {
                                            if (result.data && result.data[0].CODE === 'SUCCESS') {
                                                res.json({
                                                    "resultCode": 0,
                                                    "msg": "Success",
                                                    "userCode": req.body.userCode,
                                                    // "userName": "郭贵宾",
                                                    "meterList": [
                                                        {
                                                            "meterAddr": "100150804420", // 表号
                                                            "meterTypeId": 24, // 表计类型
                                                            "readNumber": 171, // 正向有功示值
                                                            "readDate": "2017-11-30 10:47:12", // 抄读时间
                                                            "meterTime": "2017-11-30 10:45:12", // 表计时间
                                                            "valveState ": "1", // 运行状态
                                                            "RSRP": "-80", // 信号强度 
                                                            "meterCSQ": "20", // 信号质量 
                                                            "voltage": "3.2", // 电池电压 
                                                            "meterStatus": " " // 异常信息 
                                                        }
                                                    ]
                                                })
                                            } else {
                                                res.json({ "resultCode": 1, "msg": "未查询当前数据" })
                                            }
                                        },
                                        error => {
                                            res.json(error)
                                        }
                                    )
                                } catch (error) {
                                    res.json(error)
                                }
                            } else {
                                res.json({
                                    resultCode: 1,
                                    msg: '未查询当前数据'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 1,
                                msg: '未查询当前数据'
                            })
                        }
                    } catch (error) {
                        res.json(error)
                    }
                },
                error => {
                    res.json(error)
                }
            )
        } else {
            res.json({
                resultCode: 1,
                msg: '参数表号不能为空'
            })
        }
    } catch (error) {
        res.json(error)
    }
})

/**
 * 设备开阀
 */
router.post('/openValue', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userCode.trim() !== '') {
            console.log(req.body)
            // 如果表号和控制命令序号存在进行表计查询
            request({
                url: '?funcname=GetMeterInfo',
                methods: 'post',
                data: { IS_ADMIN: 0, GROUP_SLT_ID: '' }
            }).then(
                result => {
                    try {
                        // 查询表计是否存在档案中
                        if (result.data && result.data.length > 0) {
                            let hasMeters = result.data.filter(element => {
                                return element.M_ADDR_CODE === req.body.meterAddr
                            });
                            // 如果表计存在档案中,进行表计的合闸控制
                            if (hasMeters && hasMeters.length > 0) {
                                try {
                                    request({
                                        url: '?funcname=ActionMPowerOn',
                                        methods: 'post',
                                        data: { 'GROUP_MID': hasMeters[0].M_ID }
                                    }).then(
                                        result => {
                                            if (result.data && result.data[0].CODE === 'SUCCESS') {
                                                res.json({ "resultCode": 0, "msg": "操作成功" })
                                            } else {
                                                res.json({ "resultCode": 1, "msg": "终端设备离线" })
                                            }
                                        },
                                        error => {
                                            res.json(error)
                                        }
                                    )
                                } catch (error) {
                                    res.json(error)
                                }
                            } else {
                                res.json({
                                    resultCode: 0,
                                    msg: '请检查您输入的表计表号是否准确'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 0,
                                msg: '未查询到您控制的表计'
                            })
                        }
                    } catch (error) {
                        res.json(error)
                    }
                },
                error => {
                    res.json(error)
                }
            )
        } else {
            res.json({
                resultCode: 0,
                msg: '参数表号/控阀命令不能为空'
            })
        }
    } catch (error) {
        res.json(error)
    }
})

/**
 * 设备关阀
 */
router.post('/closeValue', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userCode.trim() !== '') {
            console.log(req.body)
            // 如果表号和控制命令序号存在进行表计查询
            request({
                url: '?funcname=GetMeterInfo',
                methods: 'post',
                data: { IS_ADMIN: 0, GROUP_SLT_ID: '' }
            }).then(
                result => {
                    try {
                        // 查询表计是否存在档案中
                        if (result.data && result.data.length > 0) {
                            let hasMeters = result.data.filter(element => {
                                return element.M_ADDR_CODE === req.body.meterAddr
                            });
                            // 如果表计存在档案中,进行表计的拉闸控制
                            if (hasMeters && hasMeters.length > 0) {
                                try {
                                    request({
                                        url: '?funcname=ActionMPowerOff',
                                        methods: 'post',
                                        data: { 'GROUP_MID': hasMeters[0].M_ID }
                                    }).then(
                                        result => {
                                            if (result.data && result.data[0].CODE === 'SUCCESS') {
                                                res.json({ "resultCode": 0, "msg": "操作成功" })
                                            } else {
                                                res.json({ "resultCode": 1, "msg": "终端设备离线" })
                                            }
                                        },
                                        error => {
                                            res.json(error)
                                        }
                                    )
                                } catch (error) {
                                    res.json(error)
                                }
                            } else {
                                res.json({
                                    resultCode: 0,
                                    msg: '请检查您输入的表计表号是否准确'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 0,
                                msg: '未查询到您控制的表计'
                            })
                        }
                    } catch (error) {
                        res.json(error)
                    }
                },
                error => {
                    res.json(error)
                }
            )
        } else {
            res.json({
                resultCode: 0,
                msg: '参数表号/控阀命令不能为空'
            })
        }
    } catch (error) {
        res.json(error)
    }
})

/**
 * 抄表数据上报
 */
router.post('/UploadData', function (req, res, next) {
    if (req.body && JSON.stringify(req.body) !== '{}') {
        console.log(req.body)
        // request({
        //   url: '?funcname=GetMRealData',
        //   methods: 'post',
        //   data: req.body
        // }).then(
        //   result => {
        //     res.json(result.data)
        //   },
        //   error => {
        //     res.json(error)
        //   }
        // )
    } else {
        res.json({
            resultCode: 1,
            msg: '参数为空'
        })
    }
})

/**
 * 控阀执行结果上报
 */
router.post('/CommandResult', function (req, res, next) {
    if (req.body && JSON.stringify(req.body) !== '{}') {
        console.log(req.body)
        // request({
        //   url: '?funcname=GetTerMeterSltInfo',
        //   methods: 'post',
        //   data: req.body
        // }).then(
        //   result => {
        //     res.json(result.data)
        //   },
        //   error => {
        //     res.json(error)
        //   }
        // )
    } else {
        res.json({
            resultCode: 1,
            msg: '参数为空'
        })
    }
})

module.exports = router
