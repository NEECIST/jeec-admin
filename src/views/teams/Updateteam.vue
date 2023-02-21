<template>
  <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
      <top-bar logo="brain.png" username=""/>
      <section-header-component name="CONTACT TEAM" description="Edit team information" back_page="/teams"/>

      <br>
    <div class="create-form">
      <div v-if="error!=null">
      <blockquote class="create-error">
        {{ error }}
      </blockquote>
      </div>
       
      <form class="col s12">
        <div class="row">
          <div class="input-field col s5 boxname">
            <input id="name" name="name" type="text" class="validate" v-model="name" required>
            <label for="name">Name</label>
          </div>
  
          <div class="input-field col s2" style="margin-left: 30px;">
            <select v-model="eventID" name="event" class="form-control" style="height:60px; width: 100px; display: block;" required>
              <option style="margin-top: 20px;" v-for="event in events" :key="event.id" :value="event.id" selected>{{ event.name }}</option>
            </select>
            <label style="margin-top: -10px;">Event</label>
          </div>
        </div>
  
        <div class="row">
          <div class="input-field col s8 box" :class="{boxname:detectext(description)}">
            <textarea name="description" id="description" v-model="description" class="materialize-textarea" maxlength="300"></textarea>
            <label for="description">Description</label>
          </div>
        </div>
        
        <div class="row">
          <div class="input-field col s8 box" :class="{boxname:detectext(priority)}">
            <input type="number" name="priority" v-model="priority" id="priority" >
            <label for="priority">Priority in the website (bigger values appears first)</label>
          </div>
        </div>

        <form>
           <button type="submit" v-on:click="updateTeam" class="waves-effect blue lighten-2 btn add-btn left"><i
            class="material-icons left">save</i>Save Team</button>
        </form> 
      </form>
    </div>
      <form onsubmit="return confirm('Are you sure you want to delete this team?');">
      <button v-on:click="deleteTeam" class="waves-effect red darken-2 btn delete-btn"><i class="material-icons left">clear</i>Delete
        Team</button>
      </form>
  </div> 
 
    
   
  </template>
  
  <script>
      import axios from 'axios';
      import { mapGetters } from "vuex";
      export default {
      name: 'update-team',
      components: {
      },
      data(){
        return{
          error: '',
          name: '',
          eventID: '',
          events: [],
          select1: 'A',
          description: '',
          priority: '',
          bigdata: [],
          role:''
        }
      },
      methods: {
        ...mapGetters(["getRole"]),
        detectext(stringvar){
          return stringvar!=''; 
        },
        updateTeam(e) {
          e.preventDefault()
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/updateteam',{external_id: this.$route.params.externalid , name: this.name,
            description: this.description, website_priority: this.priority, event_id: this.eventID},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.error = data.error})
          this.$router.push("/teams")
        },
        deleteTeam(e) {
          e.preventDefault()
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/delete',{external_id: this.$route.params.externalid },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.error = data.error})
          this.$router.push("/teams")
        },
         
      },
      mounted() {
        this.role = this.getRole()
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/getteamup',{external_id : this.$route.params.externalid  },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then((response) => 
        {const data = response.data; this.name = data.team.name; this.description = data.team.description; 
        this.priority = data.team.website_priority; this.events = data.events; this.eventID = data.team.event_id})
      }
  }
  </script>
  
  <style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons";
  @import "https://fonts.googleapis.com/css?family=Karla|Lato|Roboto|Raleway|Source+Sans+Pro";
  
  .boxname input:focus ~ label,
  .boxname input:valid ~ label,
  .boxname textarea:focus ~ label,
  .boxname textarea:valid ~ label
  {
    top: -20px;
    left: 10px;
    font-size: 12px;
  }
  
  .box input:invalid ~ label,
  .box input:focus ~ label,
  .box textarea:focus ~ label,
  .box textarea:not(:valid) ~ label
  {
    top: -20px;
    left: 10px;
    font-size: 12px;
  }
  
  </style>
  
  