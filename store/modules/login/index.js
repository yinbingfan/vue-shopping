import actions from "./actions";
import mutations from "./mutations"

export default {
  state: mutations.state,
  actions,
  mutations: mutations.mutations,
  // getters
}