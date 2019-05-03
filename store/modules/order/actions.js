const actions = {
  /*
 *	订单列表
 * */
  async FETCH_ORDER_LIST({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/market/agent/order/queryOrder`,
      params: params.param
    })
    return data
  },

  /*
  * 代理商确认收货
  * purchaseOrderId 订单id
  * */
  async FETCH_ORDER_CONFIRM({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/confirmReceipt`,
      data: params
    })
    return data
  },
  /*
  * 待提交订单
  * */
  async FETCH_ORDER_SUBMIT({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/submit`,
      data: params
    })
    return data
  },

  /*
  * addOrderProduct
  * 新增产品
  * private String mallOrderCode;//主订单
private String productCode;//产品的
private Integer quantity;//数量
  * */
  async FETCH_ORDER_ADD_PRODUCT({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/addOrderProduct`,
      data: params
    })
    return data
  },
  /*
  * 删除产品
  * delOrderProduct
  * */
  async FETCH_ORDER_DEL_PRODUCT({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/delOrderProduct`,
      data: params
    })
    return data
  },
  /*
  * 变更产品
  * modifyOrderProduct
  * */
  async FETCH_ORDER_MODIFY_PRODUCT({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/modifyOrderProduct`,
      data: params
    })
    return data
  },
  /*
  * 变更获取产品
  * front/product/queryProductByCategory
  * */
  async FETCH_ORDER_GET_PRODUCT({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/front/product/queryProductByCategory`,
      data: params
    })
    return data
  },
  /*
  * 待提交订单修改数量
  * */
  async FETCH_ORDER_MODIFY_PRODUCT_NUMBER({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/agent/order/modifyOrderProductNumber`,
      data: params
    })
    return data
  },
  //queryPreReceived

  async FETCH_ORDER_RECEIVED({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/market/agent/order/queryPreReceived`,
      params: params.param
    })
    return data
  },


}
export default actions;
