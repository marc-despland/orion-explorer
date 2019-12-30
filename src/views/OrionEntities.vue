<template>
  <div class="orionEntities">
      <ShowEntity :show="showEntity" @close="close()" :entityid="selectedEntity"/>
    <table class="table table-striped">
        <tr>
            <td>Limit : </td>
            <td><input v-model="limit"></td>
            <td>&nbsp;</td>
            <td>Entity Id : </td>
            <td><input v-model="entity"></td>
            <td>&nbsp;</td>
            <td>Type : </td>
            <td><input v-model="type"></td>
        </tr>
        <tr>
            <td>Query : </td>
            <td colspan=5><input v-model="query" class="query"></td>
            <td>&nbsp;</td>
           <td><button @click="loadEntities()">Send</button></td>
        </tr>
    </table>
    <table class="table table-striped fullWidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Date Created</th>
          <th>Date Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id" @click="showTheEntity(entity.id)">
          <td>{{ entity.id }}</td>
          <td>{{ entity.type }}</td>
           <td>{{ entity.dateCreated.value }}</td>
          <td>{{ entity.dateModified.value }}</td>
       </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShowEntity from '@/components/ShowEntity.vue'


export default {
  name: 'orionTypes',
  data() { return {
    showEntity: false,
    selectedEntity: "",
    entity: ".*",
    type: ".*",
    query: "",
    limit: 20
  }},
  components: {
      ShowEntity
  },
  mounted () {
   this.loadEntities();
  },
  computed: mapState([
    'entities'
  ]),
  methods : {
      showTheEntity: async function(id) {
          this.showEntity=true;
          this.selectedEntity=id;
          await this.$nextTick();
      },
      loadEntities: function() {
          var query={
              limit:this.limit,
              entity: this.entity,
              type: this.type,
              query: this.query
          };
          this.$store.dispatch('loadEntities',query)
      },
      close: function(){
        this.showEntity=false;
        this.selectedEntity="";
      }
  }
}

</script>
<style scoped>
.orionEntities {
  text-align: left;
}
.query {
    width: 100%;
}
.fullWidth {
    width: 100%;
}
</style>