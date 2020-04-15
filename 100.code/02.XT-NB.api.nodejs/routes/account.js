const express = require("express");
const router = express.Router();
const querystring = require("querystring"); //导入querystring模块（解析post请求数据）
const axios = require("axios");

const request = require("../utils/request");
const tools = require("../utils/tools");

/* post account listing. */

/**
 * 新增用户档案和表档案
 */
router.post("/addUserInfo", function(req, res, next) {
  // 判断用户是否传入参数
  try {
    if (
      req.body &&
      JSON.stringify(req.body) !== "{}" &&
      req.body.meterAddr.trim() !== ""
    ) {
      const params = req.body;
      // 添加表计
      request({
        url: "?funcname=addUserInfo",
        methods: "post",
        data: {
          SUB_ID: 2043,
          SUB_NAME: "itwebber",
          M_ADDR_CODE: params.meterAddr,
          M_INSTALL_ADDR: params.address,
          USER_NUM: params.userCode,
          USER_NAME: params.userName,
          USER_TEL: params.phone,
          CUE_P_STEP_ID: "",
          CUE_P_TARIFF_ID: "",
          BACKUP_P_STEP_ID: "",
          BACKUP_P_TARIFF_ID: ""
        }
      }).then(
        result => {
          try {
            // 查询表计是否存在档案中
            if (result.data && result.data.CODE === "SUCCESS") {
              res.json({
                resultCode: 0,
                msg: "操作成功"
              });
            } else {
              res.json({
                resultCode: 1,
                msg: result.data.MSG || "用户编号已存在"
              });
            }
          } catch (error) {
            res.json({
              resultCode: 1,
              msg: "接口请求异常,请您稍后尝试"
            });
          }
        },
        error => {
          res.json(error);
        }
      );
    } else {
      res.json({
        resultCode: 1,
        msg: "参数表号不能为空"
      });
    }
  } catch (error) {
    res.json({
      resultCode: 1,
      msg: "接口请求异常,请您稍后尝试"
    });
  }
});

/**
 * 更新用户档案和表档案,
 * 如果表计存在就不添加,如果不存在就直接添加
 */
router.post("/UpdateUserInfo", function(req, res, next) {
  // 判断用户是否传入参数
  try {
    if (
      req.body &&
      JSON.stringify(req.body) !== "{}" &&
      req.body.meterAddr.trim() !== "" &&
      req.body.userCode.trim() !== ""
    ) {
      // 查询表计档案
      request({
        url: "?funcname=GetMeterInfo",
        methods: "post",
        data: { IS_ADMIN: 0, GROUP_SLT_ID: "" }
      }).then(
        result => {
          try {
            // 查询表计是否存在档案中
            if (result.data && result.data.length > 0) {
              let hasMeters = result.data.filter(element => {
                return element.USER_NUM === req.body.userCode;
              });
              // 如果表计存在档案中,进行表计信息的查询
              if (hasMeters && hasMeters.length <= 0) {
                const params = req.body;
                // 添加表计
                request({
                  url: "?funcname=addUserInfo",
                  methods: "post",
                  data: {
                    SUB_ID: 2043,
                    SUB_NAME: "itwebber",
                    M_ADDR_CODE: params.meterAddr,
                    M_INSTALL_ADDR: params.address,
                    USER_NUM: params.userCode,
                    USER_NAME: params.userName,
                    USER_TEL: params.phone,
                    CUE_P_STEP_ID: "",
                    CUE_P_TARIFF_ID: "",
                    BACKUP_P_STEP_ID: "",
                    BACKUP_P_TARIFF_ID: ""
                  }
                }).then(
                  result => {
                    try {
                      // 查询表计是否存在档案中
                      if (result.data && result.data.CODE === "SUCCESS") {
                        res.json({
                          resultCode: 0,
                          msg: "操作成功"
                        });
                      } else {
                        res.json({
                          resultCode: 1,
                          msg: result.data.MSG || "用户编号已存在"
                        });
                      }
                    } catch (error) {
                      res.json({
                        resultCode: 1,
                        msg: "接口请求异常,请您稍后尝试"
                      });
                    }
                  },
                  error => {
                    res.json(error);
                  }
                );
              } else {
                res.json({
                  resultCode: 1,
                  msg: "用户已存在"
                });
              }
            } else {
              res.json({
                resultCode: 1,
                msg: "查询档案失败"
              });
            }
          } catch (error) {
            res.json({
              resultCode: 1,
              msg: "接口请求异常,请您稍后尝试"
            });
          }
        },
        error => {
          res.json(error);
        }
      );
    } else {
      res.json({
        resultCode: 1,
        msg: "参数表号/户号不能为空"
      });
    }
  } catch (error) {
    res.json({
      resultCode: 1,
      msg: "接口请求异常,请您稍后尝试"
    });
  }
});

module.exports = router;
