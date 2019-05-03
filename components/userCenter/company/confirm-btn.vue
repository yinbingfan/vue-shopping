<template>
    <div class="confirm-btn">
      <el-button size="small" @click="confirmClose">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmSubmit">确 定</el-button>
    </div>
</template>

<script>
  export default {
    name: 'confirm-btn',
    data(){
      return{
        dialogVisible:false
      }
    },
    methods:{
      confirmSubmit(){
        this.$emit('confirmSubmit')
      },
      confirmClose(){
        this.$emit('confirmClose')
      },


    }
  }
</script>

<style lang="less" scoped>
.confirm-btn{
  display: flex;
 justify-content: center;
  margin: 20px 0;
}
</style>
