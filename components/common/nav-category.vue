<template>
  <div class="sel">
    <div class="sel-wrap">
      <div class="nav_cp">
        <a
          href="javascript:;"
          :class="{n_hover:item.code===categoryId(isShowList)}"
          @mouseenter="changeActive(item.code,item.desc)"
          @mouseleave="removeActive(item.code,item.desc)"
          v-for="(item,key) in navCategory"
          :key="key"
        >
          <span>{{item.desc}}</span>
          <selectMenu :category="navList" @hiddenMenu="chooseType" class="selectList"/>
        </a>

        <a
          href="javascript:;"
          v-if="IsAuxiliary"
          :class="{n_hover:code===5}"
          @mouseenter="changeActive(code,desc)"
          @mouseleave="removeActive(code,desc)"
        >
          <span>{{desc}}</span>
          <selectMenu :category="auxiliaryArr" @hiddenMenu="chooseType" class="selectList"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import selectMenu from '~/components/common/category-list'
import { assitMaterials } from '../index/model/product.js'

export default {
  name: 'nav-category',
  data() {
    return {
      navList: [],
      isShowList: this.$route.query.mainCategoryId,
      desc: '辅材',
      code: '5',
      auxiliaryArr: assitMaterials,
      IsAuxiliary: false
    }
  },
  created() {
    this.isShowList = this.$route.query.mainCategoryId
  },
  watch: {
    $route(to) {
      this.isShowList = to.query.mainCategoryId
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
  components: {
    selectMenu
  },
  mounted() {
    setTimeout(() => {
      this.IsAuxiliary = true
    }, 500)
  },
  methods: {
    categoryId(val) {
      let id = ''
      switch (val) {
        case '01':
        case '04':
        case '05':
          id = '2'
          break
        case '02':
        case '03':
        case '10':
        case '11':
        case '12':
        case '13':
          id = '1'
          break
        case '06':
        case '07':
        case '08':
        case '09':
          id = '3'
          break
        case '14':
        case '15':
        case '16':
          id = '4'
          break
      }
      return id
    },
    changeActive(i, name) {
      let selElements = document.getElementsByClassName('selectList')
      if (selElements.length < 2) {
        // selElements.style.display='block';
        return
      }
      selElements[i - 1].style.display = 'block'
      if (name === '装饰材料') {
        this.navList = this.categoryList.decorationMate
      } else if (name === '电器产品') {
        this.navList = this.categoryList.electricEquipment
      } else if (name === '卫浴五金') {
        this.navList = this.categoryList.hardware
      } else if (name === '定制木作') {
        this.navList = this.categoryList.wood
      }
    },
    removeActive(i) {
      let selElements = document.getElementsByClassName('selectList')
      if (selElements.length < 2) {
        // selElements.style.display='none';
        return
      }
      selElements[i - 1].style.display = 'none'
    },
    chooseType() {
      let selElements = document.getElementsByClassName('selectList')
      for (let i = 0; i < selElements.length; i++) {
        selElements[i].style.display = 'none'
      }
      this.$route.query.cont=''
      this.$route.query.type=''
    }
  }
}
</script>

<style lang="less" scoped>
.sel {
  width: 100%;
  padding-bottom: -2px;
  .sel-wrap {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    background-color: #717f8e;
    height: 62px;
    .nav_cp {
      width: 1200px;
      height: 62px;
      display: flex;
      justify-content: center;
      /*margin: 0 auto;*/
      .n_hover {
        background: url(../../assets/img/goods/nav_title_hover.png) no-repeat;
      }
      a {
        text-indent: 36px;
        display: block;
        float: left;
        width: 194px;
        height: 62px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 62px;
        font-weight: bold;
        background: url(../../assets/img/goods/nav_cp_a_bj.png) no-repeat;
        margin: 0px 0px;
        &:hover {
          background: url(../../assets/img/goods/nav_title_hover.png) no-repeat;
        }
      }
    }
  }
  .selectList {
    display: none;
    position: absolute;
    top: 62px;
    left: 0;
    z-index: 5;
    overflow: auto;
    overflow-x: hidden;
    transition: opacity 0.13s ease-in-out, width 0.13s ease-in-out;
  }
}
</style>
