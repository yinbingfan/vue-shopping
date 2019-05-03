<template>
  <div class="tags">
    <ul v-if="breadcrumbName==='info'||breadcrumbName==='address'">
      <li
        class="tags-li"
        v-for="(item,index) in infoList"
        :class="{'active': isActive(item.index)}"
        :key="index">
        <nuxt-link :to="`/center?center=${item.index}&agentCode=${agentCode}`" class="tags-li-title">
          {{item.title}}
          <div class="def-bottom"></div>
        </nuxt-link>
      </li>
    </ul>
    <ul v-else>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.index)}"
        :key="index">
        <nuxt-link :to="`/center?center=${item.index}`" class="tags-li-title">
          {{item.title}}
          <div class="def-bottom"></div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tagsList: [
          {
            index: 'all',
            title: '所有订单'
          },
          {
            index: 'submit',
            title: '待提交订单'
          },
          {
            index: 'confirm',
            title: '待确认订单'
          },
          {
            index: 'payment',
            title: '待付款订单'
          },
          {
            index: 'reward',
            title: '待收货订单'
          },
          {
            index: 'completed',
            title: '已完成订单'
          }
        ],
        infoList:[
          {
            index: 'info',
            title: '企业信息管理'
          },
          {
            index: 'address',
            title: '收货地址管理'
          }
        ],
        breadcrumbName:this.$route.query.center,
        agentCode: JSON.parse(this.$cookie.get('userInfo')).id,
      }
    },
    watch: {
      $route(to) {
        this.breadcrumbName=to.query.center
      }
    },
    methods: {
      isActive(path) {
        return path === this.$route.fullPath
      }
    }
  }

</script>
<style lang="less" scoped>
  .tags {
    position: relative;
    height: 40px;
    overflow: hidden;

  }
  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(210,210,210,1);
  }
  .tags-li {
    float: left;
    margin: 3px 5px 9px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }
  .tags-li-title {
    display: inline-block;
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
    /*padding-bottom:10px ;*/
  }
  .nuxt-link-exact-active{
    color: #026EBC;
    /*border: 1px solid #026EBC !important;*/
    position: relative;
    .def-bottom{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: #026EBC;
    }
  }

</style>
