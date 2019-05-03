<template>
  <div class="footer_erwei">
    <div class="top">
      <div class="erwei">
        <img src="~assets/img/WechatIMG1.png" alt="">
        <span>红星美凯龙品牌官方订阅号</span>
      </div>
      <div class="erwei dingyue">
        <img src="~assets/img/WechatIMG2.png" alt="">
        <span>红星美凯龙第二开发商订阅号</span>
      </div>
      <div class="erwei">
        <img src="~assets/img/liulian.jpg" alt="">
        <span>家居绿链</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer-erwei'
  }
</script>

<style lang="less" scoped>
  .footer_erwei {
    width: 100%;
    height: 241px;
    background:rgba(231,233,237,1);

    .top {
      width: 1200px;
      margin: 0 auto;
      height: 241px;
      display: flex;
      align-items: center;
      justify-content: center;
      .dingyue{
        margin: 0 60px;
      }
      .erwei {
        display: flex;
        flex-flow: column;
        align-items: center;
        img{
          width: 136px;
          height: 136px;
          margin-bottom: 24px;
        }

        span{
          font-size: 14px;
          text-align: center;
        }
      }
    }

  }

</style>
