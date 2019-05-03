<template>
  <div class="select-menu">
    <div class="dropdown-content">
      <div v-for="(item,key) in category" :key="key" class="wf-column">
        <div class="wf-col-title">{{item.desc}}</div>
        <ul class="wf-col-ul">
          <li
            v-for="(list,key) in item.children"
            :key="key"
            @click="hiddenMenu"
          >
            <a v-if="list && list.noDetail">
              {{list.desc}}
            </a>
            <a v-else :href="`/goods?categoryId=${list.code}&mainCategoryId=${item.code}`">
              {{list.desc}}
            </a>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { returnStatement } from '@babel/types'

  export default {
    name: 'category-list',
    props: {
      category: {
        type: Array,
        default: () => {
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      hiddenMenu(item) {
        if (item && item.noDetail) {
          return
        } else {
          this.$emit('hiddenMenu')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .select-menu {
    background: #34495c;
    color: #fff;
    /*height:400px;*/
    min-height: 300px;
    width: 1200px;
    box-sizing: border-box;

    .dropdown-content {
      padding: 0 80px;
      column-count: 5;
      column-gap: 40px;

      .wf-column {
        break-inside: avoid;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .wf-col-title {
          border-bottom: 1px solid #717f8e;
          font-size: 14px;
          font-weight: 700;
          color: #5ba5c5;
          text-align: left;
        }

        .wf-col-ul {
          break-inside: avoid;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          li {
            padding: 0 0 0 8px;
            line-height: 24px;
            font-size: 12px;
            color: #fff;
            text-align: left;
            cursor: pointer;
            width: 100%;

            &:hover {
              background-color: #717f8e;
            }

            a {
              display: block;
              width: 100%;
              padding: 0 0 0 8px;
              line-height: 24px;
              font-size: 12px;
              color: #fff;
              cursor: pointer;

            }
          }
        }
      }
    }
  }
</style>
