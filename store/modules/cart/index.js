import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  actions,
  getters,
  state:mutations.state,
  mutations:mutations.mutations
}
