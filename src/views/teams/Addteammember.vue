<template>
 <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
    <top-bar logo="brain.png" username=""/>
    <section-header-component name="DEVELOPMENT" description="Add a new member" back_page=""/>
    <router-link router-link :to="{ name: 'teamdashboard-main', params: { externalid : this.$route.params.externalid }}">
      <form >
        <button style="margin-left:-45vw" class="waves-effect waves-light btn back-btn left"><i class="material-icons left">arrow_back</i>back</button>
      </form>
    </router-link>
  
    <br>
    <div class="create-form">
      <div v-if="error!=null">
        <blockquote class="create-error">
          {{ error }}
        </blockquote>
      </div>

      <form class="col s12" enctype="multipart/form-data">
        <div class="row">
          <div class="input-field col s5 boxname">
            <input id="name" name="name" type="text" v-model="name" class="validate" required maxlength="100">
            <label for="name">Name</label>
          </div>

          <div class="input-field col s1 box" :class="{boxname:detectext(ist_id)}">
            <input id="ist_id" name="ist_id" v-model="ist_id" type="text" maxlength="10">
            <label for="ist_id">IST_id</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s3 box" :class="{boxname:detectext(email)}">
            <input id="email" name="email" type="text" v-model="email" class="validate" maxlength="100">
            <label for="email">Email</label>
          </div>

          <div class="input-field col s3 box" :class="{boxname:detectext(linkedin_url)}">
            <input id="linkedin_url" name="linkedin_url" v-model="linkedin_url" type="text" maxlength="150">
            <label for="linkedin_url">LinkedIn</label>
          </div>
        </div>
        <div style="margin-left: -78vw;">
          Show background in website:
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" name="background_bool" type="radio" value="True" v-model="background_bool"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" name="background_bool" type="radio" value="False" checked v-model="background_bool"/>
                <span>No</span>
                </label>
            </p>
        </div>


        <div class="file-field input-field" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">add_a_photo</i>
            <span>member image</span>
            <input type="file" name="file" @change="onFileSelected">
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
      </form> 
        <button type="submit" @click="onUpload" class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">save</i>Save Member</button>
      
    </div>
     
</div>

  

</template>
 
<script>
    import axios from 'axios';
    import { mapGetters } from "vuex";
    export default {
      name: 'addteammember-main',
      components: {
    },
    data(){
      return{
        error: null,
        name: '',
        ist_id: '',
        email: '',
        linkedin_url: '',
        background_bool: 'False',
        fileSelected: null,
        fileToUpload: null,
        bigdata: [],
        url_image: '',
        role:''
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
 
      onUpload(){

        const fd = new FormData();
        fd.append('fd', this.fileToUpload)
        fd.append('name', this.name)
        fd.append('external_id', this.$route.params.externalid)
        fd.append('ist_id', this.ist_id)
        fd.append('email', this.email)
        fd.append('linkedin_url', this.linkedin_url)
        fd.append('background_bool', this.background_bool)

        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/new-member',fd,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response => this.bigdata2 = response.data)

        this.$router.push({  name: 'teamdashboard-main', params: { externalid : this.$route.params.externalid } })

      }
    },
    mounted(){
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

