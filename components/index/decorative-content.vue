<template>
  <div class="category-lists">
    <div class="category-list">
      <h2 class="title">装饰材料</h2>
      <div class="category">
        <div class="category-list-left" >
          <a  target="_blank">
            <img src="~assets/img/category/3.jpg" alt="">
          </a>
        </div>
        <div class="category-list-right">
          <a
             target="_blank"
             class="category-list-img"
             href="/detail"
         >
            <img src="item.pic" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'decorative-content',

  }
</script>

<style lang="less" scoped>
  .category-lists {
    width: 100%;
    margin-bottom: 25px;
    background: #ffffff;
    padding: 20px 0 40px 0;

    .category-list {
      width: 1200px;
      margin: 0 auto;

      .title {
        font-size: 18px;
        color: #222;
        letter-spacing: .52px;
        line-height: 50px;

      }

      .category {
        display: flex;
        flex: 1;
        border: 1px solid #e6ebf5;

        .category-list-left {
          height: 360px;
          width: 342px;
          border-right: 1px solid #e6ebf5;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 360px;
          }
        }

        .category-list-right {
          display: flex;
          flex-flow: wrap;
          flex: 1;

          .category-list-img {
            width: 285px;
            height: 180px;

            img {
              width: 100%;
              height: 100%;
            }

            &:nth-of-type(1) {
              border-right: 1px solid #e6ebf5;
              border-bottom: 1px solid #e6ebf5;
            }

            &:nth-of-type(2) {
              border-right: 1px solid #e6ebf5;
              border-bottom: 1px solid #e6ebf5;
            }

            &:nth-of-type(3) {

              border-bottom: 1px solid #e6ebf5;
            }

            &:nth-of-type(4) {
              border-right: 1px solid #e6ebf5;
            }

            &:nth-of-type(5) {
              border-right: 1px solid #e6ebf5;
            }
          }
        }
      }

    }
  }
</style>
