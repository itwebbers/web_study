const express = require('express')
const router = express.Router()
const querystring = require('querystring') //导入querystring模块（解析post请求数据）
const axios = require('axios')

const request = require('../utils/request')
const tools = require('../utils/tools')

/* post meters listing. */

/**
 * 控阀结果上报
 */
function CommandResult(data, res, resJson) {
    try {
        axios({
            url: 'http://10.5.125.37:3000/api/meters/CommandResult',
            method: 'post',
            data: data
        }).then(
            result => {
                if (result.data) {
                    res.json(resJson)
                } else {
                    res.json({
                        resultCode: 1,
                        "msg": "Failure"
                    })
                }
            },
            error => {
                res.json(error)
            }
        )
    } catch (error) {
        res.json(error)
    }
}

/**
 * 查询用户和表信息
 */
router.post('/queryUserMeterInfo', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userCode.trim() !== '') {

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
                            console.log(hasMeters)
                            // 如果表计存在档案中,进行表计的合闸控制
                            if (hasMeters && hasMeters.length === 1) {
                                // 将表计信息重新赋值
                                let GROUP_MID_ARR = '', meterList = []
                                // 提取并组织meterList
                                hasMeters.forEach((element, index) => {
                                    let item = {
                                        meterAddr: '',
                                        meterTypeID: '',
                                        remnant: '',
                                        M_ID: ''
                                    }
                                    // GROUP_MID_ARR += element.M_ID + (index === hasMeters.length ? '' : '|')
                                    GROUP_MID_ARR = element.M_ID

                                    item['meterAddr'] = element.M_ADDR_CODE
                                    item['meterTypeID'] = element.M_TYPE
                                    item['remnant'] = ''
                                    item['M_ID'] = element.M_ID

                                    meterList.push(item)
                                })
                                console.log(GROUP_MID_ARR)
                                try {
                                    request({
                                        url: '?funcname=GetMPowerPurchaseData',
                                        methods: 'POST',
                                        data: { GROUP_MID: GROUP_MID_ARR }
                                    }).then(
                                        result => {
                                            console.log(result.data)
                                            if (result.data && result.data.length > 0 && result.data[0]['CODE'] === 'SUCCESS') {
                                                // 将接口返回的剩余金额赋值给对应的表计meterList
                                                // let response = tools.unique(result.data, 'MID')
                                                // meterList = tools.unique(meterList, 'M_ID')

                                                // for (let index = 0; index <= result.data.length; index++) {
                                                //     for (let j = 0; j <= index; j++) {
                                                //         if (result.data[index]['MID'] === meterList[j]['M_ID']) {
                                                //             meterList[j].remnant = result.data[index].R_MP_REMAIN_MONEY
                                                //             console.log(meterList)
                                                //         }

                                                //     }
                                                // }
                                                meterList[0].remnant = result.data[0].R_MP_REMAIN_MONEY

                                                // 删除用于判断的M_ID
                                                meterList.forEach(element => {
                                                    delete element.M_ID
                                                })

                                                // 对meterList 进行去重
                                                // meterList = tools.RemoveSameArray(meterList)

                                                res.json({
                                                    resultCode: 0,
                                                    msg: "操作成功",
                                                    userCode: hasMeters[0].M_ADDR_CODE, // 用户编号
                                                    userName: hasMeters[0].USER_NAME, // 户名
                                                    address: hasMeters[0].M_INSTALL_ADDR, // 安装地址
                                                    phone: hasMeters[0].USER_TEL, //手机号
                                                    meterList: meterList // 表计列表
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
                                    msg: '用户不存在/或者'
                                })
                            }
                        } else {
                            res.json({
                                resultCode: 1,
                                msg: '用户不存在'
                            })
                        }
                    } catch (error) {
                        res.json({
                            resultCode: 1,
                            msg: '接口请求异常,请您稍后尝试'
                        })
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
        res.json({
            resultCode: 1,
            msg: '接口请求异常,请您稍后尝试'
        })
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
                            const meterTypeArr = ['0', '1', '6']
                            let hasMeters = result.data.filter(element => {
                                return element.USER_NUM === req.body.userCode && meterTypeArr.includes(element.M_TYPE)
                            });
                            // 如果表计存在档案中,进行表计的合闸控制
                            if (hasMeters && hasMeters.length > 0) {
                                // 将表计信息更新成参数传入的数据
                                let allMeterMID = '', meterList = [], item = {
                                    "M_ID": '', // --------------> 输出前,需要删除改属性
                                    "meterAddr": "100150804420", // 表号
                                    "meterTypeId": '', // 表计类型
                                    "readNumber": '', // 正向有功示值
                                    "readDate": new Date(), // 抄读时间
                                    "meterTime": " ", // 表计时间
                                    "valveState": "", // 运行状态
                                    "RSRP": " ", // 信号强度 
                                    "meterCSQ": " ", // 信号质量 
                                    "voltage": " ", // 电池电压 
                                    "meterStatus": " " // 异常信息 
                                }
                                hasMeters.forEach((element, index) => {
                                    allMeterMID += '|' + element.M_ID

                                    item['M_ID'] = element.M_ID
                                    item['meterAddr'] = element.M_ADDR_CODE
                                    item['meterTypeID'] = element.M_TYPE

                                    meterList.push(item)
                                });
                                try {
                                    request({
                                        url: '?funcname=GetMRealData',
                                        methods: 'POST',
                                        data: { GROUP_MID: allMeterMID, ELEMENT: "224" }
                                    }).then(
                                        result => {
                                            if (result.data && result.data[0].CODE === 'SUCCESS') {
                                                // result.data.forEach((element, index) => {

                                                //     for (let i = 0; i++; i <= meterList.length) {
                                                //         if (element.M_ID === meterList[i]['M_ID']) {
                                                //             meterList[i].readNumber = element.H_D_MP_PAP_R
                                                //         }
                                                //     }
                                                // })
                                                meterList[0].readNumber = result.data[0].H_D_MP_PAP_R 
                                                meterList.forEach(element => {
                                                    delete element.M_ID
                                                })
                                                
                                                res.json({
                                                    "resultCode": 0,
                                                    "msg": "Success",
                                                    "userCode": req.body.userCode,
                                                    "userName": " ",
                                                    "meterList": meterList
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
                                    msg: '未查询到当前数据'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 1,
                                msg: '请检查您输入的表号'
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
        res.json({
            resultCode: 1,
            msg: '接口请求异常,请您稍后尝试'
        })
    }
})

/**
 * 设备开阀
 */
router.post('/openValue', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.meterAddr.trim() !== '' && req.body.taskNum === 3) {
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
                                        // url: '?funcname=ActionMPowerOn',
                                        url: '?funcname=ActionMeterPower',
                                        methods: 'post',
                                        data: { 'MID': hasMeters[0].M_ID, TYPE: 3 }
                                    }).then(
                                        result => {
                                            console.log(result.data)
                                            if (result.data && result.data.CODE === 'SUCCESS') {
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
                                resultCode: 1,
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
                msg: '参数表号/控阀命令不能为空或者错误'
            })
        }
    } catch (error) {
        res.json({
            resultCode: 1,
            msg: '接口请求异常,请您稍后尝试'
        })
    }
})

/**
 * 设备关阀
 */
router.post('/closeValue', function (req, res, next) {
    // 判断用户是否传入参数
    try {
        if (req.body && JSON.stringify(req.body) !== '{}' && req.body.meterAddr.trim() !== '') {
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
                                        url: '?funcname=ActionMeterPower',
                                        methods: 'post',
                                        data: { 'MID': hasMeters[0].M_ID, TYPE: 2 }
                                    }).then(
                                        result => {
                                            console.log(result.data)
                                            if (result.data && result.data.CODE === 'SUCCESS') {
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
                                    resultCode: 1,
                                    msg: '请检查您输入的表计表号是否准确'
                                })
                            }

                        } else {
                            res.json({
                                resultCode: 1,
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
                resultCode: 1,
                msg: '参数表号/控阀命令不能为空'
            })
        }
    } catch (error) {
        res.send({
            resultCode: 1,
            msg: '接口请求异常,请您稍后尝试'
        })
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
    try {
        if (req.body && JSON.stringify(req.body) !== '{}') {
            res.json({
                "resultCode": 0,
                "msg": "Success"
            })
        } else {
            res.json({
                resultCode: 1,
                msg: '参数为空'
            })
        }
    } catch (error) {
        res.json(error)
    }

})

module.exports = router
