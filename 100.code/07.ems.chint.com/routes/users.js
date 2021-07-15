var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  /**服务端接收post请求参数的流程
   * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
   *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
   *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
   *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
   * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
   */
  //创建空字符叠加数据片段
  var data = ''

  //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
  req.on('data', function(chunk) {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data += chunk
  })

  // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
  //注册end事件，所有数据接收完成会执行一次该方法
  req.on('end', function() {
    //（1）.对url进行解码（url会对中文进行编码）
    data = decodeURI(data)
    // console.log(data)

    /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

    //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
    //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
    var dataObject = querystring.parse(data)
    console.log(dataObject.name)
  })
  res.send('respond with a resource')
})

module.exports = router
