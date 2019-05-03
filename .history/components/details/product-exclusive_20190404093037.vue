<template>
  <div class="product-type">
    <!--专有信息-->
    <div class="product-specia product-common">
      <p class="product-common-name">专用信息</p>
      <table class="product-common-table">
        <tbody>
        <tr v-for="(item,key) in exclusive" :key="key">
            <td>
              <span>{{item.showName}}：</span>
              <span>{{exclusiveData[item.key]}}</span>
            </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product-exclusive',
    props:{
      productExclusive:{
        type:Object,
        default:()=>{}
      },
      exclusive: {
        type: Array,
        default: () => []
      },
      exclusiveData: {
        type: Object,
        default: () => {}
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
    }

    .product-common {
      .product-common-table {
        color: #6b6a72;
        font-size: 12px;
        line-height: 12px;
        border: 1px solid #e6ebf5;
        border-right: none;
        border-bottom: none;
        tbody{
          display: flex;
          flex-flow: wrap;
        }
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
