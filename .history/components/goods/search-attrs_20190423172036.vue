<template>
  <div class="search-attrs">
    <div class="middle" v-if="smallAttr.length>0">
      <div class="middle-title">小类选择</div>
      <div class="middle-cont">
        <span v-for="(item,key) in smallAttr " :key="key" class="count-list">
          <label>
            <input
              @click="setSmallV(item.desc,item.code)"
              name="small"
              v-model="smallV"
              :value="item.code"
              type="radio"
            >
            <span class="labelV">{{item.desc}}</span>
          </label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-attrs',
  data() {
    return {
      smallV: ''
    }
  },
  props: {
    smallAttr: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    setSmallV(desc, code) {
      this.$emit('setSmallV', desc, code)
    }
  }
}
</script>

<style lang="less" scoped>
.count-list input {
  opacity: 0;
}

.count-list input[type='radio']:checked + span {
  color: #409eff;
}

.search-attrs {
  border: 1px solid #dfdfdf;
  border-bottom: 2px solid #dfdfdf;
  width: 100%;

  .middle {
    display: flex;
    border: 1px solid #dfdfdf;
    border-top: none;
    padding: 0;
    overflow: hidden;
    width: 100%;

    .middle-title {
      display: flex;
      align-items: center;
      width: 160px;
      padding: 8px 10px;
      background-color: #f5f5f5;
      line-height: 18px;
      font-size: 14px;
      color: #666;
    }

    .middle-cont {
      padding: 0 24px;
      display: flex;
      flex-flow: wrap;
      align-items: center;

      .count-list {
        font-size: 14px;
        float: left;
        width: 180px;
        padding: 8px 10px;
        text-align: center;

        .labelV {
          &:hover {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
