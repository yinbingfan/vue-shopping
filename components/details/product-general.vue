<template>
  <div class="product-type">
    <!--通用信息-->
    <div class="product-common">
      <p class="product-common-name">通用信息</p>
      <table class="product-common-table">
        <tbody>
        <tr>
          <td><span>名称：</span><span>{{productBasicResult.productName}}</span></td>
          <td><span>型号：</span><span>{{productBasicResult.model}}</span></td>
        </tr>
        <tr>
          <td><span>材质：</span><span>{{productBasicResult.material}}</span></td>
          <td><span>产品规格(cm)：</span><span>{{productBasicResult.productSpecification}} </span></td>
        </tr>
        <tr>
          <td><span>产品净重(kg)：</span><span>{{productBasicResult.productNetWeight}}</span></td>
          <td><span>计价单位：</span><span>{{productBasicResult.valuationUnits}}</span></td>
        </tr>
        <tr>
          <td><span>独立包装尺寸(cm)：</span><span>{{productBasicResult.independentPackageSize}}</span></td>
          <td><span>最小包装数：</span><span>{{productBasicResult.minimumPackageNum}}</span></td>
        </tr>
        <tr>
          <td><span>卖点描述：</span><span>{{productBasicResult.productSellPoint}} </span></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product-general',
    props:{
      productGeneral:{
        type:Object,
        default:()=>{}
      },
      productBasicResult:{
        type:Object,
        default:()=>{}
      }
    },
  }
</script>

<style lang="less" scoped>
  .product-type {
    width: 1100px;
    margin: 25px auto 40px;
    word-break: break-all;

    .product-common-name {
      margin: 30px 0 30px 20px;

      /*text-align: center;*/
    }

    .product-common {
      .product-common-table {
        color: #6b6a72;
        font-size: 12px;
        line-height: 12px;
        border: 1px solid #e6ebf5;
        border-right: none;
        border-bottom: none;

        tr {
          height: 24px;

          td {
            text-indent: 12px;
            line-height: 18px;
            padding: 5px;
            min-width: 540px;
            border-right: 1px solid #e6ebf5;
            border-bottom: 1px solid #e6ebf5;
          }
        }
      }
    }

    .product-specia {

    }
  }
</style>
