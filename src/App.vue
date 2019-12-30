<template>
  <div id="app">
    <div v-if="!signin">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Orion Explorer</b-navbar-brand>
      </b-navbar>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="12"><b-button :href="signin_uri">Sign In</b-button></b-col>
        </b-row>
      </b-container>
      <!--<a v-bind:href="signin_uri">signin</a>-->
    </div>
    <div v-if="signin">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Orion Explorer</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="home">Home</b-nav-item>
            <b-nav-item to="types">Types</b-nav-item>
            <b-nav-item to="entities">Entities</b-nav-item>
            <b-nav-item to="subscriptions">Subscriptions</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>

              <template v-slot:button-content>
                <em>{{ name }}</em>
              </template>
              <b-dropdown-item @click="signout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  computed: {
    signin () {
      return this.$store.getters.isAuthenticated()
    },
    name () {
      return this.$store.getters.displayName()
    },
    signin_uri() {
      return process.env.VUE_APP_OAUTH_URL+"/oauth2/authorize?response_type=token&client_id="+process.env.VUE_APP_CLIENT_ID+"&state=signin&redirect_uri="+process.env.VUE_APP_REDIRECT_URI;
    }
  },
  methods: {
    signout: function() {
      this.$store.dispatch('signout');
    }
  },
  mounted: function () {
    var token = this.$route.query.token
    if ((this.$route.query.token !== undefined) && (!this.$store.getters.isAuthenticated())) {
      this.$store.dispatch('receivedOAuthToken', token)
    }
  }
}
</script>
