<template>
  <div>
    <div class="approvalStatus-company" v-if="approvalStatus!==4">
      <div>
        企业信息未完善
      </div>
    </div>
    <div class="receipt-address" v-else>
      <h2>收货地址</h2>
      <address-info
        @refreshAddressList="refreshAddressList"
        @refreshDelAddress="refreshDelAddress"
        @refreshModifyAddress="refreshModifyAddress"
        @refreshSetAddress="refreshSetAddress"
        :addressList="addressList" />
    </div>
  </div>
</template>

<script>
import addressInfo from './address-info'
  export default {
    name: 'receipt-address',
    components:{
      addressInfo
    },
    data(){
      return{
        addressList:[]
      }
    },
    mounted(){
      this.getAddressList()
    },
    props:{
      approvalStatus:{
        type:Number,
        default:0
      }
    },
    methods:{
      // FETCH_ADDRESS_LIST
      //isDef 1为默认地址
      async getAddressList(){
        let addressList= await this.$store.dispatch('FETCH_ADDRESS_LIST', {
          agentCode:JSON.parse(this.$cookie.get('userInfo')).id
        })
        this.addressList=addressList.dataMap
      },
      refreshAddressList(code){
        if(code===200){
          this.getAddressList()
        }
      },
      refreshDelAddress(code){
        if(code===200){
          this.getAddressList()
        }
      },
      refreshModifyAddress(code){
        if(code===200){
          this.getAddressList()
        }
      },
      refreshSetAddress(code){
        if(code===200){
          this.getAddressList()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.receipt-address{
  h2{
    line-height: 48px;
    font-size: 14px;
    color: #888888;
  }
}
</style>
