import Vue from 'vue'
const moment  = require('moment')

export function formatDate(date) {
  let time = moment(date).format("YYYY-MM-DD  HH:mm")
  return time
}
export function breadName(str) {
  let name = ''
  switch (str) {
    case 'all':
      name = '所有订单'
      break
    case 'submit':
      name = '待提交订单'
      break
    case 'payment':
      name = '待付款订单'
      break
    case 'confirm':
      name = '待确认订单'
      break
    case 'reward':
      name = '待收货订单'
      break
    case 'completed':
      name = '已完成订单'
      break
    case 'info':
      name = '企业信息管理'
      break
    case 'address':
      name = '收货地址管理'
      break

  }
  return name
}
export function setString(str, len) {
  let strlen = 0
  let s = ''
  let count = Math.floor(len / 50)

  try {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) <= 255) {
        if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
          strlen++
        } else if (str.charCodeAt(i) == 32 || str.charCodeAt(i) == 39) {
          strlen++
        } else if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
          strlen++
        } else {
          strlen += 2
        }
      } else {
        strlen += 2
      }
      if (strlen <= len) {
        s += str.charAt(i)
      } else {
        return s + '...'
      }
    }
  } catch (error) {

  }

  return s
}
export function navCategory(val) {
  let name = ''
  switch (val) {
    case '01':
    case '04':
    case '05':
      name = '电器产品'
      break
    case '02':
    case '03':
    case '10':
    case '11':
    case '12':
    case '13':
      name = '装饰材料'
      break
    case '06':
    case '07':
    case '08':
    case '09':
      name = '卫浴五金'
      break
    case '14':
    case '15':
    case '16':
      name = '定制木作'
      break

  }
  return name
}
/* KMB */
export function BinaryProcess(str){
  if(str == '' || str == null) return '--'
  str=Number(str);
  if(0<=str&&str<=999.994){
    // str = str
    str = str.toFixed(2)
  }else if(999.995<=str&&str<=999994) {
    str = (str/1000).toFixed(2)+'K'
  }else if(999995<=str&&str<=999994999){
    str = (str/1000000).toFixed(2)+'M'
  }else if(999995000<=str){
    // str = (str/1000000000).toFixed(2)
    str = formatDouble(str/1000000000) + 'B'
  }
  return str
}

/*千位进制*/
export function formatDouble(value, integer){
  if(!value) return '0.00'
  let num = parseFloat(value);
  num = num.toFixed(2)+"";
  let str = num.split(".")[0];
  let lis = num.split(".")[1];
  let siz = 0;
  let result = "";
  for (let i=str.length-1;i>=0;i--){
    siz++;
    if (siz%3==0){
      siz=0;
      result = ","+str.substr(i,3)+result;
    }
  }

  if (str.length%3 != 0){
    result = str.substr(0,str.length%3)+result;
  }else{
    result = result.substring(1,result.length);
  }
  if(integer) {
    return result
  } else {
    return result+"."+lis;
  }
}

export  function clearUnderline(str) {
  if(!str) return ''
  str = str.replace(/_/g, "");
  return str;
}
export  function agentLevel(val) {
  let name = ''
  switch (val) {
    case 0:
      name = '大客户'
      break
    case 1:
      name = '一级代理商'
      break
    case 2:
      name = '二级代理商'
      break
    case 3:
      name = '三级代理商'
      break
  }
  return name
}
const filters = {
  breadName: breadName,
  setString: setString,
  navCategory:navCategory,
  BinaryProcess:BinaryProcess,
  formatDouble:formatDouble,
  clearUnderline:clearUnderline,
  formatDate:formatDate,
  agentLevel:agentLevel

}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters
