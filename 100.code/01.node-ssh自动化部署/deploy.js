const chalk = require('chalk') //命令行颜色
const ora = require('ora') // 加载流程动画
const spinner_style = require('./ftp/spinner_style') //加载动画样式
const node_ssh = require('node-ssh') // ssh连接服务器
const inquirer = require('inquirer') //命令行交互
const path = require('path') // nodejs内置路径模块
const CONFIG = require('./ftp/config') // 配置

const SSH = new node_ssh();
let config; // 用于保存 inquirer 命令行交互后选择正式|测试版的配置

//logs
const defaultLog = log => console.log(chalk.blue(`---------------- ${log} ----------------`));
const errorLog = log => console.log(chalk.red(`---------------- ${log} ----------------`));
const successLog = log => console.log(chalk.green(`---------------- ${log} ----------------`));

//连接服务器
const connectSSH = async ()=>{
  const loading = ora( defaultLog('正在连接服务器') ).start();
  loading.spinner = spinner_style.arrow4;
  try {
    await SSH.connect({
      host: config.SERVER_PATH,
      username: config.SSH_USER,
      // privateKey: config.PRIVATE_KEY, //秘钥登录(推荐) 方式一
      password: config.PASSWORD // 密码登录 方式二
    });
    successLog('SSH连接成功!'); 
  } catch (error) {
    errorLog(error);
    errorLog('SSH连接失败!');
    process.exit(); //退出流程
  }
  loading.stop();
}


//传送zip文件到服务器
const uploadZipBySSH = async () =>{
  //连接ssh
  await connectSSH();
  const loading = ora( defaultLog('准备上传文件') ).start();
  loading.spinner = spinner_style.arrow4;
  try {
    const failed = []
    const successful = []
    await SSH.putDirectory('D:/softWare/03_study/12.nodejs/06.ftp.03/dist', 'D:/Platform/VueTrailingEnd/Content', {
      recursive: true,
      concurrency: 50,
      validate: function(itemPath) {
        const baseName = path.basename(itemPath)
        return baseName.substr(0, 1) !== '.' && // do not allow dot files
               baseName !== 'node_modules' // do not allow node_modules
      },
      tick: function(localPath, remotePath, error) {
        if (error) {
          failed.push(localPath)
        } else {
          successful.push(localPath)
        }
      }
    }).then(function(status) {
      successLog('文件上传' +  status ? '成功' : '失败')

      if (failed.length > 0) {
        defaultLog('成功目录');
        for (let i = 0; i < failed.length; i++) {
          console.log(failed[i])
        }
      }

      if (successful.length > 0) {
        defaultLog('成功目录');
        for (let i = 0; i < successful.length; i++) {
          console.log(successful[i])
        }
      }
      
      SSH.dispose(); //断开连接
    })
  } catch (error) {
    errorLog(error);
    errorLog('上传失败!');
    process.exit(); //退出流程
  }
  loading.stop();
}



//------------发布程序---------------
const runUploadTask = async () => {
  console.log(chalk.yellow(`--------->  欢迎使用 web 自动部署工具  <---------`));
  //连接服务器上传文件
  await uploadZipBySSH(); 
  successLog('大吉大利, 部署成功!'); 
  process.exit();
}

// 开始前的配置检查
/**
 * 
 * @param {Object} conf 配置对象
 */
const checkConfig = (conf) =>{
  const checkArr = Object.entries(conf);
  checkArr.map(it=>{
    const key = it[0];
    if(key === 'PATH' && conf[key] === '/') { //上传zip前会清空目标目录内所有文件
      errorLog('PATH 不能是服务器根目录!'); 
      process.exit(); //退出流程
    }
    if(!conf[key]) {
      errorLog(`配置项 ${key} 不能为空`); 
      process.exit(); //退出流程
    }
  })
}

// 执行交互后 启动发布程序
inquirer
  .prompt([{
    type: 'list',
    message: '请选择发布环境',
    name: 'env',
    choices: [{
      name: '测试环境',
      value: 'development'
    },{
      name: '正式环境',
      value: 'production'
    }]
  }])
  .then(answers => {
    config = CONFIG[answers.env];
    checkConfig(config); // 检查
    runUploadTask(); // 发布
  });