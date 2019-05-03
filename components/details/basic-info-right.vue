<template>
  <div class="fl product-label">
    <div class="label-top">
      <p class="goods-name">
        <span>{{productBasicResult.productName | setString(30)}}</span>
      </p>
      <div class="price-wrapper">
        <div style="line-height: 28px;">
          <span class="price-title">售价：</span>
          <span v-if="!isLogin ||approvalStatus.detailAuditStatus!==4" class="price-count">￥- -</span>
          <span
            v-if="isLogin && approvalStatus.detailAuditStatus===4"
            class="price-count">
            ￥{{productPriceResult.agentPrice| formatDouble}}
          </span>
          <span v-if="!isLogin">
            （
            <a :href="`/login`" class="price-login">登录</a>
            ）后可看价格
          </span>
          <span
            v-else-if="approvalStatus.detailAuditStatus!==4 &&isLogin">
          （
          <a :href=" `/center?center=info&agentCode=${approvalStatus.agentCode}`"
             class="price-login">企业信息审核通过</a>
          ）后可看价格
          </span>
        </div>
        <p>
          <span class="price-title">计价单位：</span>
          <span>{{productBasicResult.valuationUnits }}</span>
        </p>
      </div>
      <ul class="else">
        <li>
          <p class="else-title">发货周期：</p>
          <p class="else-info">
            <span>{{productBasicResult.deliveryCycle}}</span>
            <span>天</span>
          </p>
        </li>
        <li>
          <p class="else-title">最低采购量：</p>
          <p class="else-info">
            <span>{{productBasicResult.minPurchaseQuantity}}</span>
            <span>{{productBasicResult.valuationUnits}}</span>
          </p>
        </li>
        <li>
          <p class="else-title">数量：</p>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
        </li>
        <li>
          <p class="else-title">规格：</p>
          <p class="else-info">
            <span>{{productBasicResult.productSpecification}}</span>
          </p>
        </li>
      </ul>
      <div class="buy">
        <div v-if="isLogin" class="btn" @click="addToCat">
          <span>添加到购物车</span>
        </div>
        <div v-else class="btn">
          <a :href="`/login`">
            <span>先登录再采购</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basic-info-right',
    data() {
      return {
        isLogin: false,
        num: 1,
        approvalStatus: {
          detailAuditStatus: 0
        }
      }
    },
    props: {
      productBasicResult: {
        type: Object,
        default: () => {
        }
      },
      productPriceResult: {
        type: Object,
        default: () => {
        }
      },
      productFirstPicture: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const userInfo = JSON.parse(this.$cookie.get('userInfo'))
        const accountAuditStatus = JSON.parse(this.$cookie.get('accountAuditStatus'))
        this.approvalStatus = accountAuditStatus
        if (userInfo) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
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
      },
      addToCat() {
        const accountAuditStatus = JSON.parse(this.$cookie.get('accountAuditStatus'))
        if (accountAuditStatus && accountAuditStatus.detailAuditStatus !== 4) {
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
              console.log('请完善信息')
            })
        } else {
          this.addShoppingCart()



        }

      },
      async addShoppingCart() {
        let add = await this.$store.dispatch('FETCH_ADD_SHOPPING_CART', {
          productCode: this.productBasicResult.productCode,
          productName: this.productBasicResult.productName,
          supCode: this.productBasicResult.supCode,
          quantity: this.num,
          perPrice: '',
          productImg: this.productFirstPicture,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if (add.code === 200) {
          this.$message({
            message: '恭喜您添加成功',
            type: 'success'
          })
          this.$confirm(
            '<div style="color:red;font-size:20px;text-align: center;font-weight: bold;height:60px">宝贝已成功添加到购物车！</div>',
            '提示',
            {
              distinguishCancelAndClose: true,
              dangerouslyUseHTMLString: true,
              confirmButtonText: '去下单',
              cancelButtonText: '继续购物'
            }
          )
            .then(() => {
              this.$router.push(`/cart?type=1`)
            })
            .catch(action => {
            })
        } else if(add.code===10003) {
          this.$message({
            message: '该产品有误',
            type: 'warning'
          })
        }else {
          this.$message({
            message: '网络错误，添加失败',
            type: 'error'
          })
        }
      },
      handleChange(value) {
        this.num = value
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-label {
    float: left;
    margin-left: 30px;
    width: 700px;

    .label-top {
      .goods-name {
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
        color: #222;
        min-height: 19px;
      }

      .price-wrapper {
        font-size: 12px;
        padding: 14px 16px;
        margin-top: 28px;
        color: #6b6a72;
        background-color: #f2f3f4;

        .price-title {
          display: inline-block;
          width: 90px;
          font-size: 12px;
          color: #a1a7ae;
        }

        .price-count {
          color: red;
        }

        .price-login {
          color: #3bbae6;
          text-decoration: none;
        }
      }

      .else {
        font-size: 12px;
        padding: 14px 16px;
        margin-top: 10px;

        li {
          margin-bottom: 20px;

          .else-title {
            display: inline-block;
            width: 90px;
          }

          .else-info {
            display: inline-block;
            background-color: #f5f5f5;
            border: 1px solid #dfdfdf;
            display: -moz-inline-stack;
            display: inline-block;
            vertical-align: middle;
            zoom: 1;
            margin-right: 0;
            margin-bottom: 5px;
            padding: 5px 15px;
            color: #24344e;
            line-height: 14px;
            font-size: 12px;
            position: relative;
          }
        }
      }

      .buy {
        margin-left: 70px;
        margin-top: 20px;

        .btn {
          border-radius: 30px;
          padding-left: 70px;
          padding-right: 70px;
          display: inline-block;
          line-height: 40px;
          height: 40px;
          white-space: nowrap;
          cursor: pointer;
          background-color: #3bbae6;
          border-color: #3bbae6;

          &:hover {
            background: #62c8eb;
            border-color: #62c8eb;
          }

          span {
            display: inline-block;
            color: #fff;
          }
        }
      }
    }
  }
</style>
