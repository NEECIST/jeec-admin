<template>
<div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
    <top-bar logo="brain.png" username=""/>
    <section-header-component name="TEAM MANAGEMENT" description="Create a new team" back_page="/teams"/>
    
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
          <select v-model="eventID" name="event" class="form-control" style="height:60px; width: 100px; display: block;" required>
            <option style="margin-top: 20px;" v-for="eventt in this.bigdata.events" :key="eventt.id" :value="eventt.id" selected>{{ eventt.name }}</option>
          </select>
          <label style="margin-top: -10px;">Event</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s8 box" :class="{boxname:detectext(description)}">
          <textarea name="description" v-model="description" class="materialize-textarea" maxlength="300"></textarea>
          <label for="description">Description of the team</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s4 box" :class="{boxname:detectext(priority)}">
          <input type="number" name="website_priority" v-model="priority" id="website_priority" >
          <label for="website_priority">Priority in the website (bigger appears first)</label>
        </div>
      </div>

      <div class="file-field input-field" style="width:500px;">
        <div class="btn">
          <i class="material-icons left">add_a_photo</i>
          <span>team image</span>
          <input type="file" name="speaker_image" @change="onFileSelected">
        </div>
        <div class="file-path-wrapper">
          <div v-if="fileSelected != null">
            <input class="file-path validate" type="text" :placeholder="fileSelected">
          </div>
          <div v-else>
            <input class="file-path validate" type="text" placeholder="use a .png, .jpg, .jpeg or .svg with < 200kB">
          </div>
        </div>
      </div>
 
      <button type="submit" v-on:click="addingTeam" class="waves-effect blue lighten-2 btn add-btn right"><i
          class="material-icons left">save</i>Save Team</button>
    </form>
  </div>
</div> 

  

</template>
 
<script>
    import axios from 'axios';
    import { mapGetters } from "vuex";
    export default {
    name: 'addteam-main',
    components: {
    },
    data(){
      return{
        error: null,
        bigdata: [],
        bigdata2: [],
        eventID: '',
        eventts: [],
        description: '',
        name: '',
        priority: '',
        role:'',
        fileSelected:'',
        fileToUpload:'',
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
      },
      addingTeam(e) {
          e.preventDefault()

          const fd = new FormData();
          fd.append('team_image', this.fileToUpload)
          fd.append('name', this.name)
          fd.append('description', this.description)
          fd.append('website_priority', this.priority)
          fd.append('event_id', this.eventID)

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-team-vue', fd,{auth: {
            username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
            password: process.env.VUE_APP_JEEC_WEBSITE_KEY
          }}).then(response => this.bigdata2 = response.data)
            this.$router.push("/teams")
      },
    },
    mounted() {
      this.role = this.getRole()
      axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/new-team-vue',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.bigdata = response.data)
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

