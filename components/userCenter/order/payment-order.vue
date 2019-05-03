<template>
    <div>
      <div class="approvalStatus-company" v-if="approvalStatus!==4">
        <div>
          企业信息未完善
        </div>
      </div>
      <div v-else>
        <center-search @changeSearch="changeSearch"/>
        <payment-table  :orderLists="orderList" />
        <center-pagination
          @changePage="changePage"
          :orderPagination="orderPagination" />
      </div>

    </div>
</template>

<script>
  import paymentTable from './payment-table.vue'
  import centerSearch from './center-search.vue'
  import centerPagination from './center-pagination'
  export default {
    name: 'payment-order',
    components:{
      paymentTable,
      centerSearch,
      centerPagination
    },
    props:{
      approvalStatus:{
        type:Number,
        default:0
      }
    },
    data(){
      return{
        orderList:[],
        orderPagination:{},
        defParam:{
          mallOrderCode:'',
          state:2,
          startTime:"",
          endTime:'',
          pageNo:1,
          pageSize:5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
      }
    },
    mounted(){
      this.getOrderList(this.defParam)
    },
    methods:{
      changePage(page){
        this.defParam={
          mallOrderCode:'',
          state:2,
          startTime:'',
          endTime:'',
          pageNo:page,
          pageSize:5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      changeSearch(orderNumber, startTime, endTime) {
        this.defParam = {
          mallOrderCode: orderNumber,
          state: 2,
          startTime: startTime,
          endTime: endTime,
          pageNo: 1,
          pageSize: 5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      async getOrderList(param) {
        let list= await this.$store.dispatch('FETCH_ORDER_LIST', {
          param:param
        })
        if(list){
          this.orderList=list.data
          this.orderPagination=list
        }
      }
    }
  }
</script>

<style  scoped>

</style>
