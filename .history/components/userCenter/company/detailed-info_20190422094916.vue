<template>
  <div class="detailed-info">
    <h2>详细信息</h2>
    <el-form
      label-width="120px"
      ref="formSystemSearch"
      size="small"
      label-suffix=":"
      :model="agentDetailInfo"
      class="light-border"
    >
      <el-row :gutter="26">
        <el-col :span="8">
          <el-form-item label="主营业务" prop="">
            <el-input :readonly="readonly"
                      v-model="agentDetailInfo.mainBusiness"
                      placeholder="主营业务"></el-input>
          </el-form-item>
          <el-form-item label="公司性质" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.companyType"
              placeholder="公司性质"></el-input>
          </el-form-item>
          <el-form-item label="第二联系人" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.secondContact"
              placeholder="第二联系人"></el-input>
          </el-form-item>
          <el-form-item label="银行账户" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.bankAccount"
              placeholder="银行账户"></el-input>
          </el-form-item>
          <el-form-item label="文件附件" prop="">
        
            <div class="upload-img" v-if="agentDetailInfo.attachments || agentDetailInfo.attachments.length>0">
              <div class=""
                   v-for="(item,key) in agentDetailInfo.attachments" :key="key">

              <div class="productPics-left">
                <a  :href="item.fileUrl" target="_blank" class="document-img">
                  <i class="el-icon-document"></i>
                </a>
                <span>{{item.fileName}}</span>
              </div>
              </div>
            </div>
           
            <div v-else>
              暂无
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册资本" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.registeredCapital"
              placeholder="注册资本"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.registeredAddress"
              placeholder="注册地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人职务" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.secondContactPost"
              placeholder="联系人职务"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.openingBank"
              placeholder="开户行"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.legalPerson"
              placeholder="法人">

            </el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.foundTime"
              placeholder="成立时间">
            </el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="">
            <el-input
              :readonly="readonly"
              v-model="agentDetailInfo.secondContactTel"
              placeholder="联系人电话">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'detailed-info',
    data() {
      return {
        readonly: true
      }
    },
    props: {
      agentDetailInfo: {
        type: Object,
        default: () => {
        }
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


    .upload-img {
      width: 150px;
      height: 150px;
      .productPics-left {
        width: 96px;
        height: 96px;
        margin: 0 8px 18px 0;
        padding: 8px;
        border-radius: 4px;
        position: relative;
        .document-img{
          display: block;
          i{
            display: inline-block;
            font-size: 60px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
