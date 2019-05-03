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
    <div class="center-search-select">
      <span>状态：</span>
      <el-select
        v-model="status"
        placeholder="请选择订单状态"
        @change="changSelect"
        size="mini">
        <el-option
          v-for="item in statusList"
          :key="item.index"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
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
        class="center-date-picker"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <el-button
      type="primary"
      @click="searchBtn(orderNumber,orderStatus,orderDate)"
      size="mini">
      查询
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'all-search',
    data() {
      return {
        orderNumber: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        orderDate: '',
        status: ['所有订单'],
        statusList: [
          {
            id: 7,
            index: 'all',
            title: '所有订单'
          },
          {
            id: 0,
            index: 'submit',
            title: '待提交订单'
          },
          {
            id: 1,
            index: 'confirm',
            title: '待确认订单'
          },
          {
            id: 2,
            index: 'payment',
            title: '待付款订单'
          },
          {
            id: 3,
            index: 'reward',
            title: '待收货订单'
          },
          {
            id: 4,
            index: 'completed',
            title: '已完成订单'
          }
        ],
        orderStatus:0,
      }
    },
    methods: {
      changSelect(val){
        if(val===7){
          this.orderStatus=''
        }else {
          this.orderStatus=val
        }
      },
      searchBtn(orderNumber,orderStatus, orderDate) {
        let startTime=orderDate[0]
        let endTime=orderDate[1]
        this.$emit('changeSearch',orderNumber,orderStatus,startTime, endTime)

      }
    }
  }
</script>

<style lang="less" scoped>
  .center-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 20px 0;

    .center-search-input {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        width: 75px;
        font-size: 14px;
        color: #888888;
      }
    }

    .center-search-select {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        width: 42px;
        font-size: 14px;
        color: #888888;
      }
    }

    .center-search-date {
      span {
        font-size: 14px;
        color: #888888;
      }

      .center-date-picker {

      }
    }
  }
</style>
