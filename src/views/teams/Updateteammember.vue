<template>
    <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
      <TopBar :username="this.StateUsername()"/>
       <section-header-component name="ADD A NEW TEAM MEMBER" description="development" back_page=""/>
        
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
     
         <form class="col s12" >
            <div v-if="this.create_url != 'erro'">
                <img class="centered-image speaker-img" style="height:200px;" :src="this.url_image" >
                <br>
                <br>
            </div>
            <div v-else>
                <blockquote class="create-error">
                    Member image missing! Please, upload one
                </blockquote> 
            </div>

           <div class="row">
             <div class="input-field col s5 boxname">
               <input id="name" name="name" type="text" v-model="name"  class="validate" required maxlength="100">
               <label for="name">Name</label>
             </div>
   
             <div class="input-field col s1 box" :class="{boxname:detectext(ist_id)}" maxlength="10">
               <input id="ist_id" name="ist_id" v-model="ist_id" type="text">
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
                <input class="with-gap" type="radio" value="True" v-model="background_bool"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" type="radio" value="False" v-model="background_bool"/>
                <span>No</span>
                </label>
            </p>
          </div>



           <div class="file-field input-field" style="width:500px;">
             <div class="btn">
               <i class="material-icons left">add_a_photo</i>
               <span v-if="this.create_url != 'erro'">change image</span>
               <span v-else>add image</span>
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
           <button type="submit"  v-on:click="updatingTeamMember" class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">save</i>Save Member</button>
         </form>
       </div>
       <form onsubmit="return confirm('Are you sure you want to delete this member?');">
        <button class="waves-effect red darken-2 btn delete-btn left" v-on:click="deletingTeamMember"><i class="material-icons left">clear</i>Delete Member</button>
       </form>
       
   </div>
   
     
   
   </template>
   
   <script>
       import axios from 'axios';
       import { mapGetters } from "vuex";
       export default {
         name: 'updateteammember-main',
         components: {
          TopBar
       },
       data(){
         return{
          error: null,
          name: '',
          email: '',
          ist_id: '',
          linkedin_url: '',
          background_bool: '',
          fileSelected: null,
          fileToUpload: null,
          image: null,
          url_image: '',
          buffer64: '',
          bigdata2: [],
          create_url: '',
          bigdata3: '', 
          role:''
         }
       },
       methods: {
        ...mapGetters(["getRole"]),
        ...mapGetters(["StateUsername"]),
         detectext(stringvar){
           return stringvar!=''; 
         },
         onFileSelected(event){
           this.fileSelected = event.target.files[0].name;
           this.fileToUpload = event.target.files[0];
           this.create_url = '';
           this.url_image = URL.createObjectURL(new Blob([event.target.files[0]]))
         },
         updatingTeamMember(e) {
          e.preventDefault()
          const fd = new FormData();
          fd.append('fd', this.fileToUpload)
          fd.append('name', this.name)
          fd.append('external_id', this.$route.params.externalid)
          fd.append('ist_id', this.ist_id)
          fd.append('email', this.email)
          fd.append('linkedin_url', this.linkedin_url)
          fd.append('background_bool', this.background_bool)
          fd.append('member_external_id', this.$route.params.member_id)

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/update_team_member',fd,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response => this.bigdata2 = response.data)

          this.$router.push({  name: 'teamdashboard-main', params: { externalid : this.$route.params.externalid } })
        },
        deletingTeamMember(e) {
          e.preventDefault()

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/delete_team_member',{external_id : this.$route.params.externalid, member_external_id: this.$route.params.member_id }, {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.bigdata3 = data; })

          this.$router.push({  name: 'teamdashboard-main', params: { externalid : this.$route.params.externalid } })
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
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/members/get_team_member', {external_id : this.$route.params.externalid, member_external_id: this.$route.params.member_id },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.name = data.member.name; this.ist_id = data.member.ist_id; this.linkedin_url = data.member.linkedin_url; this.background_bool = data.member.background_bool; this.email = data.member.email })
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/members/create_url_error', {member_external_id: this.$route.params.member_id },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.create_url = data.error })
          axios({
            url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimagespeaker',
            method: 'POST',
            responseType: 'arraybuffer',
            auth: {
              username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
              password: process.env.VUE_APP_JEEC_WEBSITE_KEY
            },
            data: {
              member_external_id: this.$route.params.member_id,
            }
          }).then(response=>this.forceFileDownload(response, 'img_jeec_member'))
          
       },
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
   
   