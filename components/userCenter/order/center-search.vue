<template>
    <div class="center-search">
      <div class="center-search-input">
        <span>订单号：</span>
        <el-input
          size="mini"
          placeholder="请输入订单号"
          prefix-icon="el-icon-tickets"
          v-model="orderNumber">
        </el-input>
      </div>
      <div class="center-search-date">
        <span>起止时间:</span>
        <el-date-picker
          v-model="orderDate"
          type="daterange"
          align="right"
          unlink-panels
          size="mini"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <el-button type="primary" @click="searchBtn(orderNumber,orderDate)" size="mini">查询</el-button>
    </div>
</template>

<script>
  export default {
    name: 'center-search',
    data(){
      return{
        orderNumber:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderDate: ''
      }
    },
    methods:{
      searchBtn(orderNumber,orderDate){
        let startTime=orderDate[0]
        let endTime=orderDate[1]
        this.$emit('changeSearch',orderNumber,startTime,endTime)
      }
    }
  }
</script>

<style lang="less" scoped>
.center-search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 20px 0;
  .center-search-input{
    display: flex;
    align-items: center;
    span{
      display: inline-block;
      width: 75px;
      font-size: 14px;
      color: #888888;
    }
  }
  .center-search-date{
    span{
      font-size: 14px;
      color: #888888;
    }
  }
}
</style>
