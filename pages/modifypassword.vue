<template>
  <div>
    <login-header/>
    <div class="modify">
      <modify-content/>
    </div>
    <common-footer/>
  </div>
</template>

<script>
  import  modifyContent from '../components/modifyPassword/modify-content'
  import loginHeader from '~/components/login/login-header.vue'
  import commonFooter from '~/components/common/common-footer'
  export default {
    name: 'modifypassword',
    components:{
      modifyContent,
      loginHeader,
      commonFooter
    }
  }
</script>

<style lang="less" scoped>
.modify{
  width: 100%;
  min-height: 465px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
