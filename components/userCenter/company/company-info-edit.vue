<template>
  <div v-if="infoEdit">
    <edit-basic :agentBasicInfo="agentBasicInfo"/>
    <edit-detailed :agentDetailInfo="agentDetailInfo"/>
    <confirm-btn
      @confirmSubmit="confirmSubmit(agentBasicInfo,agentDetailInfo)"
      @confirmClose="confirmClose"/>
  </div>
</template>

<script>
  import editBasic from './edit-basic'
  import editDetailed from './edit-detailed'
  import confirmBtn from './confirm-btn'

  export default {
    name: 'company-info-edit',
    components: {
      editBasic,
      editDetailed,
      confirmBtn
    },
    props: {
      infoEdit: {
        type: Boolean,
        default: false
      },
      agentBasicInfo: {
        type: Object,
        default: () => {
        }
      },
      agentDetailInfo: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      confirmSubmit(agentBasicParam,agentDetailParam) {
        this.agentUpdate(agentBasicParam,agentDetailParam)
      },
      confirmClose() {
        this.$emit('closeConfirm')
      },
      async agentUpdate(agentBasicParam,agentDetailParam) {
        let update= await this.$store.dispatch('FETCH_AGENT_UPDATE', {
          agentDetailParam:agentDetailParam,
        })
        if(update.code===200){
          this.$message({
            message: '企业信息修改成功',
            type: 'success'
          });
          this.$emit('submitConfirm')
        }else {
          this.$message({
            message: '网络错误，企业信息修改失败',
            type: 'error'
          });
        }
      },
    }
  }
</script>

<style lang="less" scoped>
</style>
