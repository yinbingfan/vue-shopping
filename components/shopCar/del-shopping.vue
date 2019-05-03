<template>
  <div>
    <el-dialog title="提示"
               :before-close="delClose"
               :visible.sync="delVisible"
               width="300px" center>
      <div class="del-dialog-cnt">确定删除该商品？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="deleteRow(idx)" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'del-shopping',
    props: {
      delVisible:{
        type:Boolean,
        default:false
      },
      idx:{
        type:Number,
        default:-1
      }
    },
    methods: {
      deleteRow(idx) {
        this.$emit('delSubmit',idx)
      },
      delClose(){
        this.$emit('delClose')
      }
    }
  }
</script>

<style scoped>

</style>
