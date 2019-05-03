<template>
  <div>
    <div class="user-center-table" v-for="(item,key) in orderLists" :key="key" >
      <div class="user-center-table-top">
        <div class="user-center-table-order">
          <span>订单号：</span> <span>{{item.mallOrderCode}}</span>
        </div>
        <div class="user-center-table-date">
          <span>下单时间：</span> <span>{{item.orderTime |formatDate}}</span>
        </div>
        <div>
          <span>状态：</span><span>待收货</span>
        </div>
      </div>
      <!--子订单-->
      <div v-for="(list,key) in item.orderPurchases" :key="key">
        <div class="orderSize">
          <div class="orderSize-state">
            <h2>子订单{{key+1}}</h2>
            <span  v-if="list.state<3"><span>状态：</span>待发货</span>
            <span  v-else-if="list.state===3"><span>状态：</span>已发货</span>
            <span  v-else-if="list.state>3"><span>状态：</span>已完成</span>
          </div>

          <div>
            <el-button
              v-if="list.state>=3"
              class="user-center-table-reward"
              @click="logisticsInfo(item.address,list.deliver)"
              type="primary" size="mini"
              round>物流信息
            </el-button>
            <el-button
              v-if="list.state===3"
              class="user-center-table-reward"
              @click="toCompleted(list)"
              type="primary" size="mini"
              round>确认收货
            </el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="list.productItemList"
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px"
          size="medium"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column
            label=" 产品名称"
            width="280">
            <template slot-scope="scope">
              <div class="productName">
                {{ scope.row.productName |setString(30)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label=" 型号"
            width="180">
            <template  slot-scope="scope">
              <div>
                {{scope.row.model |setString(30)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label=" 材质"
            width="120">
            <template  slot-scope="scope">
              <div>
                {{scope.row.material |setString(30)}}
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
              <el-input size="mini"
                        :disabled="true"
                        v-model="scope.row.quantity" type="number">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="金额(元)">
          </el-table-column>
        </el-table>
      </div>
      <div class="user-center-table-bottom">
        商品金额（元）￥{{item.orderGoodsPrice|formatDouble}}
        +运费（元）￥{{item.orderLogisticsPrice|formatDouble}}=
        ￥{{item.orderTotalPrice|formatDouble}}
      </div>
      <div class="clearfix"></div>
      <!--物流信息-->
      <logistics-info
        :logisticsVisible="logisticsVisible"
        :logisticsMessage="logisticsMessage"
        :deliver="deliver"
        @submitLogistics="submitLogistics"
        @closeLogistics="closeLogistics"
      />
    </div>
  </div>

</template>

<script>
  import  {order} from '../../../../assets/js/order.js'
  import logisticsInfo from './logistics-info'
  export default {
    name: 'reward-table',
    props:{
      orderLists:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
        orderList:order.dataMap,
        logisticsVisible:false,
        logisticsMessage:{},
        deliver:{
          logisticsCompany:'',
          logisticsCode:''
        }
      }
    },
    components:{
      logisticsInfo
    },
    methods: {
      // 修改table tr行的背景色
      tableRowStyle({ row, rowIndex }) {
        return 'background-color: #f5f5f5'
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color:rgba(231,233,237,1) ; font-size: 14px;color: #1F1F1F;font-weight: 500;'
        }
      },
      logisticsInfo(address,deliver){
        console.log('deliver',deliver)
        this.logisticsMessage=address
        if(deliver){
          this.deliver=deliver
        }else {
          this.deliver={
            logisticsCompany:'',
            logisticsCode:''
          }
        }

        this.logisticsVisible=true
      },
      submitLogistics(){
        this.logisticsVisible=false
      },
      closeLogistics(){
        this.logisticsVisible=false
      },
      toCompleted(orderPurchaseList) {
        this.getOrderConfirm(orderPurchaseList.purchaseOrderId)
      },
      async getOrderConfirm(purchaseOrderId) {
        let confirm = await this.$store.dispatch('FETCH_ORDER_CONFIRM', {
          purchaseOrderId: purchaseOrderId,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if(confirm.code===200){
          this.$message({
            message: '确认收货',
            type: 'success'
          });
          this.$emit('confirmReceive',confirm.code)
          // this.$router.push(`/center?center=completed`)
        }else {
          this.$message({
            message: confirm.message,
            type: 'error'
          });
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .user-center-table {
    background: rgba(245, 245, 245, 1);
    margin-bottom: 20px;

    .user-center-table-top {
      display: flex;
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(16, 142, 233, 1);

      .user-center-table-order {
        font-size: 14px;
        margin: 0px 30px 0px 8px;
      }

      .user-center-table-date {
        margin-right: 30px;
      }

    }
    .orderSize{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px 8px;

      .orderSize-state{
        display: flex;
        h2{
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgb(31, 31, 31);
          margin-right: 12px;
        }
        span{
          font-size: 12px;
          color: rgba(16, 142, 233, 1);
        }
      }
      .user-center-table-reward {
        height: 30px;
        margin: 0px 0 0 20px;
      }
    }
    .user-center-table-bottom {
      height: 50px;
      line-height: 50px;
      color: #1F1F1F;
      font-size: 16px;
      float: right;
      margin-right: 40px;
    }
  }
</style>
