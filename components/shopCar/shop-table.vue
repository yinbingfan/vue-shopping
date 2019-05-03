<template>
  <div>
    <el-button style="display: none" type="primary" size="mini" >导出</el-button>
    <el-table
      ref="multipleTable"
      :data="cartList.data"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        label="全选"
        width="55">
      </el-table-column>
      <el-table-column
        label=" 产品名称"
        width="280">
        <template slot-scope="scope">
          <div class="productName">
            <div v-if="scope.row.img">
              <img :src="scope.row.img.imgUrl"/>
            </div>
            {{ scope.row.productName | setString(50)}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label=" 型号"
        width="120">
        <template  slot-scope="scope">
          <div>
            {{scope.row.model |setString(20)}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label=" 材质"
        width="120">
        <template  slot-scope="scope">
          <div>
            {{scope.row.material |setString(10)}}
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
          <el-input size="mini" :min="1"
                    @change="changQuantity(scope.row.id,scope.row.quantity,scope.$index,scope.row.totalPrice)"
                    v-model="scope.row.quantity"
                    type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="金额">
        <template slot-scope="scope">
          <span>{{scope.row.totalPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" class="red"
                     @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <div class="table-footer-left">
        <el-checkbox
          v-model="allSelect"
          @change="setSelect(cartList.data)"
          class="checkbox-shopping">
          全选
        </el-checkbox>

        <span class="delGoods" @click="delGoods">删除选中的产品</span>
      </div>
      <div class="table-footer-right">
        <div>已选择 <span class="quantity">{{quantity}}</span> 件商品</div>
        <div class="goodsPrice">总价（不含运费）
          <span class="goodsAllPrice">￥{{goodsAllPrice |formatDouble}}</span>
        </div>
        <div class="toOrder" @click="toOrder">
          去下单
        </div>
      </div>
      <!-- 删除提示框 -->
      <del-shopping
        :delVisible="delVisible"
        :idx="idx"
        @delClose="delClose"
        @delSubmit="delSubmit"
      />
    </div>
  </div>
</template>
<script>
  import delShopping from './del-shopping'

  export default {
    components: {
      delShopping
    },
    data() {
      return {
        multipleSelection: [],
        goodsAllPrice: '0',
        quantity: 0,
        allSelect: false,
        delVisible: false,
        delArr: [],
        idx: -1,
        modifyCart: {}
      }
    },
    props: {
      cartList: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.delArr = []
        this.quantity = val.length
        val.map(item => {
          this.delArr.push(item.id)
        })
        if (this.quantity === 0) {
          this.goodsAllPrice = '0'
        } else {
          this.queryCartTotalPrice([...new Set(this.delArr)])
        }
        let cartLength = this.cartList.data.length
        if (val.length === cartLength) {
          this.allSelect = true
        } else {
          this.allSelect = false
        }

      },
      setSelect(rows) {
        if (rows) {
          if (this.allSelect) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            })
          } else {
            this.$refs.multipleTable.clearSelection()

          }
        } else {

          this.$refs.multipleTable.clearSelection()

        }

      },
      handleDelete(index, row) {
        this.delArr.push(row.id)
        this.idx = index
        this.delVisible = true
      },
      delClose() {
        this.delVisible = false
      },
      delSubmit(idx) {
        this.cartList.data.splice(idx, 1)
        this.delShoppingCart(this.delArr)
        this.$message.success('删除成功')
        this.delVisible = false
      },
      delGoods() {
        if ([...new Set(this.delArr)].length > 0) {
          this.delShoppingCart([...new Set(this.delArr)])
          this.$message.success('删除成功')
          this.$router.go(0)
        }

      },
      async delShoppingCart(ids) {
        await this.$store.dispatch('FETCH_DEL_SHOPPING_CART', {
          shoppingCartIds: ids,
          agentCode:JSON.parse(this.$cookie.get('userInfo')).id
        })
      },
      changQuantity(id, num, index,totalPrice) {
        this.modifyCartNumber(id, num, index,totalPrice)
      },
      async modifyCartNumber(id, num, index,totalPrice) {

        let modifyCart = await this.$store.dispatch('FETCH_MODIFY_CART_NUMBER', {
          cartId: id,
          quantity: num,
          agentCode:JSON.parse(this.$cookie.get('userInfo')).id
        })

        let allPrice=this.goodsAllPrice-totalPrice
        if(this.goodsAllPrice==0){
          this.goodsAllPrice=0
        }else if(this.goodsAllPrice>0 ){
          this.goodsAllPrice=allPrice+modifyCart.dataMap.totalPrice
        }

        if(modifyCart.code===200){
          this.cartList.data[index].totalPrice = modifyCart.dataMap.totalPrice
          this.modifyCart = modifyCart.dataMap
        }

      },
      async queryCartTotalPrice(ids) {
        let totalPrice = await this.$store.dispatch('FETCH_CART_TOTAL', {
          ids: ids,
          agentCode:JSON.parse(this.$cookie.get('userInfo')).id
        })
        if(totalPrice.code===200){
          this.goodsAllPrice = totalPrice.dataMap
        }else {
          this.goodsAllPrice='计算中'
        }

      },
      toOrder() {
        if(this.delArr.length>0){
          this.$emit('shopOrder',this.delArr)
        }else {
          this.$alert('请选择下单的产品', '', {
            confirmButtonText: '确定'
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .table-footer {
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;

    .table-footer-right {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #8c8c8c;

      .quantity {
        color: #f42424;
      }

      .goodsPrice {
        margin: 0 26px;

        .goodsAllPrice {
          color: #f42424;
          font-size: 18px;
          font-weight: 700;
        }
      }

      .toOrder {
        width: 160px;
        height: 50px;
        border: 0;
        background-color: #f42424;
        color: #fff;
        line-height: 50px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
      }
    }

    .table-footer-left {
      display: flex;
      color: #8c8c8c;
      font-size: 14px;

      .delGoods {
        cursor: pointer;
      }
    }
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #8c8c8c;
  }

  .productName {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 8px;
    }
  }
</style>
