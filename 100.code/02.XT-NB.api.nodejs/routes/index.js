var express = require('express')
var router = express.Router()
const querystring = require('querystring') //导入querystring模块（解析post请求数据）
const db = require('../config/db.config')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'cms.chint.com' });
});

// router.post('/getPassword', function(req, res, next) {
//     console.log(req.body)
//     if (req.body && JSON.stringify(req.body) !== '{}' && req.body.userName) {
//         db.query(req.body.userName)
//             .then(result => {
//                 console.log(result)
//                 res.json({
//                     resultCode: 1,
//                     data: result['recordsets'] || ''
//                 })
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     } else {
//         res.json({
//             resultCode: 1,
//             msg: '参数为空'
//         })
//     }
// });

// const result0 = {
//     "operType": "0",
//     "ack": "SUCCESS",
//     "result": [{
//         "MeterNo": "000000000001",
//         "DeviceType": "T",
//         "Time": "2019-08-29 08:12:24",
//         "Duration": "0",
//         "ActivePower": "38.2",
//         "RAP": "0.30",
//         "ERAP": "0.00"
//     }]
// }

// setInterval(function(){
//     var 
// }, 3000)



// router.post('/monitors', function(req, res, next) {
// 	console.log(req.body)
//     if (req.body && JSON.stringify(req.body) !== '{}') {
//         // const result0 = {
//         //     "operType": "0",
//         //     "ack": "SUCCESS",
//         //     "result": [{
//         //         "MeterNo": "00000001",
//         //         "DeviceType": "T",
//         //         "Time": "2019-08-29 08:12:24",
//         //         "Duration": "0",
//         //         "ActivePower": "38.2",
//         //         "RAP": "0.30",
//         //         "ERAP": "0.00"
//         //     }]
//         // }
//         const result1 = {
//             "operType": "1",
//             "ack": "SUCCESS",
//             "result": []
//             // {
//             //     "MeterNo": "4141421412421421",
//             //     "DeviceType": "F",
//             //     "Time": "2019-08-29 16:48:18",
//             //     "Duration": "0",
//             //     "ActivePower": "18.2",
//             //     "RAP": "0.80",
//             //     "ERAP": "0.00"
//             // }
//         }
//         const result2 = {
//             "operType": "2",
//             "ack": "SUCCESS",
//             "result": '0'
//         }
//         const result3 = {
//             "operType": "3",
//             "ack": "SUCCESS",
//             "result": '1'
//         }
//         const result4 = {
//             "operType": "4",
//             "ack": "SUCCESS",
//             "result": '1'
//         }
//         console.log(req.body.openType)
//         switch (req.body.openType) {
//             case '0':
//                 res.json(result0)
//                 break;
//             case '1':
//                 res.json(result1)
//                 break;
//             case '2':
//                 res.json(result2)
//                 break;
//             case '3':
//                 res.json(result3)
//                 break;
//             default:
//                 res.json(result4)
//         }
//     } else {
//         res.json({
//             resultCode: 1,
//             msg: 'openType参数为空或者不存在'
//         })
//     }
// });

module.exports = router;