<template>  
 <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'partnerships' || role == 'admin'">
    <TopBar :username="this.StateUsername()"/>
    <section-header-component name="SPEAKERS MANAGEMENT" description="Add a new speaker" back_page="/speakers"/>
    <br>
 
    <div class="create-form">
      <div v-if="error != null">
        <blockquote class="create-error">
          {{ error }}
        </blockquote>
      </div>

      <div class="left" style="margin-left: 0px;">
        <div class="sub_section-title">Event</div>
        <form class="col s12" id="event_form">
          <select v-model="event_chooser" class="form-control" style="height:50px; width: 200px; display: block;" required @change="checkOutput(event_chooser)">
            <option v-for="event in this.events" :key="event.id" :value="event.id">{{ event.name }}</option>
          </select>
        </form>
      </div>

      <form class="col s12" >
        <div class="row boxname">
          <div class="input-field col s12">
            <input class="col s4 validate" id="name" name="name" type="text" v-model="name" required maxlength="100">
            <label for="name">Name</label>
          </div>
        </div> 
        <div style="text-align: left;">
          Main Speaker? (will show in the homepage)
          <label style="margin-right: 20px;">
            <input class="with-gap" name="spotlight" type="radio" value="True" v-model="spotlight"/>
            <span>Yes</span>
          </label>
          <label>
              <input class="with-gap" name="spotlight" type="radio" value="False" v-model="spotlight" checked />
              <span>No</span>
          </label>
        </div>
        

        <div class="row box">
          <div class="input-field col s2 box" :class="{boxname:detectext(company)}">
            <input  id="company" name="company" type="text" v-model="company" maxlength="100">
            <label  for="company">Company name</label>
          </div>

          <div class="input-field col s2 box" :class="{boxname:detectext(position)}">
            <input id="position" name="position" type="text" v-model="position" maxlength="100">
            <label for="position">Position in the company</label>
          </div>

          <div class="input-field col s3 box" :class="{boxname:detectext(company_link)}">
            <input id="company_link" name="company_link" type="text" v-model="company_link" maxlength="100">
            <label for="company_link">Company Website</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12 box" :class="{boxname:detectext(country)}">
            <input class="col s4" id="country" name="country" type="text" v-model="country" maxlength="100">
            <label for="country">Country</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s9 box" :class="{boxname:detectext(bio)}">
            <textarea name="bio" id="bio" class="materialize-textarea" maxlength="300" v-model="bio"></textarea>
            <label for="bio">Biography</label>
          </div>
        </div>

        <div class="row s12">
          <div class="input-field col s3 box" :class="{boxname:detectext(linkedin_url)}">
            <input id="linkedin_url" name="linkedin_url" type="text" v-model="linkedin_url" maxlength="100">
            <label for="linkedin_url">LinkedIn url</label>
          </div>

          <div class="input-field col s3 box" :class="{boxname:detectext(youtube_url)}">
            <input id="youtube_url" name="youtube_url" type="text" v-model="youtube_url" maxlength="100">
            <label for="youtube_url">Youtube url</label>
          </div>
          
          <div class="input-field col s3 box" :class="{boxname:detectext(website_url)}">
            <input id="website_url" name="website_url" type="text" v-model="website_url" maxlength="100">
            <label for="website_url">Website url</label>
          </div>
        </div>

        <div class="file-field input-field" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">add_a_photo</i>
            <span>speaker image</span>
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
 
        <div class="file-field input-field" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">add_a_photo</i>
            <span>company logo</span>
            <input type="file" name="company_logo" @change="onFileSelected2">
          </div>
          <div class="file-path-wrapper">
            <div v-if="fileSelected2 != null">
              <input class="file-path validate" type="text" :placeholder="fileSelected2">
            </div>
            <div v-else>
              <input class="file-path validate" type="text" placeholder="use a .png, .jpg, .jpeg or .svg with < 200kB">
            </div>
          </div>
        </div>
   
        <button type="submit" v-on:click="addingSpeaker" class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">save</i>Save Speaker</button>
        <router-link v-if="bigdata.error == '' " router-link to="/speakers">
        </router-link>
        <router-link v-else router-link to="/"></router-link>
      </form>
    </div>
</div>
 
  

</template>

<script>
    import axios from 'axios';
    import { mapGetters } from "vuex";
    import TopBar from '../../components/TopBar.vue';
    export default {
      name: 'addspeaker-main',
      components: {
        TopBar
    },
    data(){
      return{
        companynamevar:'',
        positionvar:'',
        webcompany:'',
        origin:'',
        biovar:'',
        linkedinvar:'',
        youtubevar:'',
        weburlvar:'',
        error: null,
        fileSelected: null,
        fileSelected2: null,
        bigdata: [],
        name: '',
        company: '',
        company_link: '',
        position: '',
        country: '',
        bio: '',
        linkedin_url: '',
        youtube_url: '',
        website_url: '',
        spotlight: '',
        external_id: '',
        fileToUpload: null,
        fileToUpload2: null,
        role:'',
        event_chooser:'',
        events:'',
      }
    },
    methods: {
      ...mapGetters(["getRole"]),
      ...mapGetters(["StateUsername"]),
      checkOutput(output){
        console.log(output)
      },

      detectext(stringvar){
        return stringvar!=''; 
      },
      onFileSelected(event){
       this.fileSelected = event.target.files[0].name;
       this.fileToUpload = event.target.files[0];
      },
      onFileSelected2(event){
          this.fileSelected2 = event.target.files[0].name;
          this.fileToUpload2 = event.target.files[0];
      },
      addingSpeaker(e) {
        e.preventDefault()

        const fd = new FormData();
        fd.append('speaker_image', this.fileToUpload)
        fd.append('company_logo', this.fileToUpload2)
        fd.append('name', this.name)
        fd.append('company', this.company)
        fd.append('company_link', this.company_link)
        fd.append('position', this.position)
        fd.append('country', this.country)
        fd.append('bio', this.bio)
        fd.append('linkedin_url', this.linkedin_url)
        fd.append('youtube_url', this.youtube_url)
        fd.append('website_url', this.website_url)
        fd.append('spotlight', this.spotlight)
        fd.append('event', this.event_chooser)

        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-speaker-vue',fd,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response => {
          this.error = response.data.error
          if(this.error==''){
            this.$router.push("/speakers")
          }
        })
        
      }

    },
    mounted(){
      axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/all_events',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.events = response.data.events),
      this.role = this.getRole()
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

