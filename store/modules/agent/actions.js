const actions = {
    async getAgentInfo({ commit, state }, params) {
        let data = {};
        await this.$axios({
            method: "get",
            url: "/agent/getAgentDetail",
            params,
        }).then(getData => {
            console.log(getData, "getData")
            if (getData && getData.data && getData.data.code === 200){
                data = getData.data
            }
               
            // commit("SAVE_AGENTSTATUSOBJ", data.dataMap)
        })
        return data;
    },
    async agentComplete({ commit, state }, params) {
        const { data } = await this.$axios({
            method: "get"
        })
    },
  /*
 * 修改代理商信息
 * */
  async FETCH_AGENT_UPDATE({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/agent/complete`,
      data: params.agentDetailParam
    })
    return data
  },
  /*
  * 代理商信息
  * */
  async FETCH_AGENT_DETAIL({ state }, params) {
    const { data } = await this.$axios({
      method: 'GET',
      url: `/agent/getAgentDetail`,
      params: params
    })
    return data
  },
  /*
  * 上传文件
  * */
  async FETCH_UPLOAD_FILE({ state }, params) {
    const { data } = await this.$axios({
      method: 'POST',
      url: `/file/public/upload`,
      data: params.files
    })
    return data
  },
}
export default actions;
