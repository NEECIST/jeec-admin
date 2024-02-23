<template>



<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
  <TopBar :username="this.StateUsername()"/>

    <SectionHeader :name=responsedata.event.name description="Edit the event information" back_page="/events"/>


     
        
  <br>


  <div class="create-form">
    
    <blockquote v-if="responsedata.error!=''" class="create-error">
      {{ responsedata.error }}
    </blockquote>
   

    <form class="col s12" @submit="updateEvent">

<div class="row">
  <div class="input-field col s12">
    <input class="col s5 validate" id="name" name="name" type="text" required placeholder="Name" v-model="responsedata.event.name" maxlength="100">
  </div>

  
  <div class="row">
        <div class="input-field col s2">
          <p>Starting Date</p>
          <date-pick
              v-model="responsedata.event.start_date"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>
        </div>

  
        <div class="input-field col s2">
          <p>Closing Date</p>
          <date-pick
              v-model="responsedata.event.end_date"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>
        </div>


      </div>

     
    


  <!--  o uqe estava vou por as cenas do rui acima
  <div class="input-field col s2">
    <input id="start_date" name="start_date" type="text" class="validate" required placeholder="Start date" v-model="start_date">
  </div>

  <div class="input-field col s2">
    <input id="end_date" name="end_date" type="text" class="validate" required placeholder="End date" v-model="end_date">
  </div>
-->

</div>




<div class="row">
  <div class="input-field col s5">
    <input class="col s12 validate" id="location" name="location" type="text" placeholder="Location" v-model="responsedata.event.location" maxlength="100">
  </div>

  <div class="input-field col s3">
    <input id="email" name="email" type="email" class="validate" placeholder="Contact email" v-model="responsedata.event.email" maxlength="100">
    <span class="helper-text" data-error="wrong format" data-success="right"></span>
  </div>
</div>


<div class="row">
  <div class="input-field col s2">
    <i class="material-icons left">contacts</i>Facebook
    <input id="facebook_link" name="facebook_link" type="url" class="validate" v-model="responsedata.event.facebook_link" maxlength="100">
  </div>

  <div class="input-field col s2">
    <i class="material-icons left">event</i>Facebook event
    <input id="facebook_event_link" name="facebook_event_link" type="url" class="validate" v-model="responsedata.event.facebook_event_link" maxlength="100">
  </div>

  <div class="input-field col s2">
    <i class="material-icons left">movie</i>Youtube
    <input id="youtube_link" name="youtube_link" type="url" class="validate" v-model="responsedata.event.youtube_link" maxlength="100">
  </div>

  <div class="input-field col s2">
    <i class="material-icons left">camera</i>Instagram
    <input id="instagram_link" name="instagram_link" type="url" class="validate" v-model="responsedata.event.instagram_link" maxlength="100">
  </div>
</div>




<div class="row">
  <div class="input-field col s2">
    <p>CV's Submission Start date</p>
          <date-pick
              v-model="responsedata.event.cvs_submission_start"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>
  </div>

  <div class="input-field col s2">
    <p>CV's Submission End date</p>
          <date-pick
              v-model="responsedata.event.cvs_submission_end"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>

  </div>

  <div class="input-field col s2">
    <p>CV's Access Start date</p>
          <date-pick
              v-model="responsedata.event.cvs_access_start"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>

  </div>

  <div class="input-field col s2">
    <p>CV's Access End date</p>
          <date-pick
              v-model="responsedata.event.cvs_access_end"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>

  </div>
</div>



<div class="row">
  <div class="input-field col s2">
    <p>App Game End date</p>
          <date-pick
              v-model="responsedata.event.end_game_day"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              :inputAttributes="{size: 32}"
              required
          ></date-pick>
  
  </div>

  <div class="input-field col s2">
    <p>App Game End Time</p>
    <vue-timepicker v-model="responsedata.event.end_game_time" required></vue-timepicker>

  </div>
</div>



<div style="margin-left: -78vw;">
  <p style="margin-left: 2vw;">Default event for the rest of the Platform:</p>

      <p>
          <label style="margin-right: 20px;">
          <input class="with-gap" type="radio" value="True" required v-model="responsedata.event.default"/>
          <span>Yes</span>
          </label>
          <label>
          <input class="with-gap" type="radio" value="False" required v-model="responsedata.event.default"/>
          <span>No</span>
          </label>
      </p>
  </div>

<br>

<div style="margin-left: -78vw;">
  Show schedule in the JEEC website:
      <p>
          <label style="margin-right: 20px;">
          <input class="with-gap" type="radio" value="True" required v-model="responsedata.event.show_schedule"/>
          <span>Yes</span>
          </label>
          <label>
          <input class="with-gap" type="radio" value="False" required v-model="responsedata.event.show_schedule"/>
          <span>No</span>
          </label>
      </p>
  </div>

  <br>


  <div style="margin-left: -78vw;">
      Show registrations in JEEC website:
      <p>
          <label style="margin-right: 20px;">
          <input class="with-gap" type="radio" value="True" required v-model="responsedata.event.show_registrations"/>
          <span>Yes</span>
          </label>
          <label>
          <input class="with-gap" type="radio" value="False" required v-model="responsedata.event.show_registrations"/>
          <span>No</span>
          </label>
      </p>
  </div>

  <br>

  <div style="margin-left: -78vw;">
      Show prizes in the JEEC website:
      <p>
          <label style="margin-right: 20px;">
          <input class="with-gap" type="radio" value="True" required v-model="responsedata.event.show_prizes"/>
          <span>Yes</span>
          </label>
          <label>
          <input class="with-gap" type="radio" value="False" required v-model="responsedata.event.show_prizes"/>
          <span>No</span>
          </label>
      </p>
  </div>

  <br>

      Logo:
     
      <img v-if="this.url_image1 != null" :src="url_image1" class="company-logo centered-image">
 
      <blockquote v-else class="create-error">
        Logo missing! Please, upload one
      </blockquote>

  <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">image</i>
              <div v-if="this.url_image1 != null">
                <span> Change logo </span>
              </div>
              <div v-else>
                <span> Add logo </span>
              </div>

              <input type="file" name="file" @change="onFileSelected1">
            </div>
            <div class="file-path-wrapper">
              <div v-if="url_image1 != null">
                <input class="file-path validate" type="text" :placeholder="url_image1">
              </div>
              <div v-else-if="fileSelected1 != null">
                <input class="file-path validate" type="text" :placeholder="fileSelected1">
              </div>
              <div v-else>
                <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
              </div>
            </div>
          </div>

          Mobile Logo:
  
      <img v-if="this.url_image2 != null" :src="url_image2" class="company-logo centered-image">

      <blockquote v-else class="create-error">
        Mobile logo missing! Please, upload one
      </blockquote>
     

          <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">smartphone</i>
              <div v-if="this.url_image2 != null">
                <span> Change Mobile </span>
              </div>
              <div v-else>
                <span> Add Mobile </span>
              </div>

              <input type="file" name="file" @change="onFileSelected2">
            </div>
            <div class="file-path-wrapper">
              <div v-if="url_image2 != null">
                <input class="file-path validate" type="text" :placeholder="url_image2">
              </div>
              <div v-else-if="fileSelected2 != null">
                <input class="file-path validate" type="text" :placeholder="fileSelected2">
              </div>
              <div v-else>
                <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
              </div>
            </div>
          </div>



<div class="row">
  Schedule:

      <img v-if="this.url_image3 != null" :src="url_image3" class="company-logo centered-image">

      <blockquote v-else class="create-error">
        Schedule missing! Please, upload one
      </blockquote>

  <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">schedule</i>
              <div v-if="this.url_image3 != null">
                <span> Change Schedule </span>
              </div>
              <div v-else>
                <span> Add Schedule </span>
              </div>

              <input type="file" name="file" @change="onFileSelected3">
            </div>
            <div class="file-path-wrapper">
              <div v-if="url_image3 != null">
                <input class="file-path validate" type="text" :placeholder="url_image3">
              </div>
              <div v-else-if="fileSelected3 != null">
                <input class="file-path validate" type="text" :placeholder="fileSelected3">
              </div>
              <div v-else>
                <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
              </div>
            </div>
          </div>

          Blueprint:
   
      <img v-if="this.url_image4 != null" :src="url_image4" class="company-logo centered-image">

      <blockquote v-else class="create-error">
        Blueprint missing! Please, upload one
      </blockquote>


          <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">home</i>
              <div v-if="this.url_image4 != null">
                <span> Change Blueprint </span>
              </div>
              <div v-else>
                <span> Add Blueprint </span>
              </div>

              <input type="file" name="file" @change="onFileSelected4">
            </div>
            <div class="file-path-wrapper">
              <div v-if="url_image4 != null">
                <input class="file-path validate" type="text" :placeholder="url_image4">
              </div>
              <div v-else-if="fileSelected4 != null">
                <input class="file-path validate" type="text" :placeholder="fileSelected4">
              </div>
              <div v-else>
                <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
              </div>
            </div>
          </div>
</div>


<button type="submit" class="waves-effect blue lighten-2 btn add-btn left"><i
    class="material-icons left">save</i>Save Event</button>
</form>
  </div>
  
  
</div>

</template>

<script>
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import axios from "axios";
import fecha from 'fecha';
import VueTimepicker from 'vue2-timepicker';
import { mapGetters } from "vuex";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: 'edit-event',
  components: {
    TopBar,
    SectionHeader,
    DatePick,
    VueTimepicker,
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      responsedata:{
        event:{},
        error:'',
      },
      url_image1:null,
      fileSelected1:null,
      fileToUpload1:null,
      url_image2:null,
      fileSelected2:null,
      fileToUpload2:null,
      url_image3:null,
      fileSelected3:null,
      fileToUpload3:null,
      url_image4:null,
      fileSelected4:null,
      fileToUpload4:null,
      format: 'DD MM YYYY, dddd',
      date: fecha.format(new Date(), 'DD MM YYYY, dddd'),
      role:''
  };
},
async mounted(){
  this.role = this.getRole()
  await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/event/info',{external_id: this.$route.params.event_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> this.responsedata = response.data)
        console.log("Vamos ver as imagens")
  if(this.responsedata.event.image1){
        console.log("A primeira existe")
    axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimageevent1',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.event_external_id,
          }
        }).then(response=>{
          if(response.data!=''){
            this.forceFileDownload1(response)
          }
        })
  }
  if(this.responsedata.event.image2){
    axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimageevent2',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.event_external_id,
          }
        }).then(response=>{
          if(response.data!=''){
            this.forceFileDownload2(response)
          }
        })
  }
  if(this.responsedata.event.image3){
    axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimageevent3',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.event_external_id,
          }
        }).then(response=>{
          if(response.data!=''){
            this.forceFileDownload3(response)
          }
        })
  }
  if(this.responsedata.event.image4){
    axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimageevent4',
          method: 'POST',
          responseType: 'arraybuffer',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        },
          data: {
            external_id: this.$route.params.event_external_id,
          }
        }).then(response=>{
          if(response.data!=''){
            this.forceFileDownload4(response)
          }
        })
  }
},
methods:{
  ...mapGetters(["getRole"]),
  ...mapGetters(["StateUsername"]),
  onFileSelected1(event){
    this.fileSelected1 = event.target.files[0].name;
    this.fileToUpload1 = event.target.files[0];
    this.url_image1 = URL.createObjectURL(new Blob([event.target.files[0]]))
    },
    onFileSelected2(event){
    this.fileSelected2 = event.target.files[0].name;
    this.fileToUpload2 = event.target.files[0];
    this.url_image2 = URL.createObjectURL(new Blob([event.target.files[0]]))
    },
    onFileSelected3(event){
    this.fileSelected3 = event.target.files[0].name;
    this.fileToUpload3 = event.target.files[0];
    this.url_image3 = URL.createObjectURL(new Blob([event.target.files[0]]))
    },
    onFileSelected4(event){
    this.fileSelected4 = event.target.files[0].name;
    this.fileToUpload4 = event.target.files[0];
    this.url_image4 = URL.createObjectURL(new Blob([event.target.files[0]]))
    },
    updateEvent(e) {
          e.preventDefault()

        const new_event = new FormData();
        new_event.append('external_id', this.$route.params.event_external_id)
        
        new_event.append('name', this.responsedata.event.name)
        
        new_event.append('start_date', this.responsedata.event.start_date)
        
        new_event.append('end_date', this.responsedata.event.end_date)
        
        new_event.append('location', this.responsedata.event.location)
        
        new_event.append('email', this.responsedata.event.email)
        
        new_event.append('facebook_link', this.responsedata.event.facebook_link)
        
        new_event.append('facebook_event_link', this.responsedata.event.facebook_event_link)
        
        new_event.append('youtube_link', this.responsedata.event.youtube_link)
        
        new_event.append('instagram_link', this.responsedata.event.instagram_link)
        
        new_event.append('cvs_submission_start', this.responsedata.event.cvs_submission_start)
        
        new_event.append('cvs_submission_end', this.responsedata.event.cvs_submission_end)
        
        new_event.append('cvs_access_start', this.responsedata.event.cvs_access_start)
        
        new_event.append('cvs_access_end', this.responsedata.event.cvs_access_end)
        
        new_event.append('end_game_day', this.responsedata.event.end_game_day)
        
        new_event.append('end_game_time', this.responsedata.event.end_game_time)
        
        new_event.append('show_in_website', this.responsedata.event.show_in_website)
        
        new_event.append('default', this.responsedata.event.default)
        
        new_event.append('show_schedule', this.responsedata.event.show_schedule)
        
        new_event.append('show_registrations', this.responsedata.event.show_registrations)
        
        new_event.append('show_prizes', this.responsedata.event.show_prizes)
        
        new_event.append('event_image', this.fileToUpload1)
        
        new_event.append('event_mobile_image', this.fileToUpload2)
        
        new_event.append('event_schedule', this.fileToUpload3)
        
        new_event.append('event_blueprint', this.fileToUpload4)
        

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/update-event-vue',new_event,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            this.responsedata.error = response.data
            if(this.responsedata.error==""){
                this.$router.push("/events")
            }
        })
      },
    forceFileDownload1(response) {
      this.url_image1 = URL.createObjectURL(new Blob([response.data]))
    },
    forceFileDownload2(response) {
      this.url_image2 = URL.createObjectURL(new Blob([response.data]))
    },
    forceFileDownload3(response) {
      this.url_image3 = URL.createObjectURL(new Blob([response.data]))
    },
    forceFileDownload4(response) {
      this.url_image4 = URL.createObjectURL(new Blob([response.data]))
    },
    parseDate(dateString, format) {
        return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
        return fecha.format(dateObj, format);
    },
    detectext(stringvar){
      return stringvar!=''; 
    },
}
}

</script>
