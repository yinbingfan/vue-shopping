<template>
    <div class="center-pagination" v-if="orderPagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="orderPagination.currentPage"
        :page-size="orderPagination.showCount"
        layout="prev, pager, next"
        :total="orderPagination.totalResult">
      </el-pagination>
    </div>
</template>

<script>
  export default {
    name: 'center-pagination',
    props:{
      orderPagination:{
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
