<template>
    <div>
      <div class="approvalStatus-company" v-if="approvalStatus!==4">
        <div>
          企业信息未完善
        </div>
      </div>
      <div v-else>
        <center-search @changeSearch="changeSearch"/>
        <all-table
          :orderLists="orderList"
          @RefreshChange="RefreshChange"
          @RefreshAddProduct="RefreshAddProduct"
        />
        <center-pagination
          @changePage="changePage"
          :orderPagination="orderPagination" />
      </div>
    </div>
</template>

<script>
  import allTable from './all-table.vue'
  import centerSearch from './all-search.vue'
  import centerPagination from '../center-pagination'
  export default {
    name: 'all-order',
    components:{
      allTable,
      centerSearch,
      centerPagination
    },
    data(){
      return{
        orderList:[],
        orderPagination:{},
        defParam:{
          mallOrderCode:'',
          state:'',
          startTime:"",
          endTime:'',
          pageNo:1,
          pageSize:6,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
      }
    },
    props:{
      approvalStatus:{
        type:Number,
        default:0
      }
    },
    mounted(){
      this.getOrderList(this.defParam)
    },
    methods:{

      changePage(page){
        this.defParam={
          mallOrderCode:'',
          state:'',
          startTime:'',
          endTime:'',
          pageNo:page,
          pageSize:6,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      changeSearch(orderNumber,orderStatus,startTime, endTime){
        this.defParam={
          mallOrderCode:orderNumber,
          state:orderStatus,
          startTime:startTime,
          endTime:endTime,
          pageNo:1,
          pageSize:6,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      RefreshChange(){
        this.getOrderList(this.defParam)
      },
      RefreshAddProduct(){
        this.getOrderList(this.defParam)
      },
      async getOrderList(param) {
       let list= await this.$store.dispatch('FETCH_ORDER_LIST', {
         param:param
        })
        if( list.data){
          list.data.map(item=>{
            if(item.state===0){
              item.isDisable=false
            }else {
              item.isDisable=true
            }
          })
          this.orderList=list.data
          this.orderPagination=list
        }else {
          this.$message({
            message: '网络错误，请稍后重试',
            type: 'warning'
          })
        }

      },
    }
  }
</script>

<style scoped>

</style>
