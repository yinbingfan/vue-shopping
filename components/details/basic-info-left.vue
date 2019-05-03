<template>
  <div class="fl product-img">
    <div class="carousel-main"
         v-if="bigImgUrl"
    >
      <img :src="bigImgUrl" alt="">
    </div>
    <div v-else-if="key>1" class="carousel-main">
      <div   v-for="(item ,key) in productDisplayPics"
      :key="key">
      <img  :src="item.fileUrl" alt="">
      </div>
    </div>
    <div class="carousel carousel-card">
      <div class="carousel-container" style="height: 68px; margin-top: 8px;">
        <div
          class="fl card-img "
          v-for="(item ,key) in productDisplayPics"
          :class="{is_active:smallPic == key}"
          @mouseenter="chooseSmallPic(key)"
          :key="key"
        >
          <img :src="item.fileUrl" alt="" width="68px" height="68px" class="img-item">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basic-info-left',
    props: {
      productDisplayPics: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        bigImgUrl: '',
        smallPic: 0,
        key:2
      }
    },
    methods: {
      chooseSmallPic(i) {
        this.smallPic = i
        this.bigImgUrl = this.productDisplayPics[i].fileUrl
        console.log(this.bigImgUrl)
      }
    }
  }
</script>

<style lang="less" scoped>
  .fl {
    float: left
  }

  .product-img {
    width: 420px;

    .carousel-main {
      position: relative;
      overflow: hidden;
      background-color: #e6ebf5;
      width: 420px;
      height: 420px;
      img{
        width: 420px;
        height: 420px;
      }
    }

    .carousel-card {
      overflow: hidden;
      position: relative;

      .carousel-container {
        .card-img {
          margin-left: 20px;
          cursor: pointer;
          border: 2px solid #fff;
          width: 70px;
          height: 70px;
          img{
            width: 100%;
            height: 100%;
          }
        }

        .is_active {
          border: 2px solid #3bbae6;
        }
      }
    }
  }
</style>
