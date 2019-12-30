<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col sm="3"> <label>Orion URL:</label></b-col>
      <b-col sm="9"><b-form-input v-model="myorion"></b-form-input></b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3"> <label>Service:</label></b-col>
      <b-col sm="9"><b-form-input v-model="myservice"></b-form-input></b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3"> <label>Service Path:</label></b-col>
      <b-col sm="9"><b-form-input v-model="myservicePath"></b-form-input></b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="12"><b-button @click="save()">Change configuration</b-button></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  data() { return {
    myorion: this.orion,
    myservice: this.fiwareService,
    myservicePath: this.fiwareServicePath
  }},
  mounted () {
    this.myorion= this.orion;
    this.myservice= this.fiwareService;
    this.myservicePath= this.fiwareServicePath;
  },
  components: {
    
  },
  methods: {
    save: function() {
      var connect= {
        orion:this.myorion,
        service: this.myservice,
        servicePath: this.myservicePath
      }
      this.$store.dispatch('saveConnectionParam', connect);
    }
  },
  computed: mapState(['orion', 'fiwareService', 'fiwareServicePath'])
}
</script>
