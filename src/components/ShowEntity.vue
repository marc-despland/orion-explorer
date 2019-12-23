<template>
  <div v-if="show">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              {{entityid}}
            </slot>
          </div>

          <div class="modal-body">
              <div class="inner-body">
            <slot name="body">
                <table class="table table-striped tableEntity">
                    <thead>
                        <tr>
                        <th>Atrribute</th>
                        <th>Type</th>
                        <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, name) in entity" :key="name" >
                        <td>{{ name }}</td>
                        <td v-if="value.type!==undefined">{{ value.type }}</td>
                        <td v-if="value.type!==undefined && typeof value.value ==='object'"><pre>{{ format(value.value) }}</pre></td>
                        <td v-if="value.type!==undefined && typeof value.value !=='object'">{{ value.value }}</td>
                        <td v-if="value.type===undefined" colspan="2">{{ value }}</td>
                    </tr>
                    </tbody>
                </table>
            </slot>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ShowEntity',
  props: ['show', 'entityid'],
  data() { return {
      ngsi:{},
      entity: {}
  }},
  mounted () {

  },
  methods: {
      format: function(value){
          return JSON.stringify(value, null, 4);
      }
 
  },
  watch: { 
        entityid: function(newVal, oldVal) { // watch 
            if (newVal!=oldVal) {
                var i=0;
                while (i<this.entities.length && this.entities[i].id!=this.entityid) i++;
                if (i<this.entities.length) {
                    this.ngsi=this.entities[i];
                    this.entity=this.entities[i];
                }
            }
        }
    },
  computed: {
        ngsiFormated : function() {
            
            console.log(JSON.stringify(this.ngsi, null, 4))
            return JSON.stringify(this.ngsi, null, 4);
        },
        ...mapState(['entities'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.tableEntity {
    width: 90%;
}
.modal-body {
  margin: 20px 0;
  overflow: hidden;
}
.inner-body {
  max-height: 70%;
  overflow-y: scroll;
  text-align: left;
}
.modal-default-button {
  
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
