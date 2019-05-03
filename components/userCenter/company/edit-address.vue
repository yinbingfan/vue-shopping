<template>
  <div class="add-address-modal">
    <el-dialog
      title="修改地址"
      :visible.sync="editAddress"
      :before-close="closeAdd"
      class="add-dialog">
      <el-form
        :model="addressInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="收货区地址:" prop="area">
          <template>
            <v-distpicker
              class="disabled-select"
              @selected="onSelected"
              :province="addressInfo.province" :city="addressInfo.city" :area="addressInfo.area">
            </v-distpicker>
          </template>
        </el-form-item>
        <el-form-item label="收货地址:" prop="address">
          <el-input v-model.trim="addressInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编:">
          <el-input v-model.trim="addressInfo.postCode"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名:" prop="receiver">
          <el-input v-model.trim="addressInfo.receiver"></el-input>
        </el-form-item>
        <div id="phone">
          <el-form-item label="联系方式:" prop="receiverMobilephone">
            <el-input v-model.trim="addressInfo.receiverMobilephone"></el-input>
          </el-form-item>
          <span class="tip"> (手机号/固定电话)</span>
        </div>
        <el-checkbox class="defAddress" @change="changeSetDef" :checked="addressInfo.isdef===1">
          设置为默认地址
        </el-checkbox>
        <el-form-item>
          <el-button type="primary" @click="addAddress(addressInfo,'ruleForm')">提交</el-button>
          <el-button size="mini" @click="closeAdd">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'edit-address',
    data() {
      let validatePass = (rule, value, callback) => {
        let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
        let isMob =/^1[345768]\d{9}$/
        if (isPhone.test(value)||isMob.test(value)) {
        } else {
          callback(new Error('请输入联系方式'));
        }
      };
      return {
        rules: {
          receiver: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1,  message: '请输入姓名', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            { min: 1, message: '请输入地址', trigger: 'blur' }
          ],
          receiverMobilephone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            {
              validator: validatePass,
              message: '手机号码不合法',
              trigger: 'blur'
            }
          ],
          area: [
            { required: true, message: '请选择所在地区', trigger: 'change' },
            { message: '请选择所在地区', trigger: 'change' }
          ]
        },
        receivedArea:''
      }
    },
    props: {
      addressInfo: {
        type: Object,
        default: () => {}
      },
      editAddress:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      changeSetDef(val) {
        if (val) {
          this.addressInfo.isdef = 1
        } else {
          this.addressInfo.isdef = 0
        }
      },
      onSelected(data) {
        if(data.province.code){
          this.addressInfo.receivedArea = data.province.value + '_' + data.city.value + '_' + data.area.value
          this.addressInfo.area=data.area.value
        }else{
          this.$message({
            message: '请选择所在地区',
            type: 'warning'
          })
          this.addressInfo.area=''
        }
      },
      addAddress(addList, formName) {
        if(addList.receiverMobilephone && addList.receiver && addList.address && addList.area){
          this.$emit('submitEdit',addList)
        }else {
          this.$message({
            message: '请填写相关信息',
            type: 'warning'
          })
        }
      },
      closeAdd() {
        this.$emit('closeEdit')
      }
    }
  }
</script>

<style lang="less" scoped>
  #phone {
    display: flex;

    .label-phone {
      font-size: 12px;
    }
    .tip{
      margin-left: 10px;
      line-height: 27px;
    }
  }

  .defAddress {
    margin: 20px 0 40px 40px;
  }

  .disabled-select {
    select {
      font-size: 14px;
      color: #606266;
      height: 28px;
      padding: 0;
    }
  }
</style>
