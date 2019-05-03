import Vuex from 'vuex';
import loginState from './modules/login';
import homeState from "./modules/home";
import orderState from "./modules/order";
import cartState from "./modules/cart";
import agentState from "./modules/agent"


const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      loginState: loginState,
      homeState,
      orderState,
      cartState,
      agentState,
    }
  });
};

export default createStore
