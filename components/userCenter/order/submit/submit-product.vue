<template>
  <div>
    <el-dialog title="提示"
               :before-close="closeGoods"
               :visible.sync="submitVisible"
               width="300px" center>
      <div class="del-dialog-cnt">确定提交该订单？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeGoods" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitGoods(mallOrderCode)" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'submit-product',
    props: {
      submitVisible: {
        type: Boolean,
        default: false
      },
      changeList: {
        type: Object,
        default: () => {
        }
      },
      mallOrderCode:{
        type:String,
        default:""
      }
    },
    methods: {
      submitGoods(mallOrderCode) {
        this.$emit('submitGoods', mallOrderCode)
      },
      closeGoods() {
        this.$emit('closeGoods')
      }
    }
  }
</script>

<style scoped>

</style>
