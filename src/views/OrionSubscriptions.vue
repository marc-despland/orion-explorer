<template>
  <div class="orionSubscriptions">
      <ShowSubscription :show="showSubscription" @close="close()" :subscription="selectedSubscription"/>
      <div><button @click="refresh()">Refresh</button></div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>EndPoint</th>
          <th>Last Success</th>
          <th>Last Failed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subscription in subscriptions" :key="subscription.id" @click="showTheSubscription(subscription.id)">
          <td>{{ subscription.id }}</td>
          <td>{{ subscription.notification.http.url }}</td>
          <td>{{ subscription.notification.lastSuccess }}</td>
          <td>{{ subscription.notification.lastFailure }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShowSubscription from '@/components/ShowSubscription.vue'


export default {
  name: 'orionSubscriptions',
  data() { return {
    showSubscription: false,
    selectedSubscription: ""
  }},
  components: {
      ShowSubscription
  },
  mounted () {
    this.refresh()
  },
  computed: mapState([
    'subscriptions'
  ]),
  methods : {
      showTheSubscription: async function(subscription) {
          console.log("showTheSubscription");
          this.showSubscription=true;
          this.selectedSubscription=subscription;
          await this.$nextTick();
      },
      refresh: function() {
        this.$store.dispatch('loadSubscriptions')
      },
      close: function() {
        this.showSubscription=false;
        this.selectedSubscription="";
      }
  }
}

</script>
