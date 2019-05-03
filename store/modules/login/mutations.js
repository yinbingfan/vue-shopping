const user = {
    state: {
        userInfo: {},
        agentStatusObj: {}
    },
    mutations: {
        // 保存用户信息
        SAVE_UERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        CLEAR_USERINFO(state, userInfo) {
            state.userInfo = {};
        },
        SAVE_AGENTSTATUSOBJ(state, agentStatusObj) {
            state.agentStatusObj = agentStatusObj;
        }
    },
}

export default user;