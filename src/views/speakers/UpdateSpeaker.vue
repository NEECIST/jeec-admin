<template>
 <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'partnerships' || role == 'admin'">
    <top-bar logo="brain.png" username=""/>
    <section-header-component name="SPEAKER" description="Edit speaker information" back_page="/speakers"/>
      <br>
    <div>

    </div>
    
     <div class="create-form">
      <div v-if="error != null">
        <blockquote class="create-error">
          {{ error }}
        </blockquote>
      </div>
      
      <form class="col s12">

          

          <br>

          <div class="row s12">
            <div class="input-field col s4 boxname">
              <input id="name" name="name" type="text" class="validate" value="speaker.name" v-model="name" required>
              <label for="name">Name</label>
            </div>
            
            <div class="col" style="margin-left:30px;margin-top:20px;">
            Main Speaker:
              <label style="margin-right: 20px;margin-left:10px;">
                <input class="with-gap" name="spotlight" type="radio" :value="true" v-model="spotlight" checked/>
                <span>Yes</span>
              </label>
              <label>
                  <input class="with-gap" name="spotlight" type="radio" :value="false" v-model="spotlight" checked/>
                  <span>No</span>
              </label>
            </div>
          </div>  

          <div class="row">
            <div class="input-field col s2 box" :class="{boxname:detectext(company)}">
              <input id="company" name="company" type="text" value="speaker.company" v-model="company">
              <label for="company">Company</label>
            </div>
  
          
            <div class="input-field col s2 box" :class="{boxname:detectext(position)}">
              <input id="position" name="position" type="text" value="speaker.position" v-model="position">
              <label for="position">Position</label>
            </div>

            <div class="input-field col s3 box" :class="{boxname:detectext(company_link)}">
              <input id="company_link" name="company_link" type="text" value="speaker.company_link" v-model="company_link">
              <label for="company_link">Company Website</label>
            </div>
          </div>
          

          <div class="row">
            <div class="input-field col s4 box" :class="{boxname:detectext(country)}">
              <input id="country" name="country" type="text" value="country" v-model="country">
              <label for="country">Country</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s9 box" :class="{boxname:detectext(bio)}">
              <textarea id="bio" name="bio" class="materialize-textarea" value="bio" v-model="bio" maxlength="300"> speaker.bio </textarea>
              <label for="bio">Biography</label>
            </div>
          </div>

          <div class="row s12">
            <div class="input-field col s3 box" :class="{boxname:detectext(linkedin_url)}">
              <input id="linkedin_url" name="linkedin_url" type="text" value="linkedin_url" v-model="linkedin_url">
              <label for="linkedin_url">LinkedIn</label>
            </div>

            <div class="input-field col s3 box" :class="{boxname:detectext(youtube_url)}">
              <input id="youtube_url" name="youtube_url" type="text" v-model="youtube_url">
              <label for="youtube_url">Youtube url</label>
            </div>

            <div class="input-field col s3 box" :class="{boxname:detectext(website_url)}">
              <input id="website_url" name="website_url" type="text" v-model="website_url">
              <label for="website_url">Website url</label>
            </div>
          </div>
          <div v-if="this.create_url != 'erro'">
            <img class="centered-image speaker-img" :src="this.url_image" >
          </div>

         <div v-else>
             <blockquote style="text-align: left;" class="create-error">
                 Speaker image missing! Please, upload one
             </blockquote> 
         </div>
                
          <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">add_a_photo</i>
              <div v-if="this.create_url != 'erro'">
                <span> change image </span>
              </div>
              <div v-else>
                <span> add image </span>
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

          <div v-if="this.create_url2 != 'erro'">
              <img class="company-logo" :src="this.url_image2">
          </div>
          <div v-else>
            <blockquote style="text-align: left;" class="create-error">
              Company logo missing! Please, upload one
            </blockquote> 
         </div>
 
          <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">add_a_photo</i>
              <span v-if="this.create_url2 != 'erro'">change company logo</span>
              <span v-else>add company logo</span>
              <input type="file" name="company_logo" @change="onFileSelected2">
            </div>
            <div v-if="company_logo != null">
              <input class="file-path validate" type="text" :placeholder="company_logo">
            </div>
            <div v-else-if="fileSelected2 != null">
              <input class="file-path validate" type="text" :placeholder="fileSelected2">
            </div>
            <div v-else>
              <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
            </div>
          </div>

          <button type="submit" class="waves-effect blue lighten-2 btn add-btn right" v-on:click="updateSpeaker"><i class="material-icons left">save</i>Save Speaker</button>
      </form>
    </div>
</div>

</template>
 
<script>
        import axios from 'axios';
        import {mapGetters} from 'vuex';
        export default {
          name: 'update-speaker',
          components: {
        },
        data(){
          return{
              error: null,
              name: '',
              company: '',
              company_link: '',
              position: '',
              bio: '',
              linkedin_url: '',
              country: '',
              youtube_url: '',
              website_url: '',
              spotlight: '',
              bigdata:[],
              bigdata2:[],
              image: null,
              speaker_old: [],
              speaker: [],
              company_logo: null,
              fileSelected: null,
              fileSelected2: null,
              url_image: '',
              url_image2: '',
              create_url: '',
              create_url2: '',
              fileToUpload: null,
              fileToUpload2: null,
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
          this.create_url = '';
          this.url_image = URL.createObjectURL(new Blob([event.target.files[0]]))
         },
         onFileSelected2(event){
          this.fileSelected2 = event.target.files[0].name;
          this.fileToUpload2 = event.target.files[0];
          this.create_url2 = '';
          this.url_image2 = URL.createObjectURL(new Blob([event.target.files[0]]))
         }, 
         updateSpeaker(e) {
          e.preventDefault()

          const fd = new FormData();
          fd.append('speaker_image', this.fileToUpload)
          fd.append('company_logo', this.fileToUpload2)
          fd.append('name', this.name)
          fd.append('external_id', this.$route.params.external_id)
          fd.append('company', this.company)
          fd.append('company_link', this.company_link)
          fd.append('position', this.position)
          fd.append('country', this.country)
          fd.append('bio', this.bio)
          fd.append('linkedin_url', this.linkedin_url)
          fd.append('youtube_url', this.youtube_url)
          fd.append('website_url', this.website_url)
          fd.append('spotlight', this.spotlight)          
          
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/speaker/speaker_external_id' ,fd,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.bigdata2 = response.data)
          this.$router.push("/speakers")

         },
         
         forceFileDownload(response, title) {

          console.log(title)
          console.log(this.create_url)
          if (this.create_url != 'erro') {
            this.url_image = URL.createObjectURL(new Blob([response.data]))
          }
          
         },
         forceFileDownload2(response, title) {
          console.log(title)
          console.log(this.create_url2)
          if (this.create_url2 != 'erro') {
            this.url_image2 = URL.createObjectURL(new Blob([response.data]))
          }
          
         },
        },
        mounted() {
          this.role = this.getRole()
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/getspeaker', {external_id: this.$route.params.external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; 
          this.bigdata = data; this.speaker = data.speaker; this.name = data.speaker.name; 
          this.company = data.speaker.company; this.company_link = data.speaker.company_link; this.position = data.speaker.position;
          this.country = data.speaker.country; this.bio = data.speaker.bio; this.linkedin_url = data.speaker.linkedin_url; 
          this.youtube_url = data.speaker.youtube_url; this.website_url = data.speaker.website_url, this.spotlight = data.speaker.spotlight })
        
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/speakers/create_url_error_speaker' ,{external_id: this.$route.params.external_id },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.create_url = data.error })
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/speakers/create_url_error_company' ,{external_id: this.$route.params.external_id },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.create_url2 = data.error })

        axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimagespeakerrrr',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.external_id,
          }
        }).then(response=>this.forceFileDownload(response, 'img_jeec_speaker'))

        axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimagescompany',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.external_id,
          }
        }).then(response=>this.forceFileDownload2(response, 'img_jeec_company'))

          
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

