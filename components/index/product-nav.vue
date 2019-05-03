<template>
  <div>
    <div class="nav_one">
      <div class="nav_cp">
        <a
          @click="handleClick(item.code)"
          :class="item.code===activeTab?'active':''"
          v-for="(item ,key ) in navCategory"
          :key="key"
        >{{item.desc}}</a>
        <a @click="handleClick(code)" :class="code===activeTab?'active':''">辅材</a>
      </div>
    </div>
    <product-nav-list :listShow="listShow" :navList="navList"/>
  </div>
</template>

<script>
import productNavList from './product-nav-list'
import { assitMaterials } from './model/product.js'
export default {
  name: 'product-nav',
  components: {
    productNavList
  },
  data() {
    return {
      listShow: true,
      activeTab: 1,
      navList: this.categoryList.decorationMate,
      code: '5'
    }
  },
  props: {
    navCategory: {
      type: Array,
      default: () => []
    },
    categoryList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick(tab) {
      if (tab === '1') {
        this.activeTab = '1'
        this.navList = this.categoryList.decorationMate
      } else if (tab === '2') {
        this.activeTab = '2'
        this.navList = this.categoryList.electricEquipment
      } else if (tab === '3') {
        this.activeTab = '3'
        this.navList = this.categoryList.hardware
      } else if (tab === '4') {
        console.log(this.categoryList, 'list')
        this.navList = this.categoryList.wood
        this.activeTab = '4'
      } else if (tab === '5') {
        this.navList = assitMaterials
        this.activeTab = '5'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav_one {
  background: url(~assets/img/nav_pp_bj.png) repeat-x;
  height: 62px;
  width: 100%;
  /*position: absolute;*/
  /*top: 456px;*/
  /*z-index: 3;*/
  display: flex;
  justify-content: center;
  align-items: center;
  .nav_cp {
    /*background: url(~assets/img/nav_samil_bj.png) no-repeat;*/
    width: 1200px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      text-indent: 71px;
      display: block;
      /*float: left;*/
      width: 194px;
      height: 62px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 62px;
      font-weight: bold;
      background: url(~assets/img/nav_cp_a_bj.png) no-repeat;
      margin: 0px 0px;
      cursor: pointer;
    }
    .active {
      color: #fff;
      font-size: 20px;
      background: url(~assets/img/nav_title_hover.png) no-repeat;
      border-top: 0px solid;
    }
  }
}
</style>
