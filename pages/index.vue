<template>
  <div>
    <div>
      <common-header :shopNum="shopNum"/>
      <banner/>
      <product-nav :navCategory="navCategory" :categoryList="categoryList"/>
      <category-list
        :goodsTitle="goodsTitle1"
        :categoryR="decorationR"
        :categoryL="decorationL"/>
      <category-list
        :goodsTitle="goodsTitle2"
        :categoryL="deviceL"
        :categoryR="deviceR"
      />
      <category-list
        :goodsTitle="goodsTitle3"
        :categoryL="BathroomL"
        :categoryR="BathroomR"
      />
      <category-list
        :goodsTitle="goodsTitle4"
        :categoryL="woodworkL"
        :categoryR="woodworkR"/>
      <footer-erwei/>
      <common-footer/>
    </div>
  </div>
</template>

<script>
  import commonHeader from '~/components/common/common-header'
  import commonFooter from '~/components/common/common-footer'
  import footerErwei from '~/components/index/footer-erwei.vue'
  import banner from '~/components/index/banner.vue'
  import productNav from '~/components/index/product-nav.vue'
  import categoryList from '~/components/index/category-list.vue'
  import { category } from '../assets/js/category.js'

  export default {
    components: {
      banner,
      productNav,
      categoryList,
      commonHeader,
      commonFooter,
      footerErwei,
    },
    data() {
      return {
        goodsTitle1: '装饰材料',
        goodsTitle2: '电器产品',
        goodsTitle3: '卫浴五金',
        goodsTitle4: '定制木作',
        decorationL: category.decorationL,
        decorationR: category.decorationR,
        deviceL: category.deviceL,
        deviceR: category.deviceR,
        BathroomR: category.BathroomR,
        BathroomL: category.BathroomL,
        woodworkL: category.woodworkL,
        woodworkR: category.woodworkR,
        shopNum:0
      }
    },
    async asyncData({ app, store, route }) {
      let nav = await store.dispatch('FETCH_CATEGORY_LIST', {})
      let category= await store.dispatch('FETCH_PRODUCT_CATEGORY', {})
      const categoryList={
        decorationMate:[],
        electricEquipment:[],
        hardware:[],
        wood:[]
      }
      let data=category.dataMap
      if(data){
        data.map(item=>{
          if(item.code==='01'||item.code==='04'||item.code==='05'){
            categoryList.electricEquipment.push(item)
          }else if(item.code==='02'||item.code==='03'||item.code==='10'||item.code==='11'||item.code==='12'||item.code==='13'){
            categoryList.decorationMate.push(item)
          }else if(item.code==='06'||item.code==='07'||item.code==='08'||item.code==='09'){
            categoryList.hardware.push(item)
          }else if(item.code==='14'||item.code==='15'||item.code==='16'){
            categoryList.wood.push(item)
          }
        })
      }

      return {
        navCategory: nav.dataMap,
        categoryList:categoryList
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      async getBanner(){
        await this.$store.dispatch('FETCH_HOME_PRODUCT_PIC', {})
      },
      init(){
        const userInfo = JSON.parse(this.$cookie.get('userInfo'))
        const cartNum = JSON.parse(this.$cookie.get('cartNum'))
        if(cartNum && userInfo){
          this.shopNum=cartNum
        }
      }
    }
  }
</script>

<style>

</style>
