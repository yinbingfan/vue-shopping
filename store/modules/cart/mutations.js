
const cart = {
  state: {
    shopCar:0,
    list:{},
    idsArr:[]
  },
  mutations: {
    SAVE_CART_NUM(state, shopCar) {
      state.shopCar = shopCar;
    },
    SAVE_CART_IDS(state, idsArr) {
      state.idsArr = idsArr;
    },
  },
}

export default cart;
