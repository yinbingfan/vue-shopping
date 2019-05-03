<template>
  <div class="detail">
    <!--头部-->
    <common-header :shopNum="shopNum"/>
    <!--搜索区域-->
    <common-search class="search-btn" @searchBtn="searchBtn"/>
    <!--菜单-->
    <nav-category :navCategory="navCategory" :categoryList="categoryList"/>
    <!--面包屑列表-->
    <goods-breadcrumb
      :menuVal="menuVal"
      :bigCategoryDesc="bigCategoryDesc"
      :middleDesc="middleDesc"
      :smallDesc="smallDesc"
    />
    <!--详情组件-->
    <div class="detailInfos">
      <detail-info
        :goodsDetails="goodsDetails"
        :productBasicResult="productBasicResult"
        :productPriceResult="productPriceResult"
        :exclusiveData="exclusiveData"
        :exclusive="exclusive"
        :productIntroducePics="productIntroducePics"
        :productDisplayPics="productDisplayPics"
        :productFirstPicture="productFirstPicture"
      />
    </div>
    <!--侧边栏-->
    <details-sidebar/>
    <!--提示框-->
    <!--尾部-->
    <common-footer/>
  </div>
</template>

<script>
import commonSearch from '~/components/common/common-search.vue'
import detailInfo from '~/components/details/detail-info.vue'
import detailsSidebar from '~/components/details/details-sidebar.vue'
import navCategory from '~/components/common/nav-category.vue'
import commonHeader from '~/components/common/common-header'
import commonFooter from '~/components/common/common-footer'
import goodsBreadcrumb from '~/components/common/goods-breadcrumb.vue'

export default {
  name: 'detailsPage',
  components: {
    commonSearch,
    detailInfo,
    commonHeader,
    commonFooter,
    detailsSidebar,
    navCategory,
    goodsBreadcrumb
  },
  data() {
    return {
      priceTo: '',
      offsetTop: 190,
      isFixed: false,
      code: '',
      menuVal: '',
      smallDesc: '',
      navCategory: [],
      categoryList: {},
      navCategoryList: {},
      bigCategoryDesc: '',
      bigCategoryCode: '',
      middleDesc: '',
      middleCode: '',
      smallClass: [],
      goodsDetails: {},
      exclusiveData: {},
      exclusive: [],
      productBasicResult: {},
      productPriceResult: {},
      productDisplayPics: [],
      productIntroducePics: [],
      productFirstPicture: '',
      searchCont: '',
      defaultQueryParams: {
        productCode: this.$route.query.code + '.'
      },
      agentCode: "''",
      shopNum: 0
    }
  },
  watch: {
    $route(to) {
      this.getCategory()
      this.code = to.query.code
    }
  },
  mounted() {
    this.init()
    this.getCategory()
    this.getGoodsDetails()
  },
  methods: {
    init() {
      const userInfo = JSON.parse(this.$cookie.get('userInfo'))
      const cartNum = JSON.parse(this.$cookie.get('cartNum'))
      if (userInfo) {
        this.agentCode = userInfo.id
      } else {
        this.agentCode = "''"
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
        wood: []
      }
      let data = category.dataMap
      this.navCategoryList = data
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
      })
      this.navCategory = nav.dataMap
      this.categoryList = categoryList
    },
    async getGoodsDetails() {
      let details = await this.$store.dispatch('FETCH_THIRD_PRODUCT', {
        productCode: this.$route.query.code,
        agentCode: this.agentCode
      })
      const data = details.dataMap
      this.goodsDetails = details.dataMap
      this.productBasicResult = data.productBasicResult
      this.productPriceResult = data.productPriceResult
      this.productDisplayPics = data.productBasicResult.productDisplayPics
      this.productIntroducePics = data.productBasicResult.productIntroducePics
      const productBasicResult = data.productBasicResult
      this.menuVal = productBasicResult.bigClassCode
      if (this.productDisplayPics.length > 0) {
        for (let i = 0; i < this.productDisplayPics.length; i++) {
          this.productFirstPicture = this.productDisplayPics[0].fileUrl
          break
        }
      }

      const inputType = {
        1: 'input',
        2: 'input',
        3: 'select',
        4: 'datePicker',
        5: 'empty'
      }
      const exclusiveData = {}
      const exclusiveModel = []
      const exclusiveInfo = data.productExclusiveResult.exclusiveParams
      Object.keys(exclusiveInfo).map(key => {
        const item = JSON.parse(key)
        const itemModel = {
          key: item.propertyCode,
          showName: item.propertyName,
          elementType: inputType[item.propertyType],
          propertyDesc: item.propertyDesc || '暂无',
          dataType: 'string',
          colProps: item.width
            ? {
                span: item.width && Number(item.width),
                offset: Number(item.offset || 0)
              }
            : null,
          selectOptions: [],
          options: {}
        }
        if (item.propertyType == 3) {
          itemModel.options = JSON.parse(item.propertyDesc).map(item => ({
            value: item.code,
            label: item.desc
          }))
        }
        exclusiveData[item.propertyCode] =
          data.productExclusiveResult.exclusiveParams[key]
        exclusiveModel.push(itemModel)
      })
      this.exclusiveData = exclusiveData
      this.exclusive = exclusiveModel

      let mainCategory = []
      let navCategoryLength = Object.keys(this.navCategoryList).length
      if (navCategoryLength > 0) {
        this.navCategoryList.map(item => {
          if (item.code === productBasicResult.bigClassCode) {
            mainCategory = item
          }
        })
      }
      if (mainCategory.children) {
        mainCategory.children.map(item => {
          if (item.code === productBasicResult.minorClassCode) {
            this.smallClass = item.children
            this.middleDesc = item.desc
          }
        })
      }
    },
    searchBtn(val, queryType) {
      let searchQueryParams = {
        queryType: 1,
        productName: '',
        categoryName: ''
      }
      if (queryType === '产品名称' || queryType === '1') {
        searchQueryParams.productName = val
        searchQueryParams.queryType = Number(1)
        queryType = 1
      } else if (queryType === '2') {
        searchQueryParams.queryType = Number(2)
        searchQueryParams.categoryName = val
      }
      this.$router.push({ path: `/goods?type=${queryType}&cont=${val}` })
      this.searchCont = val
      this.defaultQueryParams = {
        ...this.defaultQueryParams,
        ...searchQueryParams
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  background-color: white;

  .search-btn {
    width: 1200px;
    margin: 0 auto;
  }

  .detailInfos {
    width: 1200px;
    margin: 0 auto;
  }

  .side {
    height: 100vh;
    z-index: 10;
    width: 38px;
    background-color: #474d57;
    position: fixed;
    right: 0;
    top: 0;

    .personalCenter {
      width: 20px;
      margin: 0 auto;
      margin-top: 18vh;
      text-align: center;
      cursor: pointer;
      color: #fff;

      .icon {
        width: 20px;
        height: 20px;
        background: url('../assets/img/goods/headerImg.png') no-repeat center;
        background-size: 100%;
      }
    }

    .shoppingCar {
      width: 20px;
      margin: 0 auto;
      margin-top: 35px;
      text-align: center;
      cursor: pointer;
      color: #fff;

      .icon {
        width: 20px;
        height: 20px;
        background: url('../assets/img/goods/shopping.png') no-repeat center;
        background-size: 100%;
      }
    }

    .top {
      width: 20px;
      margin: 0 auto;
      margin-top: 35px;
      text-align: center;
      cursor: pointer;
      color: #fff;

      .icon {
        width: 20px;
        height: 20px;
        background: url('../assets/img/goods/top02.png') no-repeat center;
        background-size: 100%;
      }
    }
  }
}
</style>
