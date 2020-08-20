const store = new Vuex.Store({
  state: {
    username: null
  },
  mutations: {
    changeUsername(state, payload) {
      state.username = payload
    }
  },
  /*----------action---------*/
  actions: {
    changeUsername(context, payload) {
      context.commit("changeUsername", payload)
    }
  },

  /*----------getters---------*/
  getters: {
    getUsername(state) {
      return state.username
    }
  }
})
export default store