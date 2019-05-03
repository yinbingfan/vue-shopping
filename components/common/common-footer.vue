<template>
  <div class="footer_final">
    <div class="foot">
      <nuxt-link to="/" class="foot-about">首页</nuxt-link>
      <!--      <nuxt-link to="/" class="foot-about">用户协议</nuxt-link>-->
      <a href="https://zhujianjc.mmall.com/" class="foot-about" target="_blank">关于我们</a>
    </div>
    <div class="footer_bottom_final">
      <div class="left">版权所有：红星美凯龙 住建集采</div>
      <div class="middle"></div>
      <div class="right">沪ICP备12018312号-1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-footer'
}
</script>

<style lang="less" scoped>
.footer_final {
  width: 100%;
  background: #2b2e33;
  .foot {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 15%;
    margin: 0 auto;
    .foot-about {
      font-size: 14px;
      line-height: 38px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
      &:nth-of-type(2) {
        margin: 0 40px;
      }
    }
  }
  .footer_bottom_final {
    display: flex;
    justify-content: center;
    height: 40px;
    margin: 0 auto;
    background: #2b2e33;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 46px;
    .middle {
      width: 60px;
    }
  }
}
</style>
