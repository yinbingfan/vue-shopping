<template>
  <div class="add-address-modal">
    <div @click="addAddressVisible=true" class="">
      <i class="el-icon-location" style="text-align: center;
    display: block;"></i>
      <div>添加新地址</div>
    </div>
    <el-dialog
      title="新增地址"
      :visible.sync="addAddressVisible"
      class="add-dialog">
      <el-form
        :model="addList"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="收货区地址:" prop="area">
          <v-distpicker
            class="disabled-select"
            @selected="onSelected"
            :province="addList.province" :city="addList.city" :area="addList.area">
          </v-distpicker>
        </el-form-item>
        <el-form-item label="收货地址:" prop="address">
          <el-input v-model.trim="addList.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编:">
          <el-input v-model.trim="addList.zipCode"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名:" prop="name">
          <el-input v-model.trim="addList.name"></el-input>
        </el-form-item>
        <div id="phone">
          <el-form-item label="联系方式:" prop="phone">
            <el-input v-model.trim="addList.phone"></el-input>
          </el-form-item>
          <span class="tip"> (手机号/固定电话)</span>
        </div>
        <el-checkbox class="defAddress" @change="changeSetDef" v-model="delSetRadio">设置为默认地址</el-checkbox>
        <el-form-item>
          <el-button type="primary" @click="addAddress(addList,'ruleForm')">提交</el-button>
          <el-button size="mini" @click="closeAdd">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'addAddress',
    data() {
      let validatePass = (rule, value, callback) => {
        let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
        let isMob = /^1[3457689]\d{9}$/
                   
        if (isPhone.test(value) || isMob.test(value)) {

        } else {
          callback(new Error('请输入联系方式'))
        }
      }
      return {
        selectSystem: 1,
        addList: {
          name: '', //名称
          address: '', //地址
          zipCode: '',
          phone: '',
          province: '广东省',
          city: '广州市',
          area: '海珠区'
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 20, message: '请输入姓名', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            { min: 1, max: 120, message: '请输入地址', trigger: 'blur' }
          ],
          phone: [
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
        addAddressVisible: false,
        delSetRadio: false,
        receivedArea: '',
        SetDef: 0
      }
    },
    methods: {
      changeSetDef(val) {
        if (val) {
          this.SetDef = 1
        } else {
          this.SetDef = 0
        }
      },
      onSelected(data) {
        this.receivedArea = data.province.value + '_' + data.city.value + '_' + data.area.value
      },
      addAddress(addList, formName) {
        if(addList.phone && addList.name && addList.address && addList.area){
          this.adjAddress(addList)
        }else {
          this.$message({
            message: '请填写相关信息',
            type: 'warning'
          })
        }
        return
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert(valid)
            console.log(this)
            this.adjAddress()
            this.addAddressVisible = false

          } else {
            console.log('error submit!!')
            this.$message({
              message: '请填写相关信息',
              type: 'warning'
            })
            return false
          }
        })
        // this.$refs[formName].resetFields()
      },
      closeAdd() {
        this.addAddressVisible = false
      },
      async adjAddress(addList) {
        let add = await this.$store.dispatch('FETCH_ADD_ADDRESS', {
          receivedArea: this.receivedArea || addList.province + '_' + addList.city + '_' + addList.area,//收货地址
          receiver: addList.name,//收货人
          receiverMobilephone: addList.phone,//手机号
          receiverTelephone: addList.phone,//收货人电话
          postCode: addList.zipCode,//邮编
          isdef: this.SetDef,//是否默认地址
          address: addList.address,//收货人地址
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id
        })
        if (add.code===200) {
          this.addAddressVisible = false
          this.$message({
            message: '新增地址成功',
            type: 'success'
          });
          this.$emit('refreshAddress',add.code)
        }else {
          this.$message({
            message: '网络请求错误，请重新操作',
            type: 'error'
          });

        }
      }
    }
  }
</script>
<style lang="less">
  #phone {
    display: flex;

    .label-phone {
      font-size: 12px;
    }

    .tip {
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
