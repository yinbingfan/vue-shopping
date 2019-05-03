<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="menuVal">{{menuVal|navCategory}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="bigCategoryDesc">{{bigCategoryDesc}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="middleDesc">{{middleDesc}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="smallDesc">{{smallDesc}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="searchCont">{{searchCont}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'goods-breadcrumb',
  props: {
    menuVal: {
      type: String,
      default: ''
    },
    bigCategoryDesc: {
      type: String,
      default: ''
    },
    middleDesc: {
      type: String,
      default: ''
    },
    smallDesc: {
      type: String,
      default: ''
    },
    searchCont: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.crumbs {
  width: 1200px;
  margin: 10px auto;
  padding: 14px 0;
}
</style>
