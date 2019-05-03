<template>
  <div>
    <el-dialog
      title="设置为默认地址"
      :visible.sync="setAddress"
      width="30%"
      :before-close="closeSet"
      center
    >
      <div>是否将该地址设置为默认？</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeSet">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitSet(addressInfo.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    name: 'set-default',
    props: {
      addressInfo: {
        type: Object,
        default: () => {}
      },
      setAddress:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      closeSet() {
        this.$emit("closeSet");
      },
      submitSet(id) {
        this.$emit("submitSet", id);
      }
    }
  };
</script>
