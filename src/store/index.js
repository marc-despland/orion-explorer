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
    types: [],
    entities: []

  },
  mutations: {
    SET_ORION_TYPES (state, types) {
      state.types = types
    },
    SET_ORION_ENTITIES (state, entities) {
      state.entities = entities
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
    },
    test({ state}, query) {
      state.query_limit=query.limit;
      console.log("Limit : "+state.query_limit);
    },
    loadEntities ({ commit, state }, query) {
      var orionQuery="&";
      if (query.entity.search(/\*/)>-1) {
        orionQuery+="idPattern="+encodeURI(query.entity);
      } else {
        orionQuery+="id="+encodeURI(query.entity);
      }
      if (query.type.search(/\*/)>-1) {
        orionQuery+="&typePattern="+encodeURI(query.type);
      } else {
        orionQuery+="&type="+encodeURI(query.type);
      }
      if (query.query!='') orionQuery+="&q="+encodeURI(query.query);
      if (query.limit>0) orionQuery+="&limit="+query.limit;
      var request={
        method: 'GET',
        url: state.orion+"/v2/entities?attrs=dateCreated,dateModified,*"+orionQuery,
        headers: {},
        json: true
      };
      
      if (state.fiwareService!="") request.headers["Fiware-Service"]=state.fiwareService;
      if (state.fiwareServicePath!="") request.headers["Fiware-ServicePath"]=state.fiwareServicePath;
      console.log(JSON.stringify(request));
        axios
          .request(request)
          .then(r => r.data)
          .then(entities => {
          commit('SET_ORION_ENTITIES', entities)
          })
    }
  },
  modules: {
  }
})
