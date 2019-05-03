<template>
  <div class="shop-order">
    <div class="shop-order-top">
      <div class="recipientAddress">收货人地址</div>
      <div class="address" @click="goToAddress">管理收货人地址</div>
    </div>
    <div class="shop-order-middle">
      <div class="order-middle-address"
           :class="{activeAddress:key==ins}"
           v-for="(item,key) in addressList"
           :key="key"
          @click="setAddress(item.id,key)"
      >
        <div class="name">{{item.receiver}}</div>
        <div class="phone">{{item.receiverMobilephone}}</div>
        <div class="province">{{item.receivedArea|clearUnderline}}</div>
        <div class="street">{{item.address|setString(80)}}
        </div>
        <div class="check" v-if="key==ins">
          <i class="el-icon-check"></i>
        </div>
      </div>
      <div class="addAddress" @click="addAddress">
        <add-address @refreshAddress="refreshAddress" />
      </div>
    </div>
  </div>
</template>

<script>
  import addAddress from './add-address.vue'

  export default {
    name: 'recipient-address',
    components: {
      addAddress
    },
    data() {
      return {
        addAddressVisible: false,
        agentCode: JSON.parse(this.$cookie.get('userInfo')).id,
        ins:0,
      }
    },
    props:{
      addressList:{
        type:Array,
        default:()=>[]
      }
    },
    methods: {
      addAddress() {
        this.addAddressVisible = true
      },
      closeAdd() {
        this.addAddressVisible = false
      },
      submitAdd() {
        this.addAddressVisible = true
      },
      refreshAddress(code){
        this.$emit('refreshAddressList',code)
      },
      goToAddress(){
        this.$router.push(`/center?center=address&agentCode=${this.agentCode}`)
      },
      setAddress(addressId,key){
        this.ins=key
        this.$emit('setAddress',addressId)
      }
    }
  }
</script>

<style lang="less" scoped>
  .shop-order {
    .shop-order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #6f7180;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #d2d2d2;

      .address {
        color: #3a8ee6;
        cursor: pointer;
      }
    }

    .shop-order-middle {
      margin-top: 30px;
      display: flex;
      flex-flow: wrap;
      margin-bottom: 20px;
      .activeAddress {
        border: 1px dashed #f42424 !important;
      }

      .order-middle-address {
        width: 280px;
        height: 200px;
        border: 1px dashed #d2d2d2;
        font-size: 14px;
        padding: 20px;
        color: #6f7180;
        position: relative;
        margin: 0px  20px 20px 0;

        .name {
          line-height: 35px;
        }

        .phone {
          line-height: 35px;
        }

        .province {
          line-height: 35px;
        }

        .street {
          width: 250px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .check {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 20px;
          height: 20px;

          i {
            color: #f42424;
            font-size: 20px;
          }
        }

      }

      .addAddress {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        width: 280px;
        height: 200px;
        border: 1px dashed #d2d2d2;
        font-size: 14px;
        padding: 20px;
        color: #6f7180;
        cursor: pointer;
      }
    }
  }
</style>
