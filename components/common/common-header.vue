<template>
  <div class="header">
    <div class="head">
      <div class="header-left">
        <img @click="toHome" src="~assets/img/logo.png" alt>
        <div>
          <span>采购云平台</span>
        </div>
      </div>
      <div class="header-right">
        <div class="userCenter" @click="goToCenter">个人中心</div>
        <div class="shopCar" @click="goToShopCart">
          <img src="~assets/img/shoppCar.png" alt>
          <span>({{shopNum}})</span>
        </div>
        <div class="login" v-if="isShowLogin" @click="login()">登录</div>
        <div class="login" v-if="isShowUserName" @mouseenter="isLogin" @mouseleave="isLogin">
          {{userName}}
          <div class="outLogin" v-if="isOutLogin">
            <div @click="modifyPassword">修改密码</div>
            <div @click="outLogin()">退出登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-header',
  data() {
    return {
      search: '',
      userName: '',
      isShowLogin: true,
      isShowUserName: true,
      isOutLogin: false,
      // shopNum: 0,
      userInfo: {}
    }
  },
  props:{
    shopNum:{
      type:Number,
      default:0,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const userInfo = JSON.parse(this.$cookie.get('userInfo'))
      console.log(userInfo,"userinf")
      if (userInfo && userInfo.id) {
        this.userInfo = userInfo
        this.userName = '您好，' + userInfo.name
        this.isShowUserName = true
        this.isShowLogin = false
      } else {
        this.isShowLogin = true
        this.isShowUserName = false
      }
    },
    login() {
      this.$router.push(`/login`)
    },
    outLogin() {
      this.$store.commit('CLEAR_USERINFO')
      this.$cookie.delete('accountAuditStatus')
      this.$cookie.delete('userInfo')
      this.$cookie.delete('cartNum')
      this.$router.push(`/login`)
      this.isShowUserName = false
      this.isShowLogin = true
    },
    modifyPassword(){
      this.$router.push(`/modifypassword`)
    },
    isLogin() {
      this.isOutLogin = !this.isOutLogin
    },
    goToCenter() {
      if (this.userInfo.id) {
        this.$router.push(`/center?center=all`)
      } else {
        this.$router.push(`/login`)
      }
    },
    goToShopCart() {
      if (this.userInfo.id) {
        this.$router.push(`/cart?type=1`)
      } else {
        this.$router.push(`/login`)
      }
    },
    toHome() {
      this.$router.push(`/`)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  background: url(~assets/img/header_bj.jpg) repeat-y;
  background-size: 100%;
  height: 67px;
  line-height: 67px;
  width: 100%;
  z-index: 30;
  position: relative;
  .head {
    width: 98%;
    display: flex;
    justify-content: space-between;
    margin: 0 1%;
    .header-left {
      display: flex;
      align-items: center;
      color: #fff;
      img {
        margin-right: 14px;
        width: 120px;
        cursor: pointer;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .search {
        margin: 0 16px;
      }
      .login {
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        .outLogin {
          position: absolute;
          top: 60px;
          left: -25px;
          z-index: 333;
          background: #000000;
          height: 80px;
          /*height: 40px;*/
          width: 100px;
          line-height: 40px;
          text-align: center;
        }
      }
      .shopCar {
        margin: 0 16px;
        cursor: pointer;
        img {
          width: 16px;
          vertical-align: sub;
        }
        span {
          color: #fff;
          font-size: 14px;
        }
      }
      .userCenter {
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
