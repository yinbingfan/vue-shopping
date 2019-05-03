<template>
  <div>
    <el-dialog title="变更产品"
               :visible.sync="changeVisible"
               :before-close="closeChange" width="800px" center>
      <div class="change-goods-input">
        <span>当前品类：</span>
        <el-input
          class="category-input"
          size="mini"
          :readonly='readonly'
          placeholder="请输入当前品类"
          v-model="categoryName">
        </el-input>
      </div>
      <div >
        <el-table
          ref="multipleTable"
          :data="productList.data"
          tooltip-effect="dark"
          height="150"
          style="width:700px"
          border
          size="mini"
        >
          <el-table-column
            label=" 产品名称"
            width="90">
            <template slot-scope="scope">
              <div class="productName">
                {{ scope.row.productName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="model"
            label=" 型号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="material"
            label=" 材质"
            width="80">
          </el-table-column>
          <el-table-column
            prop="productSpecification"
            label=" 产品规格"
            width="90">
          </el-table-column>
          <el-table-column
            prop="valuationUnits"
            label="计价单位"
            width="70">
          </el-table-column>
          <el-table-column
            prop="agentPrice"
            label=" 单价(元)"
            width="70">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label=" 数量"
            width="100">
            <template slot-scope="scope">
              <el-input size="mini"  :min="1" v-model="scope.row.quantity" type="number"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label=""
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" class="red" @click="submitGoods(scope.$index,scope.row)">确认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChange" size="mini">取 消</el-button>
        <el-button type="primary" @click="changeGoods(mallOrderCode)" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'change-goods',
    props: {
      changeVisible: {
        type: Boolean,
        default: false
      },
      productList:{
        type: Object,
        default: () => {
        }
      },
      changeList: {
        type: Object,
        default: () => {
        }
      },
      mallOrderCode:{
        type: String,
        default: ''
      },
      categoryName:{
        type: String,
        default: ''
      },
      orderId:{
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        key:2,
        readonly:true
      }
    },
    methods: {
      changeGoods(mallOrderCode) {
        this.$emit('changeGoods',mallOrderCode)
      },
      closeChange() {
        this.$emit('closeChange')
      },
      submitGoods(index,row){
        this.submitOrderProduct(row)
      },
      async submitOrderProduct(row){
        let modify= await this.$store.dispatch('FETCH_ORDER_MODIFY_PRODUCT',{
          orderId:this.orderId,
          productCode:row.productCode,
          itemId:this.changeList.id,
          quantity:row.quantity,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if(modify.code===200){
          this.$message({
            message: '变更成功',
            type: 'success'
          });
          this.$emit('changeProduct',modify.code)
        }else {
          this.$message({
            message: modify.message,
            type: 'error'
          });
        }
      },
    }
  }
</script>

<style lang="less" scoped>
.change-goods-input{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .category-input{
    width: 120px;
  }
}
</style>
