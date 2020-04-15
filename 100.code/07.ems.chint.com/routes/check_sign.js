var sign = require("./../utils/sign");

// console.log(sign('weixin', 'http://ems.chint.com:3000/api/wechat/check_sign'));
/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/check_sign", function(req, res, next) {
  res.json(sign('weixin', 'http://ems.chint.com:3000/api/wechat/check_sign'));
});

/* GET users listing. */
router.post("/check_sign", function(req, res, next) {
  //   res.json(sign('weixin', 'http://ems.chint.com:3000/api/wechat/check_sign'));
  console.log(res);
});

module.exports = router;
