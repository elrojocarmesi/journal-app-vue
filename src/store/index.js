import { createStore } from "vuex"
import journal from "../modules/dayBook/store/journal"
import auth from "../modules/auth/store/auth"

const store = createStore({
  modules: {
    journal,
    auth,
  },
})

export default store
