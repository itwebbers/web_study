var express = require('express')
var router = express.Router()
const axios = require('axios')

const G = {}

G.getDate = function () {
  var date = new Date();
  return date.getFullYear() + '-' + this.prefixInteger((date.getMonth() + 1), 2) + '-' + this.prefixInteger(date.getDate(), 2);
};

G.getDateTime = function () {
  var date = new Date();
  return this.prefixInteger(date.getHours(), 2) + ':' + this.prefixInteger(date.getMinutes(), 2) + ':' + this.prefixInteger(date.getSeconds(), 2);
};

// 数值补零
G.prefixInteger = function (num, n) {
  return (Array(n).join(0) + num).slice(-n);
};

var group_slt_id = "";
var t_id = "";
var m_id_elec = "";
var m_id_water = "";

async function getBaseInfo() {
  let res1 = await axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetSltInfoBySub', {
    "SUB_ID": "5"//项目id 
  }).catch(e => {
    console.log(e);
    res.send(0);
  });
  group_slt_id = res1.data.GROUP_SLT_ID;
console.log("group_slt_id" + group_slt_id);

  let res2 = await axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetTerInfo', {
    "IS_ADMIN": "1",
    "GROUP_SLT_ID": group_slt_id,
PAGE_NUM: 1,
            NUM: ''
  }).catch(e => {
    console.log(e);
    res.send(0);
  });
  res2.data.forEach(data => {
    t_id += data['T_ID'] + '|';
  });
  // console.log(t_id);

  let res3 = await axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetTableMeterInfo', {
    "IS_ADMIN": "1",
    "GROUP_SLT_ID": group_slt_id,
PAGE_NUM: 1,
            NUM: ''
  }).catch(e => {
    console.log(e);
    res.send(0);
  });
  res3.data.forEach(data => {
    if (data.M_TYPE === '0' || data.M_TYPE === '1' || data.M_TYPE === '6') {
      m_id_elec += data['M_ID'] + '|';
    }
    if (data.M_TYPE === '2' || data.M_TYPE === '7' || data.M_TYPE === '8') {
      m_id_water += data['M_ID'] + '|';
    }
  });
  // console.log(m_id_elec);
console.log("水----------------" + m_id_water);
}
getBaseInfo();

// 累计信息
router.get('/getTotalInfo', async (req, res) => {
  await axios.all([
    // 累计交易流水
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetRegionRevenueData', {
      "TID": t_id,  //终端id 用|分隔
      "STIME": "2016-01-01 00:00:00", //开始时间
      "ETIME": G.getDate() + ' ' + G.getDateTime(), //结束时间
      "TYPE": "M",//时间类型，月：M,日：D
      "MENUS_TYPE": ""//0：电 1：水

    }),
    // 累计交易次数
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetSellDataByNum', {
      "TID": t_id,
      "NUM": "",//条数  为空则查全部
      "PAGE_NUM": "",//当前页码 为空 则查全部
      "MENUS_TYPE": ""//为空，则水电都查
    }),
  ]).then(axios.spread((totalMoney, totalExchange) => {
    let totalMoneyData = (totalMoney.data[0].SUM_AMOUNT / 10000).toFixed(2);
    let totalExchangeData = totalExchange.data.length;
    res.json([totalMoneyData, totalExchangeData]);
  })).catch(e => {
    console.log(e);
    res.json(0);
  });
});

// 今日信息
router.get('/getTodayEnergy', async (req, res) => {
  await axios.all([
    // 今日用电/用水
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDayEnergyAmountByTable', {
      "GROUP_MID": m_id_elec
    }),
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDayEnergyAmountByTable', {
      "GROUP_MID": m_id_water
    }),
  ]).then(axios.spread((todayElec, todayWater) => {
    // 今日用电/用水
    let todayElecArr = todayElec.data;
    let todayWaterArr = todayWater.data;
    let todayElecData = 0;
    let todayWaterData = 0;
    todayElecArr.forEach(data => {
      todayElecData += Number(data.USE_ENERGY);
    });
    console.log('今日用电信息：' + todayElecData);
    todayWaterArr.forEach(data => {
      todayWaterData += Number(data.USE_ENERGY);
    });
    res.send([todayElecData, todayWaterData]);
  })).catch(e => {
    console.log(e);
    res.send(0);
  });
});

// 用能走势图
router.get('/getUseEnergyTrend', async (req, res) => {
  let date = new Date();
  await axios.all([
    // 用电本月
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDayEPower', {
      "TID": t_id, //
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "0" //0：电 1：水
    }),
    // 用电上月
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDayEPower', {
      "TID": t_id, //
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth()), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "0" //0：电 1：水
    }),
    // 用水本月
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDayEPower', {
      "TID": t_id, //
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "1" //0：电 1：水
    }),
    // 用水上月
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDayEPower', {
      "TID": t_id, //
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth()), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "1" //0：电 1：水
    }),
  ]).then(axios.spread((useElecThisMonth, useElecLastMonth, useWaterThisMonth, useWaterLastMonth) => {
    // 用能走势图
    let useElecThisMonthArr = useElecThisMonth.data;
    let useElecLastMonthArr = useElecLastMonth.data;
    let useWaterThisMonthArr = useWaterThisMonth.data;
    let useWaterLastMonthArr = useWaterLastMonth.data;
    let useElecThisMonthDate = []; // 用电本月日期
    let useElecThisMonthAmount = []; // 用电本月
    let useElecLastMonthDate = []; // 用电上月日期
    let useElecLastMonthAmount = []; // 用电上月
    let useWaterThisMonthDate = []; // 用水本月日期
    let useWaterThisMonthAmount = []; // 用水本月
    let useWaterLastMonthDate = []; // 用水上月日期
    let useWaterLastMonthAmount = []; // 用水上月
    useElecThisMonthArr.forEach(data => {
      useElecThisMonthDate.push(data.TIME);
      useElecThisMonthAmount.push(data.USE_ENERGY.toFixed(2));
    });
    useElecLastMonthArr.forEach(data => {
      useElecLastMonthDate.push(data.TIME);
      useElecLastMonthAmount.push(data.USE_ENERGY.toFixed(2));
    });
    useWaterThisMonthArr.forEach(data => {
      useWaterThisMonthDate.push(data.TIME);
      useWaterThisMonthAmount.push(data.USE_ENERGY.toFixed(2));
    });
    useWaterLastMonthArr.forEach(data => {
      useWaterLastMonthDate.push(data.TIME);
      useWaterLastMonthAmount.push(data.USE_ENERGY.toFixed(2));
    });
    let thisMonthElecIndex = useElecThisMonthDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2));
    let lastMonthElecIndex = useElecLastMonthDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth()), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2));
    let thisMonthWaterIndex = useWaterThisMonthDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2));
    let lastMonthWaterIndex = useWaterLastMonthDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth()), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2));
    let useElecThisMonthDateData = useElecThisMonthDate.slice(thisMonthElecIndex - 10, thisMonthElecIndex + 1);
    let useElecThisMonthAmountData = useElecThisMonthAmount.slice(thisMonthElecIndex - 10, thisMonthElecIndex + 1);
    // let useElecLastMonthDateData = useElecLastMonthDate.slice(lastMonthElecIndex - 10, lastMonthElecIndex + 1);
    let useElecLastMonthAmountData = useElecLastMonthAmount.slice(lastMonthElecIndex - 10, lastMonthElecIndex + 1);
    let useWaterThisMonthAmountData = useWaterThisMonthAmount.slice(thisMonthWaterIndex - 10, thisMonthWaterIndex + 1);
    let useWaterLastMonthAmountData = useWaterLastMonthAmount.slice(lastMonthWaterIndex - 10, lastMonthWaterIndex + 1);
    res.send([useElecThisMonthDateData, useElecThisMonthAmountData, useElecLastMonthAmountData, useWaterThisMonthAmountData, useWaterLastMonthAmountData]);
  })).catch(e => {
    console.log(e);
    res.send(0);
  });
});

// 能耗类型分布
router.get('/getEnergyTypeDistribution', async (req, res) => {
  let date = new Date();
  // 能耗类型分布
  await axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetHomeERegionPowerForFunArea', {
    "TID": group_slt_id, //
    "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
    "TYPE": "M",//Y:年，M:月，D:日
    "MENUS_TYPE": "" //0：电 1：水
  }).then((energyType) => {
console.log('能耗:' + JSON.stringify(energyType))
    // 能耗类型分布
    let energyTypeArr = energyType.data;
    let energyTypeData = [];
    let sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0, sum5 = 0, sum6 = 0, sum7 = 0;
    energyTypeArr.forEach(data => {
      sum1 += data["3_空调"];
      sum2 += data["5_饮用水"];
      sum3 += data["1_动力"];
      sum4 += data["4_特殊用电"];
      sum5 += data["6_污水"];
      sum6 += data["2_照明插座"];
      sum7 += data["0_其他"];
    });
    energyTypeData.push(sum1.toFixed(2), sum2.toFixed(2), sum3.toFixed(2), sum4.toFixed(2), sum5.toFixed(2), sum6.toFixed(2), sum7.toFixed(2));
    res.send(energyTypeData);
  }).catch(e => {
    console.log(e);
    res.send(0);
  });
});

// 用能排名
router.get('/getUseEnergyRating', async (req, res) => {
  let date = new Date();
  await axios.all([
    // 用能排名 -- 用电
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetUseEnergyDataByRegion', {
      "GROUP_SLT_ID": group_slt_id, //从档案信息中获取
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "0" //0：电 1：水
    }),
    // 用能排名 -- 用水
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetUseEnergyDataByRegion', {
      "GROUP_SLT_ID": group_slt_id, //从档案信息中获取
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "1" //0：电 1：水
    }),
  ]).then(axios.spread((useEleRating, useWaterRating) => {
    // 用能排名
    let useEleRatingArr = useEleRating.data;
    let useWaterRatingArr = useWaterRating.data;
    let useEleRatingData = [];
    let useWaterRatingData = [];
    let house1Elec = 0;
    let house2Elec = 0;
    let house3Elec = 0;
    let house1Water = 0;
    let house2Water = 0;
    let house3Water = 0;
    useEleRatingArr.forEach(data => {
      if (data.L_NAME === '正泰量测1号楼') {
        house1Elec += data.USE_ENERGY;
      }
      if (data.L_NAME === '正泰量测2号楼') {
        house2Elec += data.USE_ENERGY;
      }
      if (data.L_NAME === '正泰量测3号楼') {
        house3Elec += data.USE_ENERGY;
      }
    });
    useWaterRatingArr.forEach(data => {
      if (data.L_NAME === '正泰量测1号楼') {
        house1Water += data.USE_ENERGY;
      }
      if (data.L_NAME === '正泰量测2号楼') {
        house2Water += data.USE_ENERGY;
      }
      if (data.L_NAME === '正泰量测3号楼') {
        house3Water += data.USE_ENERGY;
      }
    });
    useEleRatingData.push(house1Elec, house2Elec, house3Elec);
    useWaterRatingData.push(house1Water, house2Water, house3Water);
    // for (let i = 0; i <= 2; i++) {
    //     useEleRatingData.push(useEleRatingArr[i].USE_ENERGY.toFixed(2));
    //     useWaterRatingData.push(useWaterRatingArr[i].USE_ENERGY.toFixed(2));
    // }

    console.log('用电排名：' + useEleRatingData);
    console.log('用水排名：' + useWaterRatingData);

    res.send([useEleRatingData, useWaterRatingData]);
  })).catch(e => {
    console.log(e);
    res.send(0);
  });
});

// 交易趋势分析
router.get('/getExchangeTrend', async (req, res) => {
  let date = new Date();
  await axios.all([
    // 交易趋势分析
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetAllRevenueData', {
      "TID": t_id, //从档案信息中获取
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "0" //0：电 1：水
    }),
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetAllRevenueData', {
      "TID": t_id, //从档案信息中获取
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2),//2019，2019-07，2019-07-30
      "TYPE": "M",//Y:年，M:月，D:日
      "MENUS_TYPE": "1" //0：电 1：水
    }),
  ]).then(axios.spread((exchangeEleTrend, exchangeWaterTrend) => {
    // 交易趋势分析 -- 电
    let exchangeEleTrendArr = exchangeEleTrend.data;
    let exchangeEleTrendDate = []; // 交易日期
    let exchangeEleTrendMoney = []; // 交易金额

    let exchangeTrendDate = []; // 交易趋势分析的横轴

    exchangeEleTrendArr.forEach(data => {
      exchangeEleTrendDate.push(data.SALE_DATE);
      // exchangeEleTrendMoney.push(data.AMOUNT);
    });
    // 获取上一个月的天数
    let d = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    console.log('d:' + d.getDate());
    for (let i = 0; i < 12; i++) {
      if (date.getDate() - i <= 0) {
        exchangeTrendDate.push(date.getFullYear() + '-' + G.prefixInteger((date.getMonth()), 2) + '-' + G.prefixInteger(d.getDate() - Math.abs(date.getDate() - i), 2));
      } else {
        exchangeTrendDate.push(date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate() - i, 2));
      }
    }
    exchangeTrendDate.reverse();
    console.log("交易趋势日期；" + exchangeTrendDate);

    let elecIndex1 = 0;
    let elecIndex2 = 0;
    while (elecIndex2 < 12) {
      if (exchangeEleTrendDate[exchangeEleTrendDate.length - 1 - elecIndex1] === exchangeTrendDate[exchangeTrendDate.length - 1 - elecIndex2]) {
        exchangeEleTrendMoney.push(exchangeEleTrendArr[exchangeEleTrendDate.length - 1 - elecIndex1].AMOUNT);
        // exchangeTrendDate.length = exchangeTrendDate.length - 1;
        elecIndex1++;
        elecIndex2++;
      } else {
        exchangeEleTrendMoney.push('0');
        elecIndex2++;
      }
    }
    exchangeEleTrendMoney.reverse();
    console.log('电钱：' + exchangeEleTrendMoney);

    // exchangeEleTrendArr.forEach(data => {
    //     exchangeEleTrendDate.push(data.SALE_DATE);
    //     exchangeEleTrendMoney.push(data.AMOUNT);
    // });
    // let todayIndex = exchangeEleTrendDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate(), 2));
    // for (let i = todayIndex; i >= todayIndex - 12; i--) {
    //     if (exchangeEleTrendDate[i].SALE_DATE === exchangeTrendDate[0])
    //         if (exchangeEleTrendDate.indexOf(exchangeTrendDate[i + 11]) + 1) {
    //             // exchangeEleTrendMoney.splice(i, 0, '0'); 
    //             console.log('电对应日期正确！')
    //         } else {
    //             exchangeEleTrendMoney.splice(i, 0, '0');
    //         }
    // }
    // console.log('交易趋势分析 --- 电费：' + exchangeEleTrendMoney);

    // exchangeEleTrendArr.forEach(data => {
    //     exchangeEleTrendDate.push(data.SALE_DATE);
    //     exchangeEleTrendMoney.push(data.AMOUNT);

    //     if (data.SALE_DATE === exchangeTrendDate[index]){

    //     }
    // });
    // let todayIndex = exchangeEleTrendDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate(), 2));
    // let exchangeEleTrendDateData = exchangeEleTrendDate.slice(todayIndex - 6, todayIndex + 6);
    // let exchangeEleTrendMoneyData = exchangeEleTrendMoney.slice(todayIndex - 6, todayIndex + 6);
    // console.log('用电趋势' + exchangeEleTrendMoneyData + '用电趋势');
    // let exchangeEleTrendMap = new Map();
    // for (i = 0; i < exchangeEleTrendDate.length - 1; i++) {
    //     exchangeEleTrendMap.set(exchangeEleTrendDate[i], exchangeEleTrendMoney[i]);
    // }
    // 交易趋势分析 -- 水
    let exchangeWaterTrendArr = exchangeWaterTrend.data;
    let exchangeWaterTrendDate = []; // 交易日期
    let exchangeWaterTrendMoney = []; // 交易金额
    exchangeWaterTrendArr.forEach(data => {
      exchangeWaterTrendDate.push(data.SALE_DATE);
      // exchangeWaterTrendMoney.push(data.AMOUNT);
    });
    let waterIndex1 = 0;
    let waterIndex2 = 0;
    while (waterIndex2 < 12) {
      if (exchangeWaterTrendDate[exchangeWaterTrendDate.length - 1 - waterIndex1] === exchangeTrendDate[exchangeTrendDate.length - 1 - waterIndex2]) {
        exchangeWaterTrendMoney.push(exchangeWaterTrendArr[exchangeWaterTrendDate.length - 1 - waterIndex1].AMOUNT);
        // exchangeTrendDate.length = exchangeTrendDate.length - 1;
        waterIndex1++;
        waterIndex2++;
      } else {
        exchangeWaterTrendMoney.push('0');
        waterIndex2++;
      }
    }
    exchangeWaterTrendMoney.reverse();
    console.log('水钱：' + exchangeWaterTrendMoney);

    // exchangeWaterTrendMoney.splice(7, 0, '0');

    // let todayIndex1 = exchangeWaterTrendDate.indexOf(date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2));
    // console.log('todayIndex1: ' + todayIndex1);
    // let exchangeWaterTrendMoneyData = exchangeWaterTrendMoney.slice(todayIndex1 - 4, todayIndex1 + 3);
    // console.log('用水趋势' + exchangeWaterTrendMoneyData + '用水趋势');
    res.send([exchangeTrendDate, exchangeEleTrendMoney, exchangeWaterTrendMoney]);
  })).catch(e => {
    console.log(e);
    res.send(0);
  });
});

// 其他信息
router.get('/Trailingend/Core.ashx', async (req, res) => {
  let date = new Date();
  // 添加一个 unhandledRejection 事件监听，构建任务中html解析错误出现 Unhandled Rejection 时，直接退出
  // process.on('unhandledRejection', error => {
  //     console.error('unhandledRejection', error);
  //     process.exit(1) // To exit with a 'failure' code
  // });
  await axios.all([
    // 累计用电金额
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetUseEnergyData', {
      "GROUP_SLT_ID": group_slt_id, //从档案信息中获取
      "TIME": date.getFullYear(),//2019，2019-07，2019-07-30
      "TYPE": "Y",//Y:年，M:月，D:日
    }),
    // 累计用水
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetWUseEnergyData', {
      "GROUP_SLT_ID": group_slt_id, //从档案信息中获取
      "TIME": date.getFullYear(),//2019，2019-07，2019-07-30
      "TYPE": "Y",//Y:年，M:月，D:日
    }),

    // 项目统计 --- 网关
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetDeviceInfo', {
      "IS_ADMIN": "1",//0:是，1：否 这个输入1 
      "GROUP_SLT_ID": group_slt_id, //档案中获取
    }),
    // 项目统计 --- 用户
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=QuerySubPermissionInfo', {
      "DEFAULT_SLT_ID": "14", // 登录返回的结果中获取
      "IS_SUB_ADMIN": "1" // 默认1
    }),
    // 项目统计 --- 电表
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetHomeInfoByPro', {
      "GROUP_SLT_ID": group_slt_id,
      "MENUS_TYPE": "0"
    }),
    // 项目统计 --- 水表
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetHomeInfoByPro', {
      "GROUP_SLT_ID": group_slt_id,
      "MENUS_TYPE": "1"
    }),

    // 交易渠道分布
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetAllRevenueData', {
      "TID": t_id, //从档案信息中获取
      "TIME": date.getFullYear(),//2019，2019-07，2019-07-30
      "TYPE": "Y",//Y:年，M:月，D:日
      "MENUS_TYPE": "" //0：电 1：水
    }),

    // 抄表成功率 --- 电
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetEReadSuccessRate', {
      "TID": t_id,//终端编号用|分隔档案中获取
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2),//时间 如：2019-08-01
      "TYPE": "D",//
      "MENUS_TYPE": "0"//0：电 1：水
    }),
    // 抄表成功率 --- 水
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetEReadSuccessRate', {
      "TID": t_id,//终端编号用|分隔档案中获取
      "TIME": date.getFullYear() + '-' + G.prefixInteger((date.getMonth() + 1), 2) + '-' + G.prefixInteger(date.getDate() - 1, 2),//时间 如：2019-08-01
      "TYPE": "D",//
      "MENUS_TYPE": "1"//0：电 1：水
    }),

    // 实时告警
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetReportInfoByPermission', {
      "GROUP_SLT_ID": group_slt_id
    }),

  ]).then(axios.spread((
    electricity, waterMoney,
    gateway, user, elecMeter, waterMeter,
    payType,
    elecSuccessRate, waterSuccessRate,
    realTimeAlarm, ) => {

    // 累计用电/水金额
    let electricityData = 0;
    let waterMoneyData = 0;
    electricity.data.forEach(data => {
      if (data.SUM_AMOUNT !== 0) {
        electricityData = data.SUM_AMOUNT / 10000;
      }
    });
    waterMoney.data.forEach(data => {
      if (data.SUM_AMOUNT !== 0) {
        waterMoneyData = data.SUM_AMOUNT / 10000;
      }
    })

    // 网关数量
    // 网关编号，操作以"|"分隔的字符串，并通过数组合并，返回网关数量，
    let arr1 = [];
    let arr2 = [];
    let offlineterStr = gateway.data.OFFLINETER;
    let onlineterStr = gateway.data.ONLINETER;
    arr1 = offlineterStr.split("|");
    arr2 = onlineterStr.split("|");
    arr1.push.apply(arr1, arr2);
    let gatewayData = arr1.length;
    // 用户数量
    let userData = user.data.length + 1;
    // 电表数量
    let elecMeterData = elecMeter.data.METERNUM;
    // 水表数量
    let waterMeterData = waterMeter.data.METERNUM;

    // 充值类型分布
    let aliPay = 0,
      wechatPay = 0,
      cashPay = 0;
    for (let i = 0; i < payType.data.length; i++) {
      aliPay += parseInt(payType.data[i].ALIPAY);
      wechatPay += parseInt(payType.data[i].WECHAT);
      cashPay += parseInt(payType.data[i].WEB);
    }
    let sumPay = aliPay + wechatPay + cashPay;
    let payRateData = [(aliPay * 100 / sumPay).toFixed(2),
    (wechatPay * 100 / sumPay).toFixed(2),
    (cashPay * 100 / sumPay).toFixed(2)];

    // 抄表成功率
    let elecSuccessRateData = 0;
    let elecTime = 0;
    for (let i = 0; i < elecSuccessRate.data.length; i++) {
      if (elecSuccessRate.data[i].METER_RATE === '--') {
        continue;
      } else {
        elecSuccessRateData += Number(elecSuccessRate.data[i].METER_RATE.replace("%", ""));
        elecTime++;
      }
    }
    let waterSuccessRateData = 0;
    let waterTime = 0;
    for (let i = 0; i < waterSuccessRate.data.length; i++) {
      if (waterSuccessRate.data[i].METER_RATE === '--') {
        continue;
      } else {
        waterSuccessRateData += Number(waterSuccessRate.data[i].METER_RATE.replace("%", ""));
        waterTime++;
      }
    }
    let successRateData = ((elecSuccessRateData / elecTime + waterSuccessRateData / waterTime) / 2).toFixed(2) + '%';
    // let successRateData = '100%';

    // 实时告警
    let realTimeAlarmArr = realTimeAlarm.data;
    let realTimeAlarmData = [];
    let msg = [];
    if (realTimeAlarmArr.length > 1) {
      // console.log(realTimeAlarmArr);
      for (let i = 0; i <= realTimeAlarmArr.length - 1; i++) {
        let msg = "";
        // 正则表达式去掉字符串里面的 \
        msg = realTimeAlarmArr[i].MSG.replace(/\\/g, '');
        // console.log(msg);
        realTimeAlarmData.push(msg);
      }
    }
    else {
      console.log('no data!');
    }

    res.send([
      electricityData, waterMoneyData,
      gatewayData, userData, elecMeterData, waterMeterData,
      payRateData,
      successRateData,
      realTimeAlarmData,]);
  })).catch(e => {
    console.log(e);
    res.send(0);
  });
})


module.exports = router