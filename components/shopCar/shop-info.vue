<template>
  <div class="shop-info">
    <div class="shop-order-top">
      <div class="recipientAddress">商品信息</div>
    </div>
    <ul class="shop-info-header">
      <li class="shop-info-img">产品图片</li>
      <li class="shop-info-name" >产品名称</li>
      <li class="model">型号</li>
      <li class="material">材质</li>
      <li class="productSpecification">产品规格</li>
      <li class="valuationUnits">计价单位</li>
      <li class="shop-info-price">单价(元)</li>
      <li class="shop-info-num">数量</li>
      <li class="shop-info-all">金额(元)</li>
    </ul>
    <ul class="shop-info-list" v-for="(item,index) in orderList.lists" :key="index">
      <li class="shop-info-img">
        <div  v-if="item.img">
          <img :src="item.img.imgUrl" alt="">
        </div>
        <div class="def-img" v-else>

        </div>
      </li>
      <li class="shop-info-name">
        {{item.productName | setString(50)}}
      </li>
      <li class="model">
        {{item.model | setString(20)}}
      </li>
      <li class="material">
        {{item.material | setString(10)}}
      </li>
      <li class="productSpecification">
        {{item.productSpecification}}
      </li>
      <li class="valuationUnits">
        {{item.valuationUnits}}
      </li>
      <li class="shop-info-price">
        {{item.perPrice}}
      </li>
      <li class="shop-info-num">x {{item.quantity}}</li>
      <li class="shop-info-all">{{item.totalPrice}}</li>
    </ul>
    <div class="shop-price-list">
      {{orderData.showCount}}件商品，总商品金额:
      <span>￥{{orderList.totalPrice  |formatDouble}}</span>
    </div>
    <div class="shop-price-list-all">
      应付金额：<span>￥{{orderList.totalPrice |formatDouble}}</span>
    </div>
    <div class="shop-submit" @click="submitOrder">
      提交订单
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>

  export default {
    name: 'shop-info',
    data() {
      return {
        quantity:''
      }
    },
    props:{
      orderList:{
        type:Object,
        default:()=>{}
      },
      orderData:{
        type:Object,
        default:()=>{}
      }
    },
    methods: {
      submitOrder() {
        this.$emit('submitOrder')

      },

    }
  }
</script>

<style lang="less" scoped>
  .shop-info {
    margin-top: 30px;
    height: auto;
    .shop-order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #6f7180;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      /*border-bottom: 1px solid #d2d2d2;*/

      .address {
        color: #3a8ee6;
      }
    }
    .shop-info-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      color: #6f7180;
      background-color: rgb(231, 233, 237);
      .shop-info-img {
        width: 80px;
        margin-left: 4px;
      }
      .shop-info-name {
        width: 100px;
      }
      .model{
        width: 80px;
      }
      .material{
        width: 80px;
      }
      .productSpecification{
        width: 80px;
      }
      .valuationUnits{
        width: 80px;
      }
      .shop-info-price{
        width: 100px;
      }
      .shop-info-num{
        width: 100px;
      }
      .shop-info-all{
        width: 100px;
      }
    }
    .shop-info-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 140px;
      margin-bottom: 20px;
      font-size: 12px;
      color: #6f7180;
      border-bottom: 1px solid #d2d2d2;

      .shop-info-img {
        img {
          width: 80px;
          height: 80px;
        }
        .def-img{
          width: 80px;
        }
      }
      .model{
        width: 80px;
      }
      .material{
        width: 80px;
      }
      .productSpecification{
        width: 80px;
      }
      .valuationUnits{
        width: 80px;
      }
      .shop-info-name {
        width: 100px;
      }
      .shop-info-price{
        width: 100px;
      }
      .shop-info-num{
        width: 100px;
      }
      .shop-info-all {
        width: 100px;
        color: #f42424;
        font-weight: bold;
      }

    }

    .shop-price-list {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      color: #6f7180;

      span {
        margin-left: 43px;
      }
    }

    .shop-price-list-all {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      color: #6f7180;
      margin-top: 29px;

      span {
        margin-left: 20px;
        font-size: 16px;
        color: #f42424;
        font-weight: bold;
      }
    }

    .shop-submit {
      float: right;
      width: 160px;
      height: 50px;
      margin: 30px 0;
      border: 0;
      background-color: #f42424;
      color: #fff;
      line-height: 50px;
      font-size: 24px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
