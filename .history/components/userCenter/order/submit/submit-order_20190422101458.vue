<template>
  <div>
    <div class="approvalStatus-company" v-if="approvalStatus!==4">
      <div>
        企业信息未完善
      </div>
    </div>
    <div v-else>
      <center-search @changeSearch="changeSearch"/>
      <submit-table
        :orderLists="orderList"
        @refreshList="refreshList"
        @refreshDel="refreshDel"
      />
      <center-pagination
        @changePage="changePage"
        :orderPagination="orderPagination" />
    </div>

  </div>
</template>

<script>
  import submitTable from './submit-table.vue'
  import centerSearch from '../center-search.vue'
  import centerPagination from '../center-pagination'
  export default {
    name: 'submit-order',
    components: {
      submitTable,
      centerSearch,
      centerPagination
    },
    props:{
      approvalStatus:{
        type:Number,
        default:0
      }
    },
    data() {
      return {
        defParam: {
          mallOrderCode: '',
          state: 0,
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 2,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        },
        orderList: [],
        orderPagination:{}
      }
    },
    mounted() {
      this.getOrderList(this.defParam)
    },
    methods: {
      changePage(page){
        this.defParam={
          mallOrderCode:'',
          state:0,
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
          state: 0,
          startTime: startTime,
          endTime: endTime,
          pageNo: 1,
          pageSize: 5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      refreshList(code){
        if(code===200){
          this.getOrderList(this.defParam)
        }else {
          this.$message({
            message: '网络错误',
            type: 'error'
          });
        }
      },
      refreshDel(code){
        if(code===200){
          this.getOrderList(this.defParam)
        }else {
          this.$message({
            message: '网络错误',
            type: 'error'
          });
        }
      },
      async getOrderList(param) {
        let list = await this.$store.dispatch('FETCH_ORDER_LIST', {
          param:param
        })
        this.orderList=list.data
        this.orderPagination=list
      }

    }
  }
</script>

<style scoped>

</style>
