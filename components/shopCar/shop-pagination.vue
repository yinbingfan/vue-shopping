<template>
  <div class="center-pagination" v-if="cartList">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="cartList.currentPage"
      :page-size="cartList.showCount"
      layout="prev, pager, next"
      :total="cartList.totalResult">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'shop-pagination',
    props:{
      cartList:{
        type:Object,
        default:()=>{}
      }
    },
    methods:{
      handleCurrentChange(page) {
        this.$emit('changePage',page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .center-pagination{
    text-align: center;
    margin-bottom: 30px;
  }
</style>
