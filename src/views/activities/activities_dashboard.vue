<template>
  <div class="activities-dashboard">
    <head-component/>
      
      <navbar-component logo="brain.png"/>

      <section-header-component name="Activities Management" description="Manage the activities for each event" back_page="/dashboard"/>

      <div class="left" style="margin-left: 30px;">
        <div class="sub_section-title">Events</div>
        <form class="col s12" id="event_form" method="get">
          <select v-model="selected_event_id" @change="EventSetter(selected_event_id)" name="event" id="event" class="form-control" style="width: 200px; display: block;" required>
            <option value="" disabled></option>
            <option v-for="_event in bigdata.events" :key="_event.id" :value="_event.external_id">{{ _event.name }}</option>
          </select>
        </form>
      </div>
      <br>

      <form v-if="bigdata.role == 'admin' || bigdata.role == 'webdev' || bigdata.role == 'webdev_tl' || bigdata.role == 'business' || bigdata.role == 'coordination'|| bigdata.role == 'partnerships'" method="get">
        <input hidden name="event" :value="bigdata.event.external_id" type="text">
        <router-link router-link :to="{ name: 'activity-types-dashboard' }">
          <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">edit</i>Activity
          Types</button>
        </router-link>
      </form>

      <blockquote v-if="bigdata.event.activity_types.length == 0" class="create-error">
        You haven't created any activity types! Please create one before adding activities
      </blockquote>
      <div v-else>
      <div class="section-title center-align" style="margin-top:90px;">
        Search
      </div>
      <div class="center-align" style="margin-top:10px;">
        by activity type
      </div>

      <div class="search-activity-buttons center-align">
        <router-link router-link :to="{ name: 'activities-dashboard'}" :a_type="''">
          <button v-on:click="changeActivityType('')" class="waves-effect blue lighten-2 btn-small search-type-btn">ALL</button>
        </router-link>
        <a v-for="activity_type in bigdata.event.activity_types" :key="activity_type.id" :href="url_activities_type_event" >
          <router-link router-link :to="{ name: 'activities-dashboard'}">
            <button v-on:click="changeActivityType(activity_type.name)" class="waves-effect blue lighten-2 btn-small search-type-btn">{{ activity_type.name }}</button>
          </router-link>
        </a>
      </div>

      <div class="search-bar">
        <form action="/admin/activities" class="col s12" method="get">
          <input hidden name="event" :value="bigdata.event.external_id" type="text">
          <div class="row">
            <div class="input-field col s8">
              <input class="col s12 validate" id="name_search" v-model="name_search" placeholder="search name" type="text" required>
            </div>

            <button v-if="name_search != ''" class="search-btn red btn-floating left" 
                    style="margin-top: 20px;" @click="eraseSearch"><i class="material-icons">clear</i></button>

            <router-link router-link :to="{ name: 'activities-dashboard'}" :name_search="name_search">
              <button type="submit" class="btn-floating blue lighten-2 search-btn"><i
                  class="material-icons">search</i>Search</button>
            </router-link>
          </div>
        </form>

        <a v-if="search"  class="clear-search" :href="url_for_admin_api_activities_dashboard">clear search results</a>
      </div>

      <form v-if="bigdata.role == 'admin' || bigdata.role == 'webdev' || bigdata.role == 'webdev_tl' || bigdata.role == 'business' || bigdata.role == 'coordination' || bigdata.role == 'partnerships'" method="get">
        <input hidden name="event" :value="bigdata.event.external_id" type="text">
        <router-link router-link :to="{ name: 'add-activity' }">
          <button class="waves-effect blue lighten-2 btn add-btn right"><i
            class="material-icons left">add</i>Activity</button>
        </router-link>
      </form>

      <form v-if="bigdata.role == 'admin' || bigdata.role == 'webdev' || bigdata.role == 'webdev_tl' || bigdata.role == 'business' || bigdata.role == 'coordination' || bigdata.role == 'partnerships'" method="get">
        <input hidden name="event" :value="bigdata.event.external_id" type="text">
        <router-link router-link :to="{ name: 'distribute-rewards' }">
          <button class="waves-effect blue lighten-2 btn add-btn right"><i
            class="material-icons left">add</i>Attribute Rewards</button>
        </router-link>
      </form>

      <br>

      <div class="section-title center-align" style="margin-top:50px;">
        List of activities
      </div>

      <div class="list">
        <blockquote v-if="bigdata.error != ''" class="create-error">
          {{ bigdata.error }}
        </blockquote>
        <table v-else class="striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Day</th>
              <th>Starting Time</th>
              <th>Ending Time</th>
              <th>Location</th>
              <th>Points</th>
              <th>Quest</th>
              <th>Registration Open</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in bigdata.activities" :key=activity.id>
              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.id }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  <b>{{ activity.name }}</b>
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.activity_type.name }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim()))) && 
                       activity.description.length < 75">
                  {{ activity.description }} 
              </td>

              <td v-else-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim()))) && 
                       activity.description.length >= 75">
                  {{ activity.description.substring(0,75) }} 
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.day }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.time }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.end_time }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.location }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                  {{ activity.points }}
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                <i v-if="activity.quest == true" class="material-icons icon-green">check</i>
                <i v-else class="material-icons icon-red">clear</i>
              </td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))">
                <i v-if="activity.registration_open == true" class="material-icons icon-green">check</i>
                <i v-else class="material-icons icon-red">clear</i>
              </td>

              <td v-if="((a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim())))) && activity.day == bigdata.today && 
                       (bigdata.role == 'admin' || bigdata.role == 'webdev' || bigdata.role == 'webdev_tl' || bigdata.role == 'business' || bigdata.role == 'coordination' || bigdata.role == 'partnerships'|| bigdata.role == 'marketing'|| (bigdata.role == 'team' && valid_id(activity.volunteers)))"> 
                <button v-on:click="readCode(activity.external_id)" title="Read QR Code" data-target="modal1" :data-name= activity.external_id 
                  class="waves-effect waves-light green btn-floating modal-trigger code-btn"><i
                    class="material-icons left">qr_code</i>Read Code</button>
              </td>
              <td v-else>{{''}}</td>

              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim()))) && 
                       (bigdata.role == 'admin' || bigdata.role == 'webdev' || bigdata.role == 'webdev_tl' || bigdata.role == 'business' || bigdata.role == 'coordination' || bigdata.role == 'partnerships')">
                <form method="get" style="margin: 0;">
                  <router-link router-link :to="{ name: 'update-activity', params: { activity_id: activity.external_id }}">
                    <button title="Edit activity" class="waves-effect waves-light btn-floating"><i
                      class="material-icons left">edit</i>Edit</button>
                  </router-link>
                </form>
              </td>
              <td v-if="(a_type==activity.activity_type.name || a_type=='') &&
                       ((name_search=='' || activity.name.toLowerCase().includes(name_search.toLowerCase().trim()))) && 
                       (bigdata.role == 'admin' || bigdata.role == 'webdev' || bigdata.role == 'webdev_tl' || bigdata.role == 'business' || bigdata.role == 'coordination' || bigdata.role == 'partnerships')">
                <button type="submit" class="waves-effect red lighten-2 btn-floating" @click="deleteActivity(activity.external_id)">
                  <i class="material-icons left">close</i>Delete Activity</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="modal1" class="modal" style="height: auto;">
        <div class="modal-content">
          <center style="margin-top: 40px;">
            <!--<p><b>You can now write the code. Please choose something readable. If the code format is not valid, a random code will be generated.</b></p>
            <input id="code-input" placeholder="XXXX-XXXX-XXXX-XXXX" maxlength="19">-->

            <div style="margin-top: 40px;">
              <button id="code" class="waves-effect red lighten-2 btn-large dashboard-btn"
                style="width: auto; margin-right: 10px;"><i class="large material-icons left">qr_code</i>Read
                Code</button>

              <button id="copy" class="waves-effect blue lighten-2 btn-large dashboard-btn"
                style="width: auto; margin-left: 10x;"><i class="large material-icons left">content_copy</i>Copy to
                Clipboard</button>
            </div>
          </center>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import axios from "axios";
  import { mapGetters, mapMutations } from "vuex";
  export default {
    name: 'activities-dashboard',
    components: {
      
    },
    props:{
        
    },
    methods: {
      ...mapGetters(["getId"]),
      ...mapGetters(["StateUsername"]),
      ...mapGetters(["Event_id"]),
      ...mapMutations(["setEvent_id"]),
      EventSetter(external_id){
          this.setEvent_id(external_id),
          location.reload()
      },
      deleteActivity(external_id) {
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity/delete_vue',{activity_external_id: external_id},{auth: {
        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
      }}).then(response => 
            {this.bigdata.error = response.data
          if (this.bigdata.error == '') {
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activities_vue',{event_id: this.Event_id(), username: this.StateUsername()},{auth: {
        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
      }} ).then(response => {this.bigdata = response.data
            this.selected_event_id = this.bigdata.event.external_id})
          }})
      },
      valid_id(volunteers){
        for(let i=0;i<volunteers.length;i++){
          if(this.id == volunteers[i]){
            return true
          }
          return false
        }
      },

      changeActivityType: function (activity) {
        this.a_type = activity; 
      },
      eraseSearch(){
          this.name_search = '';
      },
      readCode(activity_ext_id) {
          //e.preventDefault()
          this.$router.push({ name: 'qr-code', params: {activity_external_id: activity_ext_id}})
      },
      deleteCode(activity_ext_id) {
          //e.preventDefault()
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity/codes-delete_vue',{activity_external_id: activity_ext_id, username: this.StateUsername()},{auth: {
        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
      }}).then(response => {this.sucess = response.data
            if (this.sucess != 'Success') {
              this.$router.push({ name: 'activities-dashboard'})
            }
          })
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/code/delete_vue',{code: this.code, username: this.StateUsername()},{auth: {
        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
      }}).then(response => {this.bigdata1 = response.data
          if (this.bigdata1.sucess_bool == 'true') {
            this.$router.push({ name: 'activities-dashboard'})
          }})

          
      }
    },
    data(){
      return{
          bigdata: {
            events:[],
            event: {activity_types: []},
            error: '',
            activities:[],
            role: '',
            bigdata1: {sucess: false},
            today: ''
                      },
          url_for_admin_api_activities_dashboard: '/',
          url_activities_type_event: '/',
          search: '',
          type: '',
          a_type: '',
          name_search:'',
          number: '', code: '', activities_codes: '', 
          sucess: '', activity_external_id: '', selected_event_id: '',
          id:-1
      }
    },
    mounted() {
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activities_vue',{event_id: this.Event_id(), username: this.StateUsername()}, {auth: {
        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
      }}).then(response => {this.bigdata = response.data
      this.selected_event_id = this.bigdata.event.external_id})
      this.id = this.getId()
    }
    
  }

</script>