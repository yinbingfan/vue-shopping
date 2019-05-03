<template>
  <div>
    <common-header :shopNum="shopNum"/>
    <center-content/>
    <common-footer/>
  </div>
</template>

<script>
  import commonHeader from '~/components/common/common-header'
  import commonFooter from '~/components/common/common-footer'
  import centerContent from '~/components/userCenter/center-content.vue'

  export default {
    name: 'center',
    components: {
      commonHeader,
      commonFooter,
      centerContent
    },
    data() {
      return {
        shopNum: 0
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const cartNum = JSON.parse(this.$cookie.get('cartNum'))
        if (cartNum) {
          this.shopNum = cartNum
        }else {
          this.shopNum = 0
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
