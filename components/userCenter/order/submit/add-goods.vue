<template>
  <div>
    <el-dialog title="新增产品" :visible.sync="changeVisible" :before-close="closeChange" width="800px" center>
      <div class="change-goods-input">
        <span>选择品类：</span>
        <el-cascader
          placeholder="请选择品类"
          :options="categoryLists"
          :change-on-select='isSelect'
          :props="optionProps"
          size="mini"
          @change="selectCategory"
        ></el-cascader>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="orderList"
          tooltip-effect="dark"
          style="width:700px"
          height="150"
          border
          size="mini"
          class="add-goods"
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
              <el-input size="mini" :min="1" v-model="scope.row.quantity" type="number"></el-input>
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
        <div class="center-pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="orderPagination.currentPage"
            @current-change="handlerEmitChange"
            :total="orderPagination.totalResult">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChange" size="mini">取 消</el-button>
        <el-button type="primary" @click="changeGoods" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'add-goods',
    props: {
      changeVisible: {
        type: Boolean,
        default: false
      },
      categoryLists: {
        type: Array,
        default: () => []
      },
      mallOrderCode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isSelect: true,
        optionProps: {
          value: 'code',
          label: 'desc',
          children: 'children'
        },
        orderList: [],
        orderPagination: {},
        queryCode: '',
        pageNo: 1
      }
    },
    methods: {
      selectCategory(val) {
        let categoryArr = val[val.length - 1]
        this.queryCode = categoryArr
        this.getSendGoodsList(categoryArr, this.pageNo)
      },
      handlerEmitChange(val) {
        this.getSendGoodsList(this.queryCode, val)
      },
      async getSendGoodsList(categoryArr, pageNo) {
        let goodsList = await this.$store.dispatch('FETCH_SECOND_PRODUCT_LISTS', {
          defaultQueryParams: {
            queryType: '',
            productName: '',
            categoryName: '',
            queryCode: categoryArr,
            displaySort: 1,
            pageNo: pageNo,
            pageSize: 8,
            agentCode: JSON.parse(this.$cookie.get('userInfo')).id
          }
        })

        if(goodsList.dataMap){
         goodsList.dataMap.data.map(item=>{
           item.quantity=1
         })
         this.orderList = goodsList.dataMap.data
         this.orderPagination = goodsList.dataMap
       }

      },
      changeGoods() {
        this.$emit('addSubmitChange')
      },
      closeChange() {
        this.$emit('closeChange')
      },

      async addOrderProduct(productCode, quantity) {
        let add = await this.$store.dispatch('FETCH_ORDER_ADD_PRODUCT', {
          mallOrderCode: this.mallOrderCode,
          productCode: productCode,
          quantity: quantity,
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if (add.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$emit('addProduct',add.code)
        } else {
          this.$message({
            message: add.message,
            type: 'error'
          })
        }
      },
      submitGoods(index, row) {
        this.addOrderProduct(row.productCode, row.quantity)
      }
    }
  }
</script>

<style lang="less" scoped>
  .change-goods-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .category-input {
      width: 120px;
    }
  }

  .center-pagination {
    text-align: center;
    margin: 30px 0;
  }
</style>
