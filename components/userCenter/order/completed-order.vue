<template>
  <div>
    <div class="approvalStatus-company" v-if="approvalStatus!==4">
      <div>
        企业信息未完善
      </div>
    </div>
    <div v-else>
      <center-search @changeSearch="changeSearch"/>
      <completed-table  :orderLists="orderList"/>
      <center-pagination
        @changePage="changePage"
        :orderPagination="orderPagination" />
    </div>

  </div>
</template>

<script>
  import completedTable from './completed-table.vue'
  import centerSearch from './center-search.vue'
  import centerPagination from './center-pagination'
  export default {
    name: 'completed-order',
    components:{
      completedTable,
      centerSearch,
      centerPagination
    },

    data(){
      return{
        orderList:[],
        orderPagination:{},
        defParam:{
          mallOrderCode:'',
          state:5,
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
    props:{
      approvalStatus:{
        type:Number,
        default:0
      }
    },
    methods:{
      changePage(page){
        this.defParam={
          mallOrderCode:'',
          state:5,
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
          state: 5,
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

<style scoped>

</style>
