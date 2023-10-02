// Utilities
import { createStore } from 'vuex'

import { getters }  from "@/store/getters.js";
import { mutations } from "@/store/mutations.js";
import { actions } from "@/store/actions";
/*
import { actions } from "@/store/actions.js";*/

const store = createStore({
  state:{
    api_uri: 'http://127.0.0.1:5000', //todo add API URI
   },
  getters: getters,
  mutations: mutations,
  actions: actions,

})

export default store
