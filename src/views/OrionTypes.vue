<template>
  <div class="orionTypes">
      <ShowType :show="showType" @close="close()" :type="selectedType"/>
      <div><button @click="refresh()">Refresh</button></div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in types" :key="type.type" @click="showTheType(type.type)">
          <td>{{ type.type }}</td>
          <td>{{ type.count }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShowType from '@/components/ShowType.vue'


export default {
  name: 'orionTypes',
  data() { return {
    showType: false,
    selectedType: ""
  }},
  components: {
      ShowType
  },
  mounted () {
    this.$store.dispatch('loadTypes')
  },
  computed: mapState([
    'types'
  ]),
  methods : {
      showTheType: async function(type) {
          this.showType=true;
          this.selectedType=type;
          await this.$nextTick();
      },
      refresh: function() {
        this.$store.dispatch('loadTypes')
      },
      close: function() {
        this.showType=false;
        this.selectedType="";
      }
  }
}

</script>
