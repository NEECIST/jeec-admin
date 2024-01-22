<template>
  <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
      <top-bar logo="brain.png" username=""/>
      <section-header-component name="UPDATE TEAM" description="Edit team information" back_page="/teams"/>

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
            <input id="name" name="name" type="text" class="validate" v-model="name" required maxlength="100">
            <label for="name">Name</label>
          </div>
  
          <div class="input-field col s2" style="margin-left: 30px;">
            <select v-model="event_chooser" name="event" class="form-control" style="height:60px; width: 100px; display: block;" required>
              <option style="margin-top: 20px;" v-for="event in events" :key="event.id" :value="event" selected>{{ event.name }}</option>
            </select>
            <label style="margin-top: -10px;">Event</label>
          </div>
        </div>
  
        <div class="row">
          <div class="input-field col s8 box" :class="{boxname:detectext(description)}">
            <textarea name="description" v-model="description" class="materialize-textarea" maxlength="300"></textarea>
            <label for="description">Description</label>
          </div>
        </div>
        
        <div class="row">
          <div class="input-field col s8 box" :class="{boxname:detectext(priority)}">
            <input type="number" name="priority" v-model="priority" id="priority" >
            <label for="priority">Priority in the website (bigger values appears first)</label>
          </div>
        </div>

        <div v-if="this.create_url != 'erro'">
          <img class="centered-image speaker-img" :src="this.url_image" >
        </div>

        <div class="file-field input-field">
            <div class="btn" style="width:300px;position:relative">
              <i class="material-icons left">add_a_photo</i>
              <div v-if="this.create_url != 'erro'">
                <span> change team image </span>
              </div>
              <div v-else>
                <span> add team image </span>
              </div>

              <input type="file" name="file" @change="onFileSelected">
            </div>
            <div class="file-path-wrapper">
              <div v-if="image != null">
                <input class="file-path validate" type="text" :placeholder="image">
              </div>
              <div v-else-if="fileSelected != null">
                <input class="file-path validate" type="text" :placeholder="fileSelected">
              </div>
              <div v-else>
                <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
              </div>
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
          event_chooser: [],
          events: [],
          select1: 'A',
          description: '',
          priority: '',
          bigdata: [],
          role:'',
          image: null,
          create_url:'',
          fileSelected:null,
          fileToUpload:null,
          url_image:'',
        }
      },
      methods: {
        ...mapGetters(["getRole"]),
        detectext(stringvar){
          return stringvar!=''; 
        },
        onFileSelected(event){
          this.fileSelected = event.target.files[0].name;
          this.fileToUpload = event.target.files[0];
          this.create_url = '';
          this.url_image = URL.createObjectURL(new Blob([event.target.files[0]]))
         },
        updateTeam(e) {
          e.preventDefault()

          const fd = new FormData();
          fd.append('team_image', this.fileToUpload)
          fd.append('external_id', this.$route.params.externalid)
          fd.append('name', this.name)
          fd.append('description', this.description)
          fd.append('website_priority', this.priority)
          fd.append('event_id', this.event_chooser.id)
          fd.append('event_name', this.event_chooser.name)

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/updateteam',fd,{auth: {
            username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
            password: process.env.VUE_APP_JEEC_WEBSITE_KEY
          }}).then(response => {const data = response.data; this.error = data.error})
          this.$router.push("/teams")
        },
        deleteTeam(e) {
          e.preventDefault()
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/delete',{external_id: this.$route.params.externalid, event_name: this.event_chooser.name},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.error = data.error})
          this.$router.push("/teams")
        },

        forceFileDownload(response, title) {

          console.log(title)
          console.log(this.create_url)
          if (this.create_url != 'erro') {
            this.url_image = URL.createObjectURL(new Blob([response.data]))
          }
          },
         
      },
      mounted() {
        this.role = this.getRole()
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/get-team-upload',{external_id: this.$route.params.externalid},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then((response) => {
          const data = response.data;
          this.name = data.team.name;
          this.description = data.team.description; 
          this.priority = data.team.website_priority;
          this.events = data.events;
          this.event_chooser = data.team_event;
          console.log(this.event_chooser)
        })

        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/create_url_error_team' ,{external_id: this.$route.params.externalid },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.create_url = data.error })

        axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimageteam',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.externalid,
          }
        }).then(response=>this.forceFileDownload(response, 'img_jeec_team'))
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
  
  