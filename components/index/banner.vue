<template>
  <div class="banner-contain">
    <el-carousel :interval="2000" height="450px" trigger="click" arrow="never">
      <el-carousel-item v-for="(item,index) in banner" :key="item.id">
        <div class="banner">
          <img :src="`/img/banner/banner${index+1}.jpg`" alt>
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
      banner: [
        { id: 3 },
        { id: 2 },
        { id: 1 },
        { id: 4},
        { id: 5}
      ]
    }
  }
}
</script>

<style  lang="less" >
.banner-contain {
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
  background: #7f828b;
}
.banner {
  width: 100%;
  height: 450px;
  img {
    width: 100%;
    height: 450px;
  }
}
.el-carousel__button {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
.el-carousel__indicators {
  bottom: 8px;
}
</style>
