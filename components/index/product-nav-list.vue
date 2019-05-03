<template>
  <div class="product_nav">
    <div class="nav_dq_list" v-if="listShow">
      <div class="nva_jydq">
        <div class="top">
          <div
            class="top_list"
            @mouseleave="showListLeave(index)"
            @mouseenter="isShow(index)"
            v-for="(item,index) in navList"
            :key="index"
          >
            <a class="top_list_a_bj" target="_blank" ref="listTitle">
              <!--<img src="~assets/img/cizhuan.png" alt="">-->
              <img :src="`/img/nav/${item.desc}.png`" alt>

              <span>{{item.desc}}</span>
            </a>
            <ul class="product_list" v-if="productList===index">
              <li v-for="(list,index) in item.children" :key="index">
                <span class="assit" v-if="list.noDetail">{{list.desc}}</span>
                <a
                  v-else
                  :href="`/goods?categoryId=${list.code}&mainCategoryId=${item.code}`"
                >{{list.desc}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-nav-list',
  props: {
    listShow: {
      type: Boolean,
      default: false
    },
    navList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productList: -1
    }
  },
  methods: {
    isShow(i) {
      this.productList = i
      this.$refs.listTitle[i].style.display = 'none'
    },
    showListLeave(i) {
      this.$refs.listTitle[i].style.display = 'flex'
      this.productList = -1
    }
  }
}
</script>

<style lang="less" scoped>
.product_nav {
  height: auto;
  overflow: hidden;

  .nav_dq_list {
    width: auto;
    height: auto;
    overflow: hidden;
    background: #34495e;

    .nva_jydq {
      height: auto;
      width: 1200px;
      margin: 0 auto;
      .top {
        height: 340px;
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: center;
        .top_list {
          width: 166px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:last-child .top_list_a_bj {
            border-right: none;
          }
          .top_list_a_bj {
            width: 166px;
            height: 130px;
            display: flex;
            flex-flow: column;
            align-items: center;
            border-right: 1px solid #6f7180;
            display: block;
            text-align: center;
            img {
              width: 120px;
              height: 120px;
            }
            span {
              display: block;
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              text-align: center;
              color: #fff;
            }
          }

          .product_list {
            width: 146px;
            height: auto;
            padding-left: 20px;
            overflow: hidden;
            margin-top: 20px;
            display: flex;
            /*align-items: center;*/
            /*justify-content: flex-start;*/
            flex-flow: column;
            .assit {
              color: #fff;
              font-size: 12px;
            }
            li {
              a {
                color: #fff;
                font-size: 12px;

                &:hover {
                  color: #318eb7;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
