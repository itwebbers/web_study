// axios
//   .post('http://10.5.125.37:3000/api/account/addUserInfo', {
//     SUB_ID: 2,
//     GROUP_SLT_ID: '21|23|2179'
//   })
//   .then(function(response) {
//     console.log(response)
//   })
//   .catch(function(error) {
//     console.log(error)
//   })


  // axios
  // .post('http://10.5.125.37:3000/api/meters/QueryReadNowData', {
  //   // .post('http://10.5.125.37:3000/api/meters/closeValue', {
  // // .post('http://10.5.125.37:3000/api/meters/queryUserMeterInfo', {
  //   'meterAddr': '000000029090',
  //   'taskNum': 3,
  //   'userCode': '5200'
  // })
  // // .post('http://10.5.125.37:3000/api/meters/QueryReadNowData', { 
  // //   userCode: '7001', // 用户编号
  // //   userName:  'itwebber', // 户名
  // //   address:  '秋名山5200号', // 安装地址
  // //   phone:  '1385252115645', //手机号
  // // })
  // .then(function(response) {
  //   console.log(response)
  // })
  // .catch(function(error) {
  //   console.log(error)
  // })

  
  // axios.post('http://10.5.125.37:3000/api/meters/openValue', { 
  //   'meterAddr': '000000000002',
  //   'taskNum': 2
  // })
  // .then(function(response) {
  //   console.log(response)
  // })
  // .catch(function(error) {
  //   console.log(error)
  // })

  // axios.post('http://1.71.141.46:8202/api/meters/closeValue', { 
  //   'meterAddr': '000010021383',
  //   'taskNum': 2
  // })
  // .then(function(response) {
  //   console.log(response)
  // })
  // .catch(function(error) {
  //   console.log(error)
  // })
  
  // axios.post('http://1.71.141.46:8202/api/meters/QueryReadNowData', { 
  //   'userCode': 'chint025',
  //   'taskNum': 2
  // })
  // .then(function(response) {
  //   console.log(response)
  // })
  // .catch(function(error) {
  //   console.log(error)
  // })


  // axios.post('http://10.5.125.37:3000/api/meters/queryUserMeterInfo', { 
  //   'userCode': 'chint025',
  //   'taskNum': 2
  // })
  // .then(function(response) {
  //   console.log(response)
  // })
  // .catch(function(error) {
  //   console.log(error)
  // })

  // axios.post('http://10.5.125.37:3000/api/account/addUserInfo', {
  //   "userCode":"4321",
  //   "userName":"43212",
  //   "address":"丰台区",
  //   "phone":"13863779316",
  //   "meterAddr":"987654335",
  //   "IMEI":"987654343223456",
  //   "meterBase":'0.00'
  // } )
  // .then(function(response) {
  //   console.log(response)
  // })
  // .catch(function(error) {
  //   console.log(error)
  // })


  axios.post('http://10.5.125.37:3000/api/account/UpdateUserInfo', {
    "userCode":"321321",
    "userName":"43212",
    "address":"台州",
    "phone":"13863779316",
    "meterAddr":"2323213",
    "IMEI":"987654343223456",
    "meterBase":'0.00'
  } )
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })