<template>
    <div v-if="show">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header">
                                {{subscription}} &nbsp;&nbsp;
                                    <label class="switch">
                                        <input type="checkbox" v-model="raw">
                                        <span class="slider round"></span>
                                    </label>
                            </slot>
                        </div>
                        <div class="modal-body">
                            <div class="inner-body">
                                <slot name="body">


                                    <div v-if="raw">
                                        <pre> {{ JSON.stringify(ngsi, null, 4) }}</pre>
                                    </div>
                                    <div v-if="!raw">
                                        <table class="table table-striped tableSubscription">
                                            <thead>
                                                <tr>
                                                    <th>Label</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Id</td>
                                                    <td>{{ ngsi.id}}</td>
                                                <tr>
                                                    <td>Description</td>
                                                    <td>{{ ngsi.description}}</td>
                                                <tr>
                                                    <td>Expires</td>
                                                    <td>{{ ngsi.expires}}</td>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>{{ ngsi.status}}</td>
                                                <tr>
                                                    <td>Subject Entities</td>
                                                    <td>{{ JSON.stringify(ngsi.subject.entities)}}</td>
                                                <tr>
                                                    <td>Condition</td>
                                                    <td>{{ JSON.stringify(ngsi.subject.condition)}}</td>
                                                <tr>
                                                    <td>Notifications Sent</td>
                                                    <td>{{ ngsi.notification.timeSent}}</td>
                                                <tr>
                                                    <td>Last Notification</td>
                                                    <td>{{ ngsi.notification.lastNotification}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Notification Attributes</td>
                                                    <td>{{ JSON.stringify(ngsi.notification.attrs)}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Only Changed Attributes</td>
                                                    <td>{{ ngsi.notification.onlyChangedAttrs}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Attributes Format</td>
                                                    <td>{{ ngsi.notification.attrsFormat}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Notification Endpoint</td>
                                                    <td>{{ JSON.stringify(ngsi.notification.http)}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Failure</td>
                                                    <td>{{ ngsi.notification.lastFailure}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Failure Reason</td>
                                                    <td>{{ ngsi.notification.lastFailureReason}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Success</td>
                                                    <td>{{ ngsi.notification.lastSuccess}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Success Code</td>
                                                    <td>{{ ngsi.notification.lastSuccessCode}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
    name: 'ShowSubscription',
    props: ['show', 'subscription'],
    data() { return {
        ngsi:{},
        raw: false
    }},
    mounted () {

    },
    methods: {

    
    },
    watch: { 
            subscription: function(newVal, oldVal) { // watch 
                console.log("New type "+newVal+" "+oldVal);
                if ((newVal!=oldVal) && (newVal!="")) {
                    var i=0;
                    while (i<this.subscriptions.length && this.subscriptions[i].id!=this.subscription) i++;
                    if (i<this.subscriptions.length) this.ngsi=this.subscriptions[i];
                }
                console.log(JSON.stringify(this.subscriptions,null,4));
            }
        },
    computed: {
            attributes: function() {
                console.log("ngsi = "+JSON.stringify(this.ngsi));
                console.log("attrs = "+JSON.stringify(this.ngsi.attrs));
                return this.ngsi.attrs;
            },
            ...mapState(['subscriptions'])
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
  max-width: 600px;
  min-width: 400px;
  width:80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.tableType {
    width: 90%;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  overflow: hidden;
}
.inner-body {
  max-height: 300px;
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
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


</style>
