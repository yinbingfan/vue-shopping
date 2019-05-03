<template>
  <div class="goods">
    <!--头部-->
    <common-header :shopNum="shopNum"/>
    <!--搜索区域-->
    <common-search class="search-btn" @searchBtn="searchBtn"/>
    <!--菜单-->
    <nav-category :navCategory="navCategory" :categoryList="categoryList"/>
    <!--轮播图-->
    <goods-banner/>
    <!--面包屑列表-->
    <goods-breadcrumb
      :menuVal="menuVal"
      :bigCategoryDesc="bigCategoryDesc"
      :middleDesc="middleDesc"
      :smallDesc="smallDesc"
      :searchCont="searchCont"
      :middleCode="middleCode"
      :bigCategoryCode="bigCategoryCode"
    />
    <!--小类列表-->
    <div class="attrs">
      <searchAttrs :smallAttr="smallClass" @setSmallV="setSmallV"/>
    </div>
    <!--价格排序-->
    <div class="price-wrap">
      <strong class="price">价格排序</strong>
      <el-radio-group class="priceTo" v-model="priceTo" size="small" @change="changePrice">
        <el-radio-button label="1">由高到低</el-radio-button>
        <el-radio-button label="2">由低到高</el-radio-button>
      </el-radio-group>
    </div>
    <!--商品列表-->
    <div class="list-content">
      <goods-list :goodsList="goodsList"/>
      <div class="noMore" v-if="noMore">暂无上架的宝贝</div>
    </div>
    <!--分页-->
    <goods-pagination :goodsList="goodsList" @handlerChangePage="handlerChangePage"/>
    <common-footer/>
  </div>
</template>

<script>
import commonSearch from '~/components/common/common-search.vue'
import searchAttrs from '~/components/goods/search-attrs.vue'
import goodsList from '~/components/goods/goods-list.vue'
import goodsBanner from '~/components/goods/goods-banner.vue'
import goodsBreadcrumb from '~/components/common/goods-breadcrumb.vue'
import goodsPagination from '~/components/goods/goods-pagination.vue'
import commonHeader from '~/components/common/common-header'
import commonFooter from '~/components/common/common-footer'
import navCategory from '~/components/common/nav-category.vue'

export default {
  name: 'goods',
  components: {
    commonSearch,
    searchAttrs,
    goodsList,
    goodsBanner,
    commonHeader,
    commonFooter,
    navCategory,
    goodsPagination,
    goodsBreadcrumb
  },
  created() {
    this.menuVal = this.$route.query.mainCategoryId
    this.categoryId = this.$route.query.categoryId
  },
  data() {
    return {
      priceTo: 1,
      menuVal: this.$route.query.mainCategoryId,
      smallDesc: '',
      searchCont: '',
      offsetTop: 190,
      isFixed: false,
      navCategory: [],
      categoryList: {},
      bigCategoryDesc: '',
      bigCategoryCode: '',
      middleDesc: '',
      middleCode: '',
      smallClass: [],
      goodsList: {},
      noMore: false,
      categoryId: this.$route.query.categoryId,
      defaultQueryParams: {
        queryType: '',
        productName: '',
        queryCategoryName: '',
        queryCode: this.$route.query.categoryId,
        displaySort: 1,
        pageNo: 1,
        pageSize: 8,
        agentCode: ''
      },
      shopNum: 0
    }
  },
  watch: {
    $route(to) {
      this.menuVal = to.query.mainCategoryId
      this.searchCont = to.query.cont
      this.categoryId = to.query.categoryId
      this.defaultQueryParams.queryCode = to.query.categoryId
      let type = to.query.type
      if (type && type === '1') {
        this.defaultQueryParams.productName = to.query.cont
        this.defaultQueryParams.queryType = Number(1)
      } else if (type && type === '2') {
        this.defaultQueryParams.queryType = Number(2)
        this.defaultQueryParams.queryCategoryName = to.query.cont
      } else {
        this.defaultQueryParams.queryCategoryName = ''
        this.defaultQueryParams.productName = ''
      }
      this.goodsList = {}
      this.getCategory()
      this.getSendGoodsList()
    }
  },
  mounted() {
    this.init()
    this.getCategory()
    this.getSendGoodsList()
    // 开启滚动监听
    window.addEventListener('scroll', this.handleScroll)
  },
  
  methods: {
    init() {
      const userInfo = JSON.parse(this.$cookie.get('userInfo'))
      const cartNum = JSON.parse(this.$cookie.get('cartNum'))
      if (userInfo) {
        this.defaultQueryParams.agentCode = userInfo.id
      } else {
        this.defaultQueryParams.agentCode = ''
      }
      if (cartNum && userInfo) {
        this.shopNum = cartNum
      }
    },
    async getCategory() {
      let nav = await this.$store.dispatch('FETCH_CATEGORY_LIST', {})
      let category = await this.$store.dispatch('FETCH_PRODUCT_CATEGORY', {})
      const categoryList = {
        decorationMate: [],
        electricEquipment: [],
        hardware: [],
        wood: [],
        mainCategory: []
      }
      let categoryId = this.$route.query.categoryId
      let mainCategoryId = this.$route.query.mainCategoryId
      let searchCont = this.$route.query.cont
      let data = category.dataMap
      data.map(item => {
        if (item.code === '01' || item.code === '04' || item.code === '05') {
          categoryList.electricEquipment.push(item)
        } else if (
          item.code === '02' ||
          item.code === '03' ||
          item.code === '10' ||
          item.code === '11' ||
          item.code === '12' ||
          item.code === '13'
        ) {
          categoryList.decorationMate.push(item)
        } else if (
          item.code === '06' ||
          item.code === '07' ||
          item.code === '08' ||
          item.code === '09'
        ) {
          categoryList.hardware.push(item)
        } else if (
          item.code === '14' ||
          item.code === '15' ||
          item.code === '16'
        ) {
          categoryList.wood.push(item)
        }
        if (item.code === mainCategoryId) {
          categoryList.mainCategory = item
          this.bigCategoryDesc = item.desc
          this.bigCategoryCode = item.code
        }
      })
      if (categoryList.mainCategory.children) {
        categoryList.mainCategory.children.map(item => {
          if (item.code === categoryId) {
            this.smallClass = item.children
            this.middleDesc = item.desc
            this.middleCode = item.code
          }
        })
      }
      if (searchCont) {
        this.smallClass = []
        this.middleDesc = ''
        this.middleCode = ''
        this.bigCategoryDesc = ''
        this.bigCategoryCode = ''
        this.searchCont = this.$route.query.cont
      } else if (categoryId) {
        this.searchCont = ''
      }
      this.smallDesc = ''
      this.navCategory = nav.dataMap
      this.categoryList = categoryList
    },
    async getSendGoodsList() {
      let type = this.$route.query.type
      let searchCont = this.$route.query.cont
      if (type && type === '1') {
        this.defaultQueryParams.productName = searchCont
        this.defaultQueryParams.queryType = Number(1)
      } else if (type && type === '2') {
        this.defaultQueryParams.queryType = Number(2)
        this.defaultQueryParams.queryCategoryName = searchCont
      } else {
        this.defaultQueryParams.queryCategoryName = ''
        this.defaultQueryParams.productName = ''
      }
      let goodsList = await this.$store.dispatch('FETCH_SECOND_PRODUCT_LISTS', {
        defaultQueryParams: this.defaultQueryParams
      })
      this.goodsList = {}
      let data = goodsList.dataMap
      if (goodsList.code === 200) {
        if (data.data.length <= 0) {
          this.noMore = true
        } else {
          this.goodsList = data
          this.noMore = false
        }
      } else {
        this.$message({
          message: '网络请求错误，请重试',
          type: 'error'
        })
        this.noMore = true
        this.goodsList = {}
      }
    },
    handlerChangePage(pages) {
      let pageQueryParams = {
        pageNo: pages
      }
      this.defaultQueryParams = {
        ...this.defaultQueryParams,
        ...pageQueryParams
      }
      this.getSendGoodsList()
    },
    searchBtn(val, queryType) {
      let searchQueryParams = {
        queryType: 1,
        productName: '',
        queryCategoryName: '',
        pageNo: 1
      }
      if (queryType === '产品名称' || queryType === '1') {
        searchQueryParams.productName = val
        searchQueryParams.queryType = Number(1)
        queryType = 1
      } else if (queryType === '2') {
        searchQueryParams.queryType = Number(2)
        searchQueryParams.queryCategoryName = val
      }
      this.searchCont = val
      this.defaultQueryParams = {
        ...this.defaultQueryParams,
        ...searchQueryParams
      }
      this.getSendGoodsList()
    },
    setSmallV(desc, code) {
      this.smallDesc = desc
      let smallQueryParams = {
        queryCode: code,
        pageNo: 1
      }
      this.defaultQueryParams = {
        ...this.defaultQueryParams,
        ...smallQueryParams
      }
      this.getSendGoodsList()
    },
    changePrice(val) {
      let priceQueryParams = {
        displaySort: Number(val),
        pageNo: 1
      }
      this.defaultQueryParams = {
        ...this.defaultQueryParams,
        ...priceQueryParams
      }
      this.getSendGoodsList()
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.middle-btn {
  cursor: pointer;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: cornflowerblue;
  }
}

.goods {
  background-color: white;

  .search-btn {
    width: 1200px;
    margin: 0 auto;
  }

  .fixedBar {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }

  .attrs {
    width: 1200px;
    margin: 0 auto;
  }

  .price-wrap {
    width: 1200px;
    margin: 0 auto;
    background-color: #f5f5f5;
    border: 1px solid #dfdfdf;
    margin-top: 50px;
    height: 42px;

    .price {
      cursor: pointer;
      width: 80px;
      display: inline-block;
      background: #fff;
      color: #717f8e;
      border-color: #dfdfdf;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }

    .priceTo {
      margin-left: 10px;
    }
  }

  .list-content {
    width: 1200px;
    margin: 0 auto;

    .noMore {
      text-align: center;
      color: #6f7180;
      line-height: 50px;
    }
  }

  .page {
    padding-bottom: 15px;
    width: 1200px;
    margin: 10px auto;
    text-align: center;
  }
}
</style>
