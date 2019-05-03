<template>
  <div class="page" v-if="goodsList.totalResult>0">
    <el-pagination
      background
      @current-change="handlerEmitChange"
      :page-size="goodsList.showCount"
      layout="prev, pager, next"
      :current-page="goodsList.currentPage"
      :total="goodsList.totalResult">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'goods-pagination',
    props:{
      goodsList:{
        type:Object,
        default:()=>{}
      }
    },
    methods:{
      handlerEmitChange(pages){
        this.$emit('handlerChangePage',pages)
      }
    }
  }
</script>

<style  scoped>

</style>
