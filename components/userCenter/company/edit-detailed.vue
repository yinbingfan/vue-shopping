<template>
  <div class="detailed-info">
    <h2>详细信息</h2>
    <el-form
      label-width="120px"
      ref="formSystemSearch"
      size="small"
      label-suffix=":"
      :rules="rules"
      :model="agentDetailInfo"
      class="light-border"
    >
      <el-row :gutter="26">
        <el-col :span="8">
          <el-form-item label="主营业务" prop>
            <el-input v-model.trim="agentDetailInfo.mainBusiness" placeholder="主营业务"></el-input>
          </el-form-item>
          <el-form-item label="公司性质" prop>
            <el-select @change="selectCompanyType" v-model="agentDetailInfo.companyType">
              <el-option
                v-for="item in natureBusiness"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="第二联系人" prop>
            <el-input v-model.trim="agentDetailInfo.secondContact" placeholder="第二联系人"></el-input>
          </el-form-item>
          <el-form-item label="银行账户" prop>
            <el-input v-model.trim="agentDetailInfo.bankAccount" placeholder="银行账户"></el-input>
          </el-form-item>
          <el-form-item label="文件上传" prop>
            <div class="upload-area">
              <div class="upload-img" v-if="agentDetailInfo.attachments">
                <div class v-for="(item,key) in agentDetailInfo.attachments" :key="key">
                  <div class="productPics-left">
                    <div class="document-img">
                      <i class="el-icon-document"></i>
                    </div>
                    <i @click="closeImg(key)" class="el-icon-circle-close del-btn"></i>
                    <span>{{item.fileName}}</span>
                  </div>
                </div>
              </div>
              <div @click="putFileClick(true)" class="uploadClickBtn">
                <i class="upload el-icon-plus avatar-uploader-icon"></i>
              </div>
              <upload-file
                ref="upload"
                :showUpload="showUpload"
                :uploadFileUrl="uploadFileUrl"
                :limit="limit"
                :size="size"
                @update="update"
                @updateFiles="updateFiles"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册资本" prop="registeredCapital">
            <el-input v-model.trim="agentDetailInfo.registeredCapital" placeholder="注册资本"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop>
            <el-input v-model.trim="agentDetailInfo.registeredAddress" placeholder="注册地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人职务" prop>
            <el-input v-model.trim="agentDetailInfo.secondContactPost" placeholder="联系人职务"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop>
            <el-input v-model.trim="agentDetailInfo.openingBank" placeholder="开户行"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人" prop>
            <el-input v-model.trim="agentDetailInfo.legalPerson" placeholder="法人"></el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop>
            <el-date-picker
              @change="foundTime"
              type="date"
              value-format="yyyy-MM-dd"
              v-model="agentDetailInfo.editTime"
              placeholder="成立时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="联系人电话" prop="secondContactTel">
            <el-input v-model.trim="agentDetailInfo.secondContactTel" placeholder="联系人电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import uploadFile from '../../common/upload/upload'

export default {
  name: 'edit-detailed',
  components: {
    uploadFile
  },
  data() {
    let validatePass = (rule, value, callback) => {
      let isMob = /^1[3456789]\d{9}$/
      if (isMob.test(value)) {
      } else {
        callback(new Error('请输入联系方式'))
      }
    }
    let validateNumber = (rule, value, callback) => {
      let isNumber = /^[0-9]*$/
      if (isNumber.test(value)) {
      } else {
        callback(new Error('请输入数字'))
      }
    }
    return {
      imageUrl: '',
      fileUrl: '',
      isShowImg: true,
      rules: {
        secondContactTel: [
          {
            validator: validatePass,
            message: '手机号不合法',
            trigger: 'blur'
          }
        ],
        registeredCapital: [
          {
            validator: validateNumber,
            message: '注册资本必须是数字',
            trigger: 'blur'
          }
        ]
      },
      natureBusiness: [
        { value: 1, label: '国有企业' },
        { value: 2, label: '集体企业' },
        { value: 3, label: '联营企业' },
        { value: 4, label: '股份合作制企业' },
        { value: 5, label: '私营企业' },
        { value: 6, label: '有限责任公司' },
        { value: 7, label: '股份有限公司' },
        { value: 8, label: '其他' }
      ],
      showUpload: false,
      uploadFileUrl: '',
      limit: 4,
      size: 10,
      files: this.agentDetailInfo.attachments || []
    }
  },
  props: {
    agentDetailInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    update() {
      this.showUpload = false
    },
    updateFiles(fileUrl) {
      let wfForm = new FormData() //创建form对象
      fileUrl.map(item => {
        wfForm.set('files', item.raw)
      })
      this.updateToFiles(wfForm)
    },
    async updateToFiles(fileUrl) {
      let list = await this.$store.dispatch('FETCH_UPLOAD_FILE', {
        files: fileUrl
      })
      if (list.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.showUpload = false
        let uploadList = {
          fileUrl: '',
          fileName: ''
        }

        list.dataMap.map(item => {
          uploadList.fileUrl = item.url
          uploadList.fileName = item.name
        })
        this.agentDetailInfo.attachments.push(uploadList)
      } else {
        this.$message({
          message: '上传失败，请重试',
          type: 'error'
        })
      }
    },
    putFileClick() {
      this.showUpload = true
    },
    foundTime(val) {
      this.agentDetailInfo.establishedTime = val
    },
    selectCompanyType(val) {
      this.agentDetailInfo.companyNature = val
    },
    closeImg(key) {
      this.agentDetailInfo.attachments.splice(key,1)
    }
  }
}
</script>

<style lang="less" scoped>
.detailed-info {
  h2 {
    line-height: 48px;
    font-size: 14px;
    color: #888888;
    border-bottom: 1px solid #d2d2d2;
    margin-bottom: 20px;
  }
  .upload-area {
    .upload-img{
      display: flex;
    }
    .productPics-left {
      width: 96px;
      height: 96px;
      display: inline-block;
      margin: 0 8px 18px 0;
      padding: 8px;
      border-radius: 4px;
      position: relative;
      .document-img {
        i {
          display: inline-block;
          font-size: 60px;
          cursor: pointer;
        }
      }
      .del-btn {
        position: absolute;
        z-index: 1;
        top: 0px;
        right: 0px;
        font-size: 16px;
        color: #8c939d;
      }
    }
    .uploadClickBtn {
      width: 96px;
      height: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 8px 8px 18px 0;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      position: relative;
    }

    .avatar-uploader {
      width: 96px;
      height: 96px;
      display: inline-block;
      margin: 0 8px 18px 0;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      position: relative;

      .avatar-uploader-icon {
        font-size: 18px;
        color: #8c939d;
        /*width: 96px;*/
        /*height: 96px;*/
        /*line-height: 30px;*/
        position: absolute;
        top: 38%;
        left: 40%;
      }
    }
  }
}
</style>
