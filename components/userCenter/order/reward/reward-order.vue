<template>
  <div>
    <div class="approvalStatus-company" v-if="approvalStatus!==4">
      <div>
        企业信息未完善
      </div>
    </div>
    <div v-else>
      <center-search @changeSearch="changeSearch"/>
      <reward-table
        :orderLists="orderList"
        @confirmReceive="confirmReceive"
      />
      <center-pagination
        @changePage="changePage"
        :orderPagination="orderPagination"/>
    </div>

  </div>
</template>

<script>
  import rewardTable from './reward-table.vue'
  import centerSearch from '../center-search.vue'
  import centerPagination from '../center-pagination.vue'

  export default {
    name: 'reward-order',
    components: {
      rewardTable,
      centerSearch,
      centerPagination
    },
    data() {
      return {
        defParam: {
          mallOrderCode: '',
          state:3+'or'+4,
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        },
        orderList: [],
        orderPagination: {}
      }
    },
    mounted() {
      this.getOrderList(this.defParam)
    },
    props:{
      approvalStatus:{
        type:Number,
        default:0
      }
    },
    methods: {
      confirmReceive(code){
        if(code===200){
          this.getOrderList(this.defParam)
        }else {
          this.$message({
            message: '网络错误，请重试',
            type: 'error'
          })
        }
      },
      changeSearch(orderNumber, startTime, endTime) {
        this.defParam = {
          mallOrderCode: orderNumber,
          startTime: startTime,
          state:3+'or'+4,
          endTime: endTime,
          pageNo: 1,
          pageSize: 5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      changePage(page) {
        this.defParam = {
          mallOrderCode: '',
          state:3+'or'+4,
          startTime: '',
          endTime: '',
          pageNo: page,
          pageSize: 5,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        }
        this.getOrderList(this.defParam)
      },
      async getOrderList(param) {
        let list = await this.$store.dispatch('FETCH_ORDER_LIST', {
          param: param
        })
        if(list){
          this.orderList = list.data
          this.orderPagination = list
        }else {
          this.$message({
            message: '网络错误，请重试',
            type: 'error'
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>
