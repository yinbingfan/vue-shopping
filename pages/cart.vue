<template>
  <div>
    <shop-head :shopNum="shopNum"/>
    <shop-content
      :shopNum="shopNum"
     :cartList="cartList"
   />
    <common-footer/>
  </div>
</template>

<script>
import shopHead from '~/components/common/common-header'
import commonFooter from '~/components/common/common-footer'
import shopContent from '~/components/shopCar/shop-content.vue'
export default {
  name: 'cart',
  components: {
    shopHead,
    commonFooter,
    shopContent
  },
  data() {
    return {
      cartList: {},
      defaultParams: {
        pageNo: 1,
        pageSize: 10000000
      },
      shopNum: 0
    }
  },
  mounted() {
    this.shoppingList()
  },
  methods: {
    // changeListPage(page) {
    //   this.defaultParams.pageNo = page
    //   this.shoppingList()
    // },
      changeTablePage(page) {
      this.defaultParams.pageNo = page
      this.shoppingList()
    },
    async shoppingList() {
      // this.cartList = {}
      let list = await this.$store.dispatch('FETCH_SHOPPING_CART_LIST', {
        pageNo: this.defaultParams.pageNo,
        pageSize: this.defaultParams.pageSize,
        agentCode: JSON.parse(this.$cookie.get('userInfo')).id
      })

      if (list) {
        this.cartList = list
        this.$cookie.set('cartNum', JSON.stringify(list.totalResult))
        this.shopNum = list.totalResult
      } else {
        this.$cookie.set('cartNum', JSON.stringify(0))
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
