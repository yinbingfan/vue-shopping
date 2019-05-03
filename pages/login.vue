<template>
  <div>
    <login-header/>
    <login-main/>
    <common-footer />
  </div>
</template>

<script>
  import loginHeader from '~/components/login/login-header.vue'
  import loginMain from '~/components/login/login-main.vue'
  import commonFooter from '~/components/common/common-footer'
  export default {
    name: 'login',
    components:{
      loginHeader,
      commonFooter,
      loginMain
    }
  }
</script>
