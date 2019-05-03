<template>
    <div>
      <shop-head :shopNum="shopNum"/>
      <shop-content :shopNum="shopNum" :cartList="cartList" @changePage="changePage"/>
      <common-footer/>
    </div>
</template>

<script>
  import shopHead from '~/components/common/common-header'
  import commonFooter from '~/components/common/common-footer'
  import shopContent from '~/components/shopCar/shop-content.vue'
  export default {
    name: 'cart',
    components:{
      shopHead,
      commonFooter,
      shopContent
    },
    data(){
      return{
        cartList:{},
        defaultParams:{
          pageNo:1,
          pageSize:5,
        },
        shopNum:0
      }
    },
    mounted(){
      this.shoppingList()
    },
    methods:{
      changePage(val){
        this.defaultParams.pageNo=val
        this.shoppingList()
      },
      async shoppingList(){
       this.cartList={}
        let list = await this.$store.dispatch('FETCH_SHOPPING_CART_LIST', {
          pageNo:this.defaultParams.pageNo,
          pageSize:this.defaultParams.pageSize,
          agentCode:JSON.parse(this.$cookie.get('userInfo')).id
        })
        this.cartList=list
      
        console.log(list)
        if(list.data){
          this.$cookie.set(
            'cartNum',
            JSON.stringify(list.data.length)
          )
          this.shopNum=list.data.length
        }else {
          this.$cookie.set(
            'cartNum',
            JSON.stringify(0)
          )
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
