import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    orion: "http://172.17.0.1:3128",
    fiwareService:"PIXEL",
    fiwareServicePath:"/FRBOD",
    types: []
  },
  mutations: {
    SET_ORION_TYPES (state, types) {
      state.types = types
    }
  },
  actions: {
    loadTypes ({ commit, state }) {
      var request={
        method: 'GET',
        url: state.orion+"/v2/types",
        headers: {},
        json: true
    };
    
    if (state.fiwareService!="") request.headers["Fiware-Service"]=state.fiwareService;
    if (state.fiwareServicePath!="") request.headers["Fiware-ServicePath"]=state.fiwareServicePath;
    console.log(JSON.stringify(request));
      axios
        .request(request)
        .then(r => r.data)
        .then(types => {
        commit('SET_ORION_TYPES', types)
        })
    }
  },
  modules: {
  }
})
