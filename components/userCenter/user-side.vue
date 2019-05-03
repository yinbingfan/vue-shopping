<template>
  <div class="user-side">
    <ul>
      <h2 @click="sideTitle"><i class="el-icon-tickets"></i> 订单管理</h2>
      <div  v-if="isShowCard">
        <li
          class="tags-li"
          v-for="(item,index) in orderList"
          :class="{'active': isActive(item.index)}"
          :key="index">
          <nuxt-link :to="`/center?center=${item.index}`" class="tags-li-title">
            {{item.title}}
          </nuxt-link>
        </li>
      </div>
    </ul>

    <ul>
      <h2 @click="setTitle"><i class="el-icon-menu"></i>信息管理</h2>
      <div  v-if="isShowAddress">
        <li
          class="tags-li"
          v-for="(item,index) in addressList"
          :class="{'active': isActive(item.index)}"
          :key="index">
          <nuxt-link :to="`/center?center=${item.index}&agentCode=${agentCode}`" class="tags-li-title">
            {{item.title}}
          </nuxt-link>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowCard:true,
        isShowAddress:true,
        agentCode: JSON.parse(this.$cookie.get('userInfo')).id,
        orderList: [
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
        addressList:[
          {
            index: 'info',
            title: '企业信息管理'
          },
          {
            index: 'address',
            title: '收货地址管理'
          }
        ],
      }
    },
    methods: {
      isActive(path) {
        return path === this.$route.fullPath
      },
      sideTitle(){
        this.isShowCard=!this.isShowCard
      },
      setTitle(){
        this.isShowAddress=!this.isShowAddress
      }
    },
   
  }
</script>
<style lang="less" scoped>
  .user-side{
    width: 140px;
    height: auto;
    margin-right: 12px;
    ul{
      height: auto;
      h2{
        color:rgba(31,31,31,1);
        font-size: 16px;
        line-height:54px;
        cursor: pointer;
        i{
          color:rgba(31,31,31,1);
        }
      }
    }
  }


  .tags-li {
    /*float: left;*/
    margin: 3px 5px 9px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
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
  }
  .nuxt-link-exact-active{
    color: #026EBC;
    position: relative;
  }

</style>
