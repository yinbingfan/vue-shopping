<template>
  <div>
    <div class="user-center-table" v-for="(item,key) in orderLists" :key="key">
      <div class="user-center-table-top">
        <div class="user-center-table-order">
          <span>订单号：</span> <span>{{item.mallOrderCode}}</span>
        </div>
        <div class="user-center-table-date">
          <span>下单时间：</span> <span>{{item.orderTime|formatDate}}</span>
        </div>
        <div><span>状态：</span> <span>待付款</span></div>
      </div>
      <el-table
        ref="multipleTable"
        :data="item.products"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
      >

        <el-table-column
          label=" 产品名称"
          width="280">
          <template slot-scope="scope">
            <div class="productName">
              {{ scope.row.productName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label=" 型号"
          width="180">
          <template slot-scope="scope">
            <div>
              {{scope.row.model |setString(30)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label=" 材质"
          width="120">
          <template slot-scope="scope">
            <div>
              {{scope.row.material |setString(20)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productSpecification"
          label=" 产品规格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="valuationUnits"
          label=" 计价单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="perPrice"
          label=" 单价(元)"
          width="80">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label=" 数量"
          width="100">
          <template slot-scope="scope">
            <el-input size="mini"  :disabled="true" v-model="scope.row.quantity" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="金额（元）">
        </el-table-column>
      </el-table>
      <div class="user-center-table-bottom">
        商品金额（元）￥{{item.orderGoodsPrice |formatDouble}}
        +运费（元）￥{{item.orderLogisticsPrice |formatDouble}}= ￥{{item.orderTotalPrice |formatDouble}}
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'payment-table',
    props:{
      orderLists:{
        type:Array,
        default:()=>[]
      }
    },
    methods: {
      // 修改table tr行的背景色
      tableRowStyle({ row, rowIndex }) {
        return 'background-color: #f5f5f5'
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color:rgba(231,233,237,1) ;color: #1F1F1F;font-weight: 500;'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-center-table {
    background: rgba(245, 245, 245, 1);
    margin-bottom: 20px;
    .user-center-table-top{
      display: flex;
      height: 48px;
      line-height: 48px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(16,142,233,1);
      .user-center-table-order{
        margin: 0px 30px 0px 8px;
      }
      .user-center-table-date{
        margin-right: 30px;
      }
    }
    .user-center-table-bottom{
      height: 50px;
      line-height: 50px;
      color: #1F1F1F;
      font-size: 16px;
      float: right;
      margin-right: 40px;
    }
  }
</style>
