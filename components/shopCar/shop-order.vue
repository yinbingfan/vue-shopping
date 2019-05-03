<template>
  <div>
    <recipient-address
      :addressList="addressList"
      @refreshAddressList="refreshAddressList"
      @setAddress="setAddress"
    />
    <shop-info
      :orderList="orderList"
      :orderData="orderData"
      @submitOrder="submitOrder" />
  </div>
</template>

<script>
  import shopInfo from './shop-info.vue'
  import recipientAddress from './recipient-address.vue'
  export default {
    name: 'shop-order',
    props:{
      orderList:{
        type:Object,
        default:()=>{}
      },
      orderData:{
        type:Object,
        default:()=>{}
      },
      addressList:{
        type:Array,
        default:()=>[]
      }
    },
    components:{
      recipientAddress,
      shopInfo
    },
    methods:{
      submitOrder(){
        this.$emit('submitOrder')
      },
      refreshAddressList(code){
        this.$emit('refreshAddressList',code)
      },
      setAddress(addressId){
        this.$emit('setAddress',addressId)
      }

    }
  }
</script>

<style lang="less" scoped>

</style>
