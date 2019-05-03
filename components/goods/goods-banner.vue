<template>
  <div class="swiper-wrap">
    <el-carousel :interval="5000" arrow="never">
      <el-carousel-item v-for="(item,index) in banner" :key="item.id">
        <div class="img">
          <img class="imgList" :src="`/img/goods/banner${index+1}.jpg`" alt>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'banner',
  data() {
    return {
      banner: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-wrap {
  width: 1200px;
  margin: 0 auto;

  .img {
    width: 1200px;
    height: 300px;

    .imgList {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
