const actions = {
    /**
     * 用户登录
     * @param {*} param0 
     * @param {*} params 
     */
    async userLogin({ commit, state }, params) {
        let data = {};
        await this.$axios({
            method: 'get',
            url: `/passport/pc/login`,
            params: params
        }).then(getData => {
            if (getData.data.code === 200) {
                commit("SAVE_UERINFO", getData.data.dataMap.userDetail)
                // console.log(this.$cookie)
               // this.$cookie.set("userDetail", JSON.stringify(getData.data.dataMap.userDetail))
            }

            data = getData.data
        })
        return data

    },
    /**
     * 判断代理商是否完善信息
     * @param {*} param0 
     * @param {*} params 
     */
    async agentPass({ commit, state }, params) {
        let data = {};
        await this.$axios({
            method: "get",
            url: "/agent/getAuditStatus",
            params,
        }).then(getData => {
            if (getData && getData.data && getData.data.code === 200)
                data = getData.data
            commit("SAVE_AGENTSTATUSOBJ", data.dataMap)
        })
        return data;
    },



  async FETCH_PASSWORD_MODIFY({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/passport/pc/password/modify?oldPwd=${params.oldPwd}&newPwd=${params.newPwd}`,
      // data: params
    })
    return data
  },
}
export default actions
