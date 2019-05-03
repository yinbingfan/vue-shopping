<template>
  <div>
    <el-dialog
      title="删除该地址"
      :visible.sync="deleteAddress "
      width="30%"
      :before-close="closeDel"
      center
    >
      <div>是否删除该地址？</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDel">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitDel(addressInfo.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    name: 'del-address',
    props: {
      addressInfo: {
        type: Object,
        default: () => {}
      },
      deleteAddress:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      closeDel() {
        this.$emit("closeDel");
      },
      submitDel(id) {
        this.$emit("submitDel", id);
      }
    }
  };
</script>
