import state from "./state"
import * as actions from "./actions"
import * as getters from "./gettters"
import * as mutations from "./mutations"

const myCostumModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default myCostumModule
