const actions = {
  /*
 * 购物车列表
 * */
  async FETCH_SHOPPING_CART_LIST({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/market/agent/queryShoppingCart`,
      params: params
    })
    return data
  },
  /*
  * 加入购物车
  * */
  async FETCH_ADD_SHOPPING_CART({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/addShoppingCart`,
      data: params
    })
    return data
  },
  /*
  *删除购物车商品
  * 	/market/agent/del
  * */
  async FETCH_DEL_SHOPPING_CART({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/del`,
      data: params
    })
    return data
  },
  /*
  * 修改购物车数量
  * /market/agent/modifyCartNumber
  * */
  async FETCH_MODIFY_CART_NUMBER({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/modifyCartNumber`,
      data: params
    })
    return data
  },

  /*
  * /market/agent/queryCartTotalPrice
  *  购物车总价
  * */
  async FETCH_CART_TOTAL({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/market/agent/queryCartTotalPrice?ids=${params.ids}&agentCode=${params.agentCode}`,
      // params: params
    })
    return data
  },

  /*
  * 新增地址
  * */
  async FETCH_ADD_ADDRESS({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/address/add`,
      data: params
    })
    return data
  },
  /*
  * 删除地址
  * */
  async FETCH_DEL_ADDRESS({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/address/del`,
      data: params
    })
    return data
  },
  /*
  * 设为默认地址
  * */

  async FETCH_SET_ADDRESS({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/address/setDef`,
      data: params
    })
    return data
  },

  /*
  *修改地址
  * */
  async FETCH_MODIFY_ADDRESS({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/address/modify`,
      data: params.param
    })
    return data
  },


  /*
   * 收货地址列表
   * */
  async FETCH_ADDRESS_LIST({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/market/agent/address/find`,
      params: params
    })
    return data
  },
  /*
    * 去下单
    * */
  async FETCH_ORDER_TO({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/goto`,
      data: params
    })
    return data
  },
  /*
  * 提交订单
  * */
  async FETCH_ORDER_ADD({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/addOrder`,
      data: params
    })
    return data
  },
}
export default actions;
