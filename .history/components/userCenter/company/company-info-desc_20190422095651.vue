<template>
  <div>
    <div v-if="infoBasic">
      <div class="company-edit">
        <el-button type="primary" size="mini" @click="editInfo">修改</el-button>
      </div>
      <basic-info :agentBasicInfo="agentBasicInfo"/>
      <detailed-info :agentDetailInfo="agentDetailInfo"/>
    </div>

    <company-edit
      :agentBasicInfo="agentBasicInfo"
      :agentDetailInfo="agentDetailInfo"
      :infoEdit="infoEdit"
      @closeConfirm="closeConfirm"
      @submitConfirm="submitConfirm"
    />
  </div>
</template>

<script>
  import basicInfo from './basic-info'
  import detailedInfo from './detailed-info'
  import companyEdit from './company-info-edit'
  const moment  = require('moment')
  export default {
    name: 'company-info-desc',
    components: {
      basicInfo,
      detailedInfo,
      companyEdit
    },
    data() {
      return {
        agentBasicInfo:{},
        agentDetailInfo:{},
        infoEdit: false,
        infoBasic: true
      }
    },
    mounted(){
      const routeQuery = this.$route.query
      if (routeQuery && routeQuery.agentCode) {
        this.getAgentList(routeQuery.agentCode)
      }
    },
    methods: {
      getAgentInfo(agentCode) {
        this.$store.dispatch('getAgentInfo', { agentCode }).then(getData => {
          if (getData.code === 200 && getData.dataMap) {
            const { agentBasicResult, agentDetailResult } = getData.dataMap
            this.agentBasicInfo = agentBasicResult
            this.agentDetailInfo = agentDetailResult
            console.log(agentBasicResult)
          } else {
            // this.$alart('获取供应商信息失败')
          }
        })
      },
      async getAgentList(param) {
        let list= await this.$store.dispatch('FETCH_AGENT_DETAIL', {
          agentCode:param
        })
        if(list.code===200){
          const { agentBasicResult, agentDetailResult } = list.dataMap
          switch (agentBasicResult.agentLevel) {
            case 0:
              agentBasicResult.agentGrade = '大客户'
              break
            case 1:
              agentBasicResult.agentGrade = '一级代理商'
              break
            case 2:
              agentBasicResult.agentGrade = '二级代理商'
              break
            case 3:
              agentBasicResult.agentGrade = '三级代理商'
              break
          }
          agentBasicResult.agentAddress= agentBasicResult.agentArea.replace(/\//g, '')

          this.agentBasicInfo = agentBasicResult
          switch (agentDetailResult.companyNature) {
            case 1:
              agentDetailResult.companyType = '国有企业'
              break
            case 2:
              agentDetailResult.companyType = '集体企业'
              break
            case 3:
              agentDetailResult.companyType = '联营企业'
              break
            case 4:
              agentDetailResult.companyType = '股份合作制企业'
              break
            case 5:
              agentDetailResult.companyType = '私营企业'
              break
            case 6:
              agentDetailResult.companyType = '有限责任公司'
              break
            case 7:
              agentDetailResult.companyType = '股份有限公司'
              break
            case 8:
              agentDetailResult.companyType = '其他'
              break

          }

          if(agentDetailResult.establishedTime){
            agentDetailResult.foundTime= moment(agentDetailResult.establishedTime).format("YYYY-MM-DD")
          }else {
            agentDetailResult.foundTime=''
          }
          agentDetailResult.editTime=this.StrToGMT(agentDetailResult.foundTime)
          console.log( agentDetailResult.editTime)
          this.agentDetailInfo = agentDetailResult
        }else {
          this.$message({
            message: '请检查代理商账号信息',
            type: 'warning'
          });
        }

      },
      StrToGMT(time){
        let GMT = new Date(time)
        return GMT
      },
      editInfo() {
        const accountAuditStatus = JSON.parse(this.$cookie.get('accountAuditStatus'))
        if( accountAuditStatus&& accountAuditStatus.accountAuditStatus!==4){
          this.$message({
            message: '账号处于审核中，不能修改，请等待',
            type: 'warning'
          });

        }else {
          this.infoEdit = true
          this.infoBasic = false
        }

      },
      closeConfirm() {
        this.infoEdit = false
        this.infoBasic = true
      },
      submitConfirm() {
        this.infoEdit = false
        this.infoBasic = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .company-edit {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }

</style>
