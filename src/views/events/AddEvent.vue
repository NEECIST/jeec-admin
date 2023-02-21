<template>

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Events Management" description="Add a new event" back_page="/events"/>

  <br>

  <div class="create-form">
    <div v-if="error != ''">
      <blockquote class="create-error">
        {{ error }}
      </blockquote>
    </div>


    <form class="col s12" @submit="create_event_vue">

      <div class="row">
        <div class="input-field col s12">
          <input class="col s5 validate" id="name" name="name" type="text" required placeholder="Name" v-model="name">
        </div>

        
        <div class="row">
              <div class="input-field col s2">
                <p>Starting Date</p>
                <date-pick
                    v-model="start_date"
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
                    v-model="end_date"
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
          <input class="col s12 validate" id="location" name="location" type="text" placeholder="Location" v-model="location">
        </div>

        <div class="input-field col s3">
          <input id="email" name="email" type="email" class="validate" placeholder="Contact email" v-model="email">
          <span class="helper-text" data-error="wrong format" data-success="right"></span>
        </div>
      </div>


      <div class="row">
        <div class="input-field col s2">
          <i class="material-icons left">contacts</i>Facebook
          <input id="facebook_link" name="facebook_link" type="url" class="validate" v-model="facebook_link">
        </div>

        <div class="input-field col s2">
          <i class="material-icons left">event</i>Facebook event
          <input id="facebook_event_link" name="facebook_event_link" type="url" class="validate" v-model="facebook_event_link">
        </div>

        <div class="input-field col s2">
          <i class="material-icons left">movie</i>Youtube
          <input id="youtube_link" name="youtube_link" type="url" class="validate" v-model="youtube_link">
        </div>

        <div class="input-field col s2">
          <i class="material-icons left">camera</i>Instagram
          <input id="instagram_link" name="instagram_link" type="url" class="validate" v-model="instagram_link">
        </div>
      </div>




      <div class="row">
        <div class="input-field col s2">
          <p>CV's Submission Start date</p>
                <date-pick
                    v-model="cvs_submission_start"
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
                    v-model="cvs_submission_end"
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
                    v-model="cvs_access_start"
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
                    v-model="cvs_access_end"
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
                    v-model="end_game_day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
        
        </div>

        <div class="input-field col s2">
          <p>App Game End Time</p>
          <vue-timepicker v-model="end_game_time" required></vue-timepicker>
      
        </div>
      </div>



      <div style="margin-left: -78vw;">
        <p style="margin-left: 2vw;">Default event for the rest of the Platform:</p>
      
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" type="radio" value="True" required v-model="defaultevent"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" type="radio" value="False" required v-model="defaultevent"/>
                <span>No</span>
                </label>
            </p>
        </div>

      <br>

      <div style="margin-left: -78vw;">
        Show schedule in the JEEC website:
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" type="radio" value="True" required v-model="show_schedule"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" type="radio" value="False" required v-model="show_schedule"/>
                <span>No</span>
                </label>
            </p>
        </div>

        <br>


        <div style="margin-left: -78vw;">
            Show registrations in JEEC website:
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" type="radio" value="True" required v-model="show_registrations"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" type="radio" value="False" required v-model="show_registrations"/>
                <span>No</span>
                </label>
            </p>
        </div>

        <br>

        <div style="margin-left: -78vw;">
            Show prizes in the JEEC website:
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" type="radio" value="True" required v-model="show_prizes"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" type="radio" value="False" required v-model="show_prizes"/>
                <span>No</span>
                </label>
            </p>
        </div>

        <br>










      <div class="row">
        <div class="file-field input-field col s12" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">image</i>
            <span>Event logo</span>
            <input type="file" name="event_image" @change="onFileSelected($event, 0)">
          </div>
          <div v-if="event_image != null">
            <input class="file-path validate" type="text" :placeholder="event_image.name">
          </div>
          <div v-else>
            <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
          </div>
        </div>

        <div class="file-field input-field col s12" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">smartphone</i>
            <span>Mobile logo</span>
            <input type="file" name="event_mobile_image" @change="onFileSelected($event, 1)">
          </div>

          <div v-if="event_mobile_image != null">
            <input class="file-path validate" type="text" :placeholder="event_mobile_image.name">
          </div>
          <div v-else>
            <input class="file-path validate" type="text" placeholder="use a round .png with <80kB">
          </div>

        </div>
      </div>



      <div class="row">
        <div class="file-field input-field col s12" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">schedule</i>
            <span>Event Schedule</span>
            <input type="file" name="event_schedule" @change="onFileSelected($event, 2)">
          </div>

          <div v-if="event_schedule != null">
            <input class="file-path validate" type="text" :placeholder="event_schedule.name">
          </div>
          <div v-else>
            <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
          </div>

          
        </div>

        <div class="file-field input-field col s12" style="width:500px;">
          <div class="btn">
            <i class="material-icons left">home</i>
            <span>Event Blueprint</span>
            <input type="file" name="event_blueprint" @change="onFileSelected($event, 3)">
          </div>
          
          <div v-if="event_blueprint != null">
            <input class="file-path validate" type="text" :placeholder="event_blueprint.name">
          </div>
          <div v-else>
            <input class="file-path validate" type="text" placeholder="use a round .png with <200kB">
          </div>

        </div>
      </div>


      <button type="submit" class="waves-effect blue lighten-2 btn add-btn left"><i
          class="material-icons left">save</i>Save Event</button>

                          <!-- 
          -->
    </form>
  </div>

</div>



</template>

<script>
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import axios from 'axios';
import fecha from 'fecha';
import VueTimepicker from 'vue2-timepicker';
import { mapGetters } from "vuex";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
    


export default {
  name: 'add-event',
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
  
      name:'',
      start_date: '',
      end_date: '',
      location: '',
      email:'',
      facebook_link:'',
      facebook_event_link:'',
      youtube_link:'',
      instagram_link:'',
      cvs_submission_start:'',
      cvs_submission_end:'',
      cvs_access_start:'',
      cvs_access_end:'',
      end_game_day:'',
      end_game_time:'',
      show_in_website: null,
      defaultevent: null,
      show_schedule: null,
      show_registrations: null,
      show_prizes: null,
      event_image: '',
      event_mobile_image: '',
      event_schedule: '',
      event_blueprint: '',

      error:'',
      role:'',

      
    format: 'DD MM YYYY, dddd',
    date: fecha.format(new Date(), 'DD MM YYYY, dddd'),

  };
},
methods: {
  ...mapGetters(["getRole"]),
      detectext(stringvar){
        return stringvar!=''; 
      },
      onFileSelected(event, id){
        // console.log(event);
        // this.fileSelected = event.target.files[0].name;
        //this.fileToUpload = event.target.files[0];
        switch(id)
        {
          case 0:
            this.event_image = event.target.files[0];
            break;
            
            case 1:
            this.event_mobile_image = event.target.files[0];
              break;

            case 2:
            this.event_schedule = event.target.files[0];
              break;

            case 3:
            this.event_blueprint = event.target.files[0];
              break;
        }
        
      },
      create_event_vue(e) {
          e.preventDefault()

        const new_event = new FormData();
        new_event.append('name', this.name)
        new_event.append('start_date', this.start_date)
        new_event.append('end_date', this.end_date)
        new_event.append('location', this.location)
        new_event.append('email', this.email)
        new_event.append('facebook_link', this.facebook_link)
        new_event.append('facebook_event_link', this.facebook_event_link)
        new_event.append('youtube_link', this.youtube_link)
        new_event.append('instagram_link', this.instagram_link)
        new_event.append('cvs_submission_start', this.cvs_submission_start)
        new_event.append('cvs_submission_end', this.cvs_submission_end)
        new_event.append('cvs_access_start', this.cvs_access_start)
        new_event.append('cvs_access_end', this.cvs_access_end)
        new_event.append('end_game_day', this.end_game_day)
        new_event.append('end_game_time', this.end_game_time)
        new_event.append('show_in_website', this.show_in_website)
        new_event.append('default', this.defaultevent)
        new_event.append('show_schedule', this.show_schedule)
        new_event.append('show_registrations', this.show_registrations)
        new_event.append('show_prizes', this.show_prizes)
        new_event.append('event_image', this.event_image)
        new_event.append('event_mobile_image', this.event_mobile_image)
        new_event.append('event_schedule', this.event_schedule)
        new_event.append('event_blueprint', this.event_blueprint)

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-event-vue',new_event,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response => {
            this.error = response.data
            if(this.error==""){
                this.$router.push("/events")
            }
        })
      },
      parseDate(dateString, format) {
            return fecha.parse(dateString, format);
        },
        formatDate(dateObj, format) {
            return fecha.format(dateObj, format);
        },


    },
    mounted(){
      this.role = this.getRole()
    }
}

</script>

<!--
<script>
    (function ($) {
      $(function () {
        $('#start_date').datepicker({ format: "dd mmm yyyy, ddd" });
        $('#end_date').datepicker({ format: "dd mmm yyyy, ddd" });
        $('#cvs_submission_start').datepicker({ format: "dd mmm yyyy, ddd" });
        $('#cvs_submission_end').datepicker({ format: "dd mmm yyyy, ddd" });
        $('#cvs_access_start').datepicker({ format: "dd mmm yyyy, ddd" });
        $('#cvs_access_end').datepicker({ format: "dd mmm yyyy, ddd" });
        $('#end_game_day').datepicker({ format: "dd mmm yyyy, ddd" });
        $('.timepicker').timepicker({ twelveHour: false });
        $('.parallax').parallax();
      }); // end of document ready
    })(jQuery); 
</script>
-->