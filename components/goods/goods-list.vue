<template>
  <div class="goods-list">
    <div class="goods-contents">
      <div class="contents-list"
           v-for="(item,key) in goodsList.data"
           :key="key"
      >
        <a
          :href="`/detail?code=${item.productCode}`" target="_blank"
        >
          <div class="list-img">
            <img class="imgs" :src="item.productPic" alt="">
            <i class="newTag"></i>
          </div>
          <p class="product-price">
            <span
              class="product-price-text"
              v-if="isLogin && approvalStatus.detailAuditStatus==4">
              ¥<span>{{item.agentPrice |formatDouble}}</span>
            </span>
            <span
              class="product-price-text"
              v-else-if="isLogin && approvalStatus.detailAuditStatus!==4">
              企业信息审核中
            </span>
            <span class="product-price-text" v-else>¥ 登入可见</span>
          </p>
          <p class="product-desc">
            <span>{{item.productName |setString(50)}}</span>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goods-list',
    data() {
      return {
        isLogin: false,
        approvalStatus: {
          detailAuditStatus: 0
        }
      }
    },
    props: {
      goodsList: {
        type: Object,
        default: () => {
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const userInfo = JSON.parse(this.$cookie.get('userInfo'))
        const accountAuditStatus = JSON.parse(this.$cookie.get('accountAuditStatus'))
        if (userInfo) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
        console.log('accountAuditStatus',accountAuditStatus)
        if (accountAuditStatus && accountAuditStatus.detailAuditStatus !== 4) {
          let {
            accountStatus,
            detailAuditStatus
          } = accountAuditStatus
          this.approvalStatus = accountAuditStatus
          this.$store.dispatch('agentPass', {
            agentCode: accountAuditStatus.agentCode
          }).then(getData => {
            const agentStatusData = getData.dataMap
            let {
              accountAuditStatus, //代理商审核 0:不通过，
              detailAuditStatus //企业信息审核
            } = agentStatusData
            this.$cookie.set(
              'accountAuditStatus',
              JSON.stringify(agentStatusData)
            )

          })
        }else if(accountAuditStatus){
          this.approvalStatus.detailAuditStatus=4
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-list {
    width: 100%;

    .goods-contents {
      padding: 10px 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      /*justify-content: space-between;*/

      .contents-list {
        display: inline-block;
        width: 24%;
        height: 335px;
        padding: 10px;
        margin: 0 1% 10px 0;
        border: 1px solid #dfdfdf;

        &:hover {
          border: 1px solid #6F6F6F;
        }

        .list-img {
          width: 268px;
          height: 229px;

          .imgs {
            width: 100%;
            height: 100%;
            display: inline;
          }
        }

        .product-price {
          line-height: 16px;
          color: #ff7900;
          font-weight: 700;
          margin: 10px 0;
          font-size: 14px;
          max-width: 110px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .product-desc {
          color: #666;
          line-height: 18px;
          margin: 7px 0 8px;
          font-size: 14px;
        }
      }
    }
  }
</style>
