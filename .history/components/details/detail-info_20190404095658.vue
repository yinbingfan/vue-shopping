<template>
  <div class="detail-info">
    <div class="product-intro">
      <basic-left :productBasicResult="goodsDetails.productBasicResult"/>
      <basic-right :productBasicResult="goodsDetails"/>
    </div>
    <div class="goods-tab">
      <el-tabs
        class="tab-wrapper"
        type="border-card"
        v-model="tabNum"
      >
        <el-tab-pane name="1" label="产品详情">产品详情</el-tab-pane>
        <el-tab-pane name="2" label="规格属性">规格属性</el-tab-pane>
      </el-tabs>
      <product-intro v-if="tabNum==='1'"/>
      <div v-if="tabNum==='2'">
        <product-general
          :productGeneral="goodsDetails"/>
        <product-exclusive
          :exclusiveData="exclusiveData"
          :exclusive="exclusive"
          :productExclusive="goodsDetails"/>
      </div>
    </div>
  </div>
</template>

<script>
  import basicRight from './basic-info-right'
  import basicLeft from './basic-info-left'
  import productIntro from './product-intro'
  import productExclusive from './product-exclusive'
  import productGeneral from './product-general'

  export default {
    name: 'detail-info',
    components: {
      basicRight,
      basicLeft,
      productExclusive,
      productGeneral,
      productIntro
    },
    data() {
      return {
        isLogin: false,
        smallPic: 0,
        bigImgUrl: ' ',
        num: 1,        //添加商品数量
        tabNum: '1'   //详情1，规格2
      }
    },
    props: {
      goodsDetails: {
        type: Object,
        default: () => {
        }
      },
      exclusive: {
        type: Array,
        default: () => []
      },
      exclusiveData: {
        type: Object,
        default: () => {
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        if (this.$cookie.get('userName')) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      }

    }
  }
</script>

<style lang="less" scoped>
  .detail-info {
    overflow: hidden;

    .product-intro {
      overflow: hidden;
    }

    .goods-tab {
      width: 1200px;
      border: 1px solid #e6ebf5;
      margin: 30px 0;
      min-height: 45px;
      border-top: 0;
    }

    .warn {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  }
</style>
