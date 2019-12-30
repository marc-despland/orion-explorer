import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    client_id: '',
    oauth_collback: '',
    idurl: process.env.VUE_APP_OAUTH_URL,
    id: {
      token: '',
      name: ''
    },
    code: '',
    connected: false,
    orion: process.env.VUE_APP_ORION_URL,
    fiwareService: process.env.VUE_APP_ORION_SERVICE,
    fiwareServicePath: process.env.VUE_APP_ORION_SERVICE_PATH,
    types: [],
    entities: [],
    subscriptions: [],
    loaded: false

  },
  mutations: {
    SET_SETTINGS(state,settings) {
      state.client_id = settings.VUE_APP_CLIENT_ID;
      state.oauth_collback = settings.VUE_APP_REDIRECT_URI;
      state.idurl = settings.VUE_APP_OAUTH_URL;
      state.orion = settings.VUE_APP_ORION_URL;
      state.fiwareService= settings.VUE_APP_ORION_SERVICE;
      state.fiwareServicePath = settings.VUE_APP_ORION_SERVICE_PATH;
      state.loaded=true;
    },
    DISCONNECTED(state) {
      state.id.token = "";
      state.id.name = "";
      state.code = "";
      state.connected = false;
    },
    SET_CONNECTED(state, connection) {
      state.id.token = connection.token;
      state.id.name = connection.name;
      state.code = connection.code;
      state.connected = connection.connected;
    },
    SET_ORION_TYPES(state, types) {
      state.types = types
    },
    SET_ORION_ENTITIES(state, entities) {
      state.entities = entities
    },
    SET_ORION_SUBSCRIPTIONS(state, subscriptions) {
      state.subscriptions = subscriptions
    },
    SET_CONNECTION_PARAM(state, connect) {
      state.orion = connect.orion;
      state.fiwareService = connect.service;
      state.fiwareServicePath = connect.servicePath;
    }
  },
  actions: {
    loadSettings( {commit }) {
      var request = {
        method: 'GET',
        url: "settings.json",
        headers: {},
        json: true
      };
     axios
        .request(request)
        .then(r => r.data)
        .then(settings => {
          commit('SET_SETTINGS', settings)
        })
    },
    signout({ commit }) {
      commit('DISCONNECTED')
    },
    receivedOAuthToken({ commit, state }, token) {
      var connection = {
        code: null,
        token: null,
        name: null,
        connected: false
      };
      if (state.token !== token) {
        connection.token = token;

        var requestUser = {
          method: 'GET',
          url: state.idurl + '/user?access_token=' + connection.token,
          headers: {},
          json: true
        };
        axios
          .request(requestUser)
          .then(r => r.data)
          .then(infos => {
            connection.name = infos.username;
            connection.connected = true;
            commit('SET_CONNECTED', connection)
          })
          .catch(() => {
            commit('DISCONNECTED')
          })
      }
    },
    saveConnectionParam({ commit }, connect) {
      commit('SET_CONNECTION_PARAM', connect);
    },
    loadTypes({ commit, state }) {
      var request = {
        method: 'GET',
        url: state.orion + "/v2/types",
        headers: {},
        json: true
      };
      if (state.connected && state.id.token !== "") request.headers["X-Auth-Token"] = state.id.token;
      if (state.fiwareService != "") request.headers["Fiware-Service"] = state.fiwareService;
      if (state.fiwareServicePath != "") request.headers["Fiware-ServicePath"] = state.fiwareServicePath;
      axios
        .request(request)
        .then(r => r.data)
        .then(types => {
          commit('SET_ORION_TYPES', types)
        })
        .catch(error => {
          if ((error.response!==undefined) && (error.response.status === 401 || error.response.status === 403)) {
            commit('DISCONNECTED')
          }
        })
    },
    loadSubscriptions({ commit, state }) {
      var request = {
        method: 'GET',
        url: state.orion + "/v2/subscriptions",
        headers: {},
        json: true
      };

      if (state.connected && state.id.token !== "") request.headers["X-Auth-Token"] = state.id.token;
      if (state.fiwareService != "") request.headers["Fiware-Service"] = state.fiwareService;
      if (state.fiwareServicePath != "") request.headers["Fiware-ServicePath"] = state.fiwareServicePath;
      axios
        .request(request)
        .then(r => r.data)
        .then(subscriptions => {
          commit('SET_ORION_SUBSCRIPTIONS', subscriptions)
        })
        .catch(error => {
          if ((error.response!==undefined) && (error.response.status === 401 || error.response.status === 403)) {
            commit('DISCONNECTED')
          }
        })
    },
    test({ state }, query) {
      state.query_limit = query.limit;
    },
    loadEntities({ commit, state }, query) {
      var orionQuery = "&";
      if (query.entity.search(/\*/) > -1) {
        orionQuery += "idPattern=" + encodeURI(query.entity);
      } else {
        orionQuery += "id=" + encodeURI(query.entity);
      }
      if (query.type.search(/\*/) > -1) {
        orionQuery += "&typePattern=" + encodeURI(query.type);
      } else {
        orionQuery += "&type=" + encodeURI(query.type);
      }
      if (query.query != '') orionQuery += "&q=" + encodeURI(query.query);
      if (query.limit > 0) orionQuery += "&limit=" + query.limit;
      var request = {
        method: 'GET',
        url: state.orion + "/v2/entities?attrs=dateCreated,dateModified,*" + orionQuery,
        headers: {},
        json: true
      };

      if (state.connected && state.id.token !== "") request.headers["X-Auth-Token"] = state.id.token;
      if (state.fiwareService != "") request.headers["Fiware-Service"] = state.fiwareService;
      if (state.fiwareServicePath != "") request.headers["Fiware-ServicePath"] = state.fiwareServicePath;
      axios
        .request(request)
        .then(r => r.data)
        .then(entities => {
          commit('SET_ORION_ENTITIES', entities)
        })
        .catch(error => {
          if ((error.response!==undefined) && (error.response.status === 401 || error.response.status === 403)) {
            commit('DISCONNECTED')
          }
        })
    },
  },
  getters: {
    isAuthenticated: (state) => () => {
      return (state.connected)
    },
    displayName: (state) => () => {
      return (state.id.name)
    },
    access_token: (state) => () => {
      return (state.id.token)
    },
    loaded: (state) => () => {
      return (state.loaded)
    }
  },
  modules: {
  }
})
