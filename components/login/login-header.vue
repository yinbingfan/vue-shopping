<template>
  <div class="header">
    <div class="head">
        <div  class="header-left">
          <img @click="toHome" src="~assets/img/logo.png"  alt="">
          <div>
            <span>欢迎登录</span>

          </div>
        </div>
        <div class="header-right"></div>
    </div>
   </div>
</template>

<script>
  export default {
    name: 'login-header',
    methods:{
      toHome(){
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
    .head{
      // width: 1200px;
      display: flex;
      // justify-content: space-between;
      z-index: 30;
      margin: 0 auto;
      .header-left{
        display: flex;
        align-items: center;
        color: #fff;
        margin-left: 24px;
        cursor: pointer;
        img{
          margin-right: 14px;
          width: 120px;
        }
      }
      .header-right{
        display: flex;
        align-items: center;


      }
    }
  }
</style>
