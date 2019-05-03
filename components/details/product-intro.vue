<template>
  <div class="product-detail">
    <p   v-for="(item ,key) in productIntroducePics" :key="key">
      <img :src="item.fileUrl" width="100%"
           style="">
    </p>
  </div>
</template>

<script>
  export default {
    name: 'product-intro',
    props:{
      productIntroducePics:{
        type:Array,
        default:()=>[]
      }
    },
  }
</script>

<style lang="less" scoped>
  .product-detail {
    width: 1100px;
    margin: 25px auto 40px;
    word-break: break-all;
      height: auto;
    img {
      width: 750px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
