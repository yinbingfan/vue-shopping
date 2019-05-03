const actions = {
  /*
  * 获取分类大帽子
  * */
  async FETCH_CATEGORY_LIST({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/config/product/queryHomeCategory`,
      params: params
    })
    return data
  },
  /*
  * 获取分类大中小类
  * */
  async FETCH_PRODUCT_CATEGORY({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/config/product/queryCategory`,
      params: params
    })
    return data
  },

  /*
  * 获取二级页面列表
  * */
  async FETCH_SECOND_PRODUCT_LISTS({ state }, params) {
    const { data } = await this.$axios({
      method: 'post',
      url: `/market/front/product/queryProduct`,
      data: params.defaultQueryParams
    })
    return data
  },
  /*
  * 三级页面产品详情
  * */
  async FETCH_THIRD_PRODUCT({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/market/front/product/getProductDetail/${params.productCode}`,
      // params: params
    })
    return data
  },
  /*
  * 商城图片配置详情
  * */
  async FETCH_HOME_PRODUCT_PIC({ state }, params) {
    const { data } = await this.$axios({
      method: 'get',
      url: `/config/pic/get`,
      params: params
    })
    return data
  },
}
export default actions;
