<template>
  <div class="side">
    <div class="personalCenter" @click="goToCenter">
      <div class="icon "></div>
      <span class="shuli" >个 人 中 心</span>
    </div>
    <div class="shoppingCar" @click="goToShopCart">
      <div class="icon "></div>
      <span class="shuli" >采 购 清 单</span>
    </div>
    <div class="top" @click="goToTop()">
      <div class="icon "></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'details-sidebar',
    methods:{
      goToCenter(){
        const userInfo = JSON.parse(this.$cookie.get('userInfo'))
        if(userInfo && userInfo.id){
          this.$router.push(`/center?center=all`)
        }else {
          this.$router.push(`/login`)
        }

      },
      goToShopCart(){
        const accountAuditStatus = JSON.parse(this.$cookie.get('accountAuditStatus'))
        if( accountAuditStatus && accountAuditStatus.detailAuditStatus !== 4){
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

            if (accountAuditStatus !== 4) {
              // 账号信息没有审核通过
              this.$message({
                message: '账号信息没有审核通过',
                type: 'warning'
              });
            } else if (detailAuditStatus!== 4) {
              // 企业信息处于待审核状态，代理商需要去完善信息
              this.$confirm('企业信息未完善,请去完善企业信息', '提示', {
                confirmButtonText: '去完善',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(() => {
                  this.$router.replace(
                    `/center?center=info&agentCode=${
                      accountAuditStatus.agentCode
                      }`
                  )
                })
                .catch(() => {
                  console.log(999)
                })
            } else {
              console.log(999)
            }


          })

        }else if(accountAuditStatus && accountAuditStatus.detailAuditStatus === 4) {
          this.$router.push(`/cart?type=1`)

        }else {
          this.$router.push(`/login`)
        }

      },
      goToTop(){
        const timer=setInterval(function () {
          let top=document.body.scrollTop||
            document.documentElement.scrollTop;
          if(top===0){
            clearInterval(timer)
          }
          let subtop=top/5;
          document.body.scrollTop=document.documentElement.scrollTop=top-subtop
        },20)
      }
    }
  }
</script>

<style lang="less" scoped>
  .side{
    height: 100vh;
    z-index: 10;
    width: 38px;
    background-color: #474d57;
    position: fixed;
    right: 0;
    top: 0;
    .personalCenter{
      width:20px;
      margin:0 auto;
      margin-top: 18vh;
      text-align: center;
      cursor: pointer;
      color:#fff;
      .icon{
        width:20px;
        height:20px;
        background: url("../../assets/img/goods/headerImg.png") no-repeat center;
        background-size: 100%;
      }
    }
    .shoppingCar{
      width:20px;
      margin:0 auto;
      margin-top: 35px;
      text-align: center;
      cursor: pointer;
      color:#fff;
      .icon{
        width:20px;
        height:20px;
        background: url("../../assets/img/goods/shopping.png") no-repeat center;
        background-size: 100%;
      }
    }
    .top{
      width:20px;
      margin:0 auto;
      margin-top: 35px;
      text-align: center;
      cursor: pointer;
      color:#fff;
      .icon{
        width:20px;
        height:20px;
        background: url("../../assets/img/goods/top02.png") no-repeat center;
        background-size: 100%;
      }
    }
  }
</style>
