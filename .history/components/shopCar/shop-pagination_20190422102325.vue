<template>
  <div class="center-pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="cartList.currentPage"
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
      handleCurrentChange(val) {
        this.$emit('changePage',val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .center-pagination{
    text-align: center;
    margin:30px 0;
  }
</style>
