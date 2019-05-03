<template>
  <div class="center-list">
    <el-breadcrumb separator="/" class="el-breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/' }">采购云平台</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadcrumbName | breadName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="center-content">
      <user-side/>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <center-tags/>
        <div class="content">
          <all-order v-if="breadcrumbName==='all'" :approvalStatus="approvalStatus"/>
          <payment-order v-if="breadcrumbName==='payment'" :approvalStatus="approvalStatus"/>
          <reward-order v-if="breadcrumbName==='reward'" :approvalStatus="approvalStatus"/>
          <submit-order v-if="breadcrumbName==='submit'" :approvalStatus="approvalStatus"/>
          <confirm-order v-if="breadcrumbName==='confirm'" :approvalStatus="approvalStatus"/>
          <completed-order v-if="breadcrumbName==='completed'" :approvalStatus="approvalStatus"/>
          <company-info v-if="breadcrumbName==='info'"/>
          <receipt-address v-if="breadcrumbName==='address'" :approvalStatus="approvalStatus"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import centerTags from './centerTags.vue'
  import userSide from './user-side.vue'
  import allOrder from './order/all/all-order.vue'
  import paymentOrder from './order/payment-order.vue'
  import rewardOrder from './order/reward/reward-order.vue'
  import confirmOrder from './order/confirm-order.vue'
  import submitOrder from './order/submit/submit-order.vue'
  import completedOrder from './order/completed-order.vue'
  import companyInfo from './company/company-info'
  import receiptAddress from './company/receipt-address.vue'
  import bus from '../../assets/js/bus'

  export default {
    data() {
      return {
        tagsList: [],
        collapse: false,
        breadcrumbName: this.$route.query.center,
        approvalStatus: 0
      }
    },
    watch: {
      $route(to, from) {
        this.breadcrumbName = to.query.center
      }
    },
    components: {
      centerTags,
      userSide,
      allOrder,
      paymentOrder,
      rewardOrder,
      submitOrder,
      confirmOrder,
      completedOrder,
      companyInfo,
      receiptAddress
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const accountAuditStatus = JSON.parse(this.$cookie.get('accountAuditStatus'))
        this.approvalStatus = accountAuditStatus.detailAuditStatus
        if (accountAuditStatus && accountAuditStatus.detailAuditStatus !== 4) {
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
        }
      }
    },
    created() {
      bus.$on('collapse', msg => {
        this.collapse = msg
      })

      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on('tags', msg => {
        let arr = []
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name)
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .center-list {
    min-height: 750px;
    width: 1200px;
    margin: 0 auto;

    .center-content {
      position: relative;
      margin-top: 20px;
      display: flex;

      .content-box {
        width: 100%;

        .content {
          width: 1060px;
          min-height: 600px;
        }
      }
    }
  }

  .el-breadcrumb-container {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(210, 210, 210, 1);
  }
</style>
