module.exports = {
  dev: {
    MODE: 'development',
    NODE_ENV: 'http://192.168.0.220:90'   //开发服务器地址
  },
  test:{
    MODE: 'test',
    NODE_ENV: 'http://192.168.0.218:81'   //测试服务器地址
  },
  pro: {
    MODE: 'production',
    NODE_ENV: 'http://192.168.0.218:81'  // 正式服务器地址
  }
}
