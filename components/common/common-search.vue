<template>
  <div class="search">
    <div class="title">
    </div>
    <div class="search_in">
      <el-select v-model="category" class="search-select" @change="searchSelect">
        <el-option
          v-for="item in searchCondition"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <div     @keyup.enter="searchBtn(search,category)">
        <input placeholder="输入商品"
               v-model="search" type="text">
      </div>
      <span class="button" @click="searchBtn(search,category)">
          搜索
        </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'common-search',
    data(){
      return{
        search:this.$route.query.cont||'',
        category:1,
        searchCondition:[
          {id:1,name:'产品名称'},
          {id:2,name:'类别'},
        ]
      }
    },
    watch: {
      $route(to) {
        this.search=to.query.cont
      }
    },

    methods:{
      searchBtn(val,category){
        this.$emit('searchBtn',val,category)
        this.$router.push({ path: `/goods?type=${category}&cont=${val}&search=${new Date().getTime()}`})
      },
      searchSelect(){
        this.search=''
      }
    }
  }
</script>

<style scoped lang="less">
  .search{
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      padding-left:15px;
      font-size: 18px;
    }
    .search_in{
      padding:40px 20px 40px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .search-select{
        width: 110px;
        margin-right: 10px;
      }
      input{
        border: 1px solid #dcdfe6;
        height: 38px;
        line-height: 18px;
        font-size: 14px;
        width: 238px;
        padding-left: 15px;
        color: #606266;

      }
      .button{
        cursor: pointer;
        color: #606266;
        border-color: transparent;
        background-color: #dcdfe6;
        padding: 10px 20px;
        font-size: 18px;
        line-height: 18px;
        margin-left:-10px;
      }
    }
  }
</style>
