<template>
  <div class="basic-info">
    <h2>基本信息</h2>
    <el-form
      label-width="120px"
      ref="formSystemSearch"
      size="small"
      label-suffix=":"
      :model="agentBasicInfo"
      class="light-border"
    >
      <el-row :gutter="26">
        <el-col :span="8">
          <el-form-item label="代理商名称" prop="">
            <el-input  :readonly="readonly" v-model="agentBasicInfo.agentName" placeholder="代理商名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机" prop="">
            <el-input :readonly="readonly" v-model="agentBasicInfo.firstContactMobile" placeholder="联系人手机"></el-input>
          </el-form-item>
          <el-form-item label="代理区域" prop="">
            <el-input :readonly="readonly" v-model="agentBasicInfo.agentAddress" placeholder="代理区域"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="第一联系人" prop="">
            <el-input :readonly="readonly" v-model="agentBasicInfo.firstContact" placeholder="第一联系人"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="">
            <el-input :readonly="readonly" v-model="agentBasicInfo.contactEmail" placeholder="电子邮件"></el-input>
          </el-form-item>
          <el-form-item label="代理级别" prop="">
            <el-input :readonly="readonly" v-model="agentBasicInfo.agentGrade" placeholder="代理级别"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人职务" prop="">
            <el-input :readonly="readonly" v-model="agentBasicInfo.firstContactPost" placeholder="联系人职务"></el-input>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'basic-info',
    data(){
      return{
        readonly:true
      }
    },
    props:{
      agentBasicInfo:{
        type:Object,
        default:()=>{}
      }
    },

  }
</script>

<style lang="less" scoped>
.basic-info{
  h2{
    line-height: 48px;
    font-size: 14px;
    color: #888888;
    border-bottom: 1px solid #d2d2d2;
    margin-bottom: 20px;
  }
}
</style>
