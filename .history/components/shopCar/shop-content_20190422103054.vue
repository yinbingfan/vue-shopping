<template>
  <div class="shop-content">
    <h2 v-if="type==1||type==3">购物车 <span>({{shopNum}})</span></h2>
    <h2 v-if="type==2">结算页</h2>
    <div class="cart-stepflex">
      <div
        class="cart-step-item"
        :class="type==1?'curr':''"
      >
        <span>1.我的购物车</span>
        <img src="~assets/img/ic_arrow - right.png" alt="">
      </div>
      <div
        class="cart-step-item"
        :class="type==2?'curr':''"
      >
        <span>2.填写订单信息</span>
        <img src="~assets/img/ic_arrow - right.png" alt="">
      </div>
      <div
        class="cart-step-item"
        :class="type==3?'curr':''"
      >
        <span>3.下单</span>
      </div>
    </div>
    <div v-if="type==1||type==3">
      <shop-table
        :cartList="cartList"
        @shopOrder="shopOrders"
      />
      <shop-pagination 
      @changePage="changeTablePage"
       :orderPagination="cartList"/>
    </div>
    <div v-if="type==2">
      <shop-order
        :addressList="addressList"
        :orderList="orderList"
        :orderData="orderData"
        @refreshAddressList="refreshAddressList"
        @setAddress="setAddress"
        @submitOrder="submitOrder"/>
      <!-- <shop-pagination @changePage="changeListPage" :cartList="orderData"/> -->
    </div>
  </div>
</template>

<script>
  import shopTable from './shop-table.vue'
  import shopOrder from './shop-order.vue'
  import shopPagination from '../userCenter/order/center-pagination.vue'

  export default {
    name: 'shop-content',
    watch: {
      $route(to) {
        this.type = to.query.type
      }
    },
    data() {
      return {
        curr: 1,
        orderList: {},
        orderData: {},
        addressList: [],
        addressId: 0,
        shoppingCartIds: [],
        type:this.$route.query.type,
        newAddress:''
      }
    },
    props: {
      cartList: {
        type: Object,
        default: () => {
        }
      },
      shopNum:{
        type:Number,
        default:0,
      }
    },
    components: {
      shopTable,
      shopOrder,
      shopPagination
    },
    mounted() {
      this.getAddressList()
    },
    methods: {
      changeTablePage(val) {
        this.$emit('changeTablePage', val)
      },
      changeListPage(val){
        this.$emit('changeListPage', val)
      },
      shopOrders(arr) {
        this.curr = 2
        this.$router.push(`/cart?type=2`)
        this.shoppingCartIds = arr
        this.orderGoTo([...new Set(arr)])
      },

      submitOrder() {
        this.curr = 3
        this.$router.push(`/cart?type=3`)
        if(this.newAddress){
          this.addressId = this.newAddress
        }else {
          this.addressList.map(item => {
            if (item.isdef === 1) {
              this.addressId = item.id
            }
          })
        }

        this.orderSubmit(this.shoppingCartIds, this.addressId)

      },
      setAddress(addressId){
        this.newAddress=addressId
        console.log(this.newAddress)
      },
      async orderSubmit(cartIds, addressId) {
        if(addressId){
          let submit = await this.$store.dispatch('FETCH_ORDER_ADD', {
            shoppingCartIds: cartIds,
            addressId: addressId,
            agentCode: JSON.parse(this.$cookie.get('userInfo')).id
          })
          if (submit.code === 200) {
            this.$alert('下单成功', '', {
              confirmButtonText: '确定'
            })
            this.$router.push(`/center?center=submit`)
          } else {
            this.$alert('网络错误，请稍等', '', {
              confirmButtonText: '确定'
            })
          }
        }else {
          this.$alert('请添加收货地址', '', {
            confirmButtonText: '确定'
          })
        }
      },
      async orderGoTo(ids) {
        let order = await this.$store.dispatch('FETCH_ORDER_TO', {
          shoppingCartIds: ids,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        this.orderList = order.data
        this.orderData = order
      },
      refreshAddressList(code){
        if(code===200){
        this.getAddressList()
        }
      },
      async getAddressList() {
        let addressList = await this.$store.dispatch('FETCH_ADDRESS_LIST', {
          agentCode:JSON.parse(this.$cookie.get('userInfo')).id
        })
        if (addressList.dataMap){
          this.addressList = addressList.dataMap
        }else {
          this.$alert('请添加收货地址', '', {
            confirmButtonText: '确定'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .shop-content {
    min-height: 600px;
    width: 1200px;
    margin: 0 auto;

    h2 {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgba(210, 210, 210, 1);

      span {

      }
    }

    .cart-stepflex {
      overflow: hidden;
      height: 36px;
      display: flex;
      align-items: center;
      margin: 20px 0;

      .cart-step-item {
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          float: left;
          width: 126px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #8c8c8c;
          font-size: 14px;
          border: 1px solid #f8f8f8;
          border-radius: 18px;
        }

        img {
          width: 16px;
          height: 16px;
          margin: 0 20px;
          /*vertical-align: -webkit-baseline-middle;*/
        }
      }

      .curr {
        span {
          background-color: #ff8f23;
          border-color: #ff8f23;
          color: #fff;
        }
      }
    }
  }
</style>
