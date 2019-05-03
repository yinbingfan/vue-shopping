<template>
  <div>
    <div v-for="(item,key) in orderLists" :key="key">
      <div class="user-center-table">
        <div class="user-center-table-top">
          <div class="user-center-table-order">
            <span>订单号：</span> <span>{{item.mallOrderCode}}</span>
          </div>
          <div class="user-center-table-date">
            <span>下单时间：</span> <span>{{item.orderTime |formatDate}}</span>
          </div>
          <div><span>状态：</span> <span>待提交</span></div>
          <el-button
            class="user-center-table-reward"
            @click="addGoods(item.mallOrderCode)"
            type="primary" size="mini"
            round>添加产品
          </el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="item.products"
          tooltip-effect="dark"
          style="width: 1060px"
          size="medium"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >

          <el-table-column
            label=" 产品名称"
            width="240">
            <template slot-scope="scope">
              <div class="productName">
                {{ scope.row.productName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="model"
            label=" 型号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="material"
            label=" 材质"
            width="110">
          </el-table-column>
          <el-table-column
            prop="productSpecification"
            label=" 产品规格"
            width="110">
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
                        :min="1"
                        @change="changSubmitQuantity(scope.row.id,scope.row.quantity,scope.$index,key)"
                        v-model="scope.row.quantity"
                        type="number"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalPrice"
             width="100"
            label="金额(元)">
          </el-table-column>
          <el-table-column
            label=""
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" class="red" @click="handleChange(scope.$index,scope.row,item.id)">变更产品</el-button>
              <el-button
                type="text"
                icon="el-icon-error"
                @click="handleDel(scope.$index,scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="user-center-table-bottom">
          商品总额（元）：{{item.orderTotalPrice |formatDouble}}
          <el-button
            class="user-center-table-reward"
            @click="toSubmit(item.mallOrderCode)"
            type="primary" size="mini"
            round>提交
          </el-button>
        </div>
        <div class="clearfix"></div>
        <!-- 变更提示框 -->
        <change-goods
          :changeVisible="changeVisible"
          :changeList="changeList"
          :productList="productList"
          :orderId="orderId"
          :categoryName="categoryName"
          @changeGoods="submitChange"
          @closeChange="closeChange"/>
        <add-goods
          :changeVisible="addVisible"
          :mallOrderCode="mallOrderCode"
          @addSubmitChange="addSubmitChange"
          @closeChange="addChange"
          :categoryLists="categoryList"
        />
        <del-goods
          :delVisible="delVisible"
          :changeList="changeList"
          @delClose="delClose"
          @delSubmit="delSubmit"
        />
        <submit-product
          :submitVisible="submitVisible"
          :mallOrderCode="mallOrderCode"
          :changeList="changeList"
          @closeGoods="closeGoods"
          @submitGoods="submitGoods"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import changeGoods from './change-goods.vue'
  import addGoods from './add-goods.vue'
  import delGoods from './del-goods'
  import submitProduct from './submit-product'

  export default {
    name: 'submit-table',
    components: {
      changeGoods,
      addGoods,
      delGoods,
      submitProduct
    },
    data() {
      return {
        mallOrderCode:'',
        changeVisible: false,
        addVisible: false,
        delVisible:false,
        submitVisible:false,
        changeList: {},
        categoryList:[],
        productList:{},
        orderId:0,
        categoryName:''
      }
    },
    props:{
      orderLists:{
        type:Array,
        default:()=>[]
      },
      order:{
        type:Number,
        default:0
      }
    },
    mounted(){
      this.getCategoryList()
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
      },
      changSubmitQuantity(id, num, index,key){
        this.modifySubmitNumber(id, num, index,key)
      },
      async modifySubmitNumber(id, num, index,key) {
        let modifySubmit = await this.$store.dispatch('FETCH_ORDER_MODIFY_PRODUCT_NUMBER', {
          itemId: id,
          quantity: num,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if(modifySubmit.code===200){
          this.orderLists[key].orderTotalPrice = modifySubmit.dataMap.orderTotalPrice
          this.orderLists[key].products[index].totalPrice = modifySubmit.dataMap.productTotalPrice
        }

      },
      async getCategoryList() {
        let category= await this.$store.dispatch('FETCH_PRODUCT_CATEGORY', {})
        this.categoryList=category.dataMap
      },
      handleChange(index, row,orderId,key) {
        this.changeVisible = true
        this.orderId=orderId
        this.changeList = row
        this.getProductList(row.productCode)
      },
      async getProductList(productCode){
        let list= await this.$store.dispatch('FETCH_ORDER_GET_PRODUCT',{
          productCode:productCode,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        let data=list.dataMap.data
        this.productList=list.dataMap
        let title=''
        if(data.length>0){
          data.map(item=>{
            item.quantity=1
            title=item.minorClassName
          })
        }
        this.categoryName=title
      },

      handleDel(index, row){
        this.delVisible = true
        this.changeList = row
      },
      toSubmit(mallOrderCode) {
        this.mallOrderCode=mallOrderCode
        this.submitVisible=true
      },
      submitGoods(mallOrderCode){
        this.submitOrderProduct(mallOrderCode)
        this.submitVisible=false
      },
      closeGoods(){
        this.submitVisible=false
      },
      async submitOrderProduct(mallOrderCode){
        let submit= await this.$store.dispatch('FETCH_ORDER_SUBMIT',{
          mallOrderCode:mallOrderCode,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if(submit.code===200){
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$emit('refreshList',submit.code)
        }else {
          this.$message({
            message: '网络错误，提交失败',
            type: 'error'
          });
        }
      },

      changeGoods() {
        this.changeVisible = false
      },
      closeChange() {
        this.changeVisible = false
      },
      submitChange() {
        this.changeVisible = false
      },
      addGoods(mallOrderCode) {
        this.mallOrderCode=mallOrderCode
        this.addVisible = true
      },
      addSubmitChange() {
        this.addVisible = false
      },
      addChange() {
        this.addVisible = false
      },

      delClose(){
        this.delVisible = false
      },
      delSubmit(id){
        this.delOrderProduct(id)
        this.delVisible = false

      },
      async delOrderProduct(itemId){
        let del= await this.$store.dispatch('FETCH_ORDER_DEL_PRODUCT',{
          itemId:itemId,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if(del.code===200){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.$emit('refreshDel',del.code)
        }else {
          this.$message({
            message: '网络错误，删除失败',
            type: 'error'
          });
        }
      },
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
        margin: 0px 30px 0px 8px;
      }

      .user-center-table-date {
        margin-right: 30px;
      }

      .user-center-table-reward {
        height: 30px;
        margin: 9px 0 0 290px;
      }
    }

    .user-center-table-bottom {
      height: 50px;
      line-height: 50px;
      color: #1F1F1F;
      font-size: 16px;
      float: right;
      margin-right: 15px;

      .user-center-table-reward {
        height: 30px;
        margin: 9px 0 0 40px;
      }
    }
  }
</style>
