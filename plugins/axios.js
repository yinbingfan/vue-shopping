import axios from "axios";
import { MessageBox } from "element-ui";
// import router from "../../router";
const methods = [
  "get",
  "put",
  "post",
  "head",
  "options",
  "patch",
  "delete"
]

axios.defaults.timeout = 10000;
let baseURL = "";
process.env.NODE_ENV === "development" ? baseURL = "/api" :
  process.env.NODE_ENV === "test" ? baseURL = "http://192.168.0.220:90" :
    process.env.NODE_ENV === "production" ? baseURL = "http://47.102.127.137" :
      baseURL = ""



class Api {
  constructor(opts) {
    this.opts = opts || {
      headers: {}
    }
    methods.forEach(method => {
      this[method] = (path, {
        params,
        data
      } = {}) => new Promise((resolve, reject) => {
        const url = baseURL + path;
        return axios({
          method,
          url,
          params,
          data
        }).then(onfulfilled => {
          resolve({
            data: onfulfilled.data,
            status: onfulfilled.status,
          })
          if (onfulfilled.data && onfulfilled.data.code === -401) {
            MessageBox.alert("登录超时", {
              confirmButtonText: '确定',
              callback: () => {
                // router.replace("/login")
              }
            })

          }
        }).catch(error => {
          reject({
            status: error.response && error.response.status,
            error
          });
          // todo 退出处理有问题，会发一个get请求，
          if (!error.response) {
            // router.replace("/login")
            return;
          }
          switch (error.response && error.response.status) {
            case 404:
              console.log("未找到接口")
              break;
            case 504:
              MessageBox.alert("服务出现问题", {
                confirmButtonText: '确定',
                callback: () => {
                  // router.replace("/login")
                  // sessionStorage.setItem("isLogin", "fasle")
                }
              })
              break;
            default:
              break;
          }
        })
      })
    });
  }
}
const api = new Api({
  headers: {
    Accept: "application/json",
    "content-type": "application/json"
  }
})
export default api;
