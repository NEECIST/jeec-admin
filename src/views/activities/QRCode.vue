<template>
<div class="qr-code">
        <head-component/>
          
        <body>
          <navbar-component logo="brain.png"/>
          <section-header-component name="QR Code Reading" description="Read QR Code of a student for an activity" back_page="/activities"/>

          <div  v-if="this.isAuthenticated()">
            <!--<top-bar :username="BigData.user_name"/>-->
        
            <div >
              <div class="section-header">
                <h2>{{ BigData.activity.name }}</h2>
              </div>
          
              <div class="activity_info" style="padding-left: 15vw; padding-right: 15vw;">
                <div class="activity-basic-info">
                    <div class="activity-location">
                        Location: {{ BigData.activity.location }}
                    </div>
                    <div class="activity-time">
                        Time: {{ BigData.activity.day }} - {{ BigData.activity.time }}
                    </div>
                </div>
          
                <center class="activity-description">
                {{ BigData.activity.description }}
                </center>
            </div>
            </div>
            <div class="square">
              <p class="decode-result">Last result: <b>{{ result }}</b></p>
              
              <div>
                <fullscreen :fullscreen.sync="fullscreen">
                  <div >
                    <button v-if="this.fullscreen" type="button" @click="toggle" class="waves-effect red lighten-2 btn-large dashboard-btn" style="width: auto;margin:5px;"> Leave Fullscreen</button>
                  </div>
                  <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
                    <div v-if="validationSuccess" class="validation-success">
                      Activity Added to {{SmallData.student_username}}
                    </div>
              
                    <div v-if="validationFailure" class="validation-failure">
                      {{SmallData.errorQR}}
                    </div>
              
                    <div v-if="validationPending" class="validation-pending">
                      Validation in progress
                    </div>
                  </qrcode-stream>
                </fullscreen>
        
                <button  class="waves-effect blue lighten-2 btn-large dashboard-btn" type="button" @click="toggle" style="margin:20px;">Fullscreen</button>
              </div>
            </div>
            
           
          </div>
        </body>
</div>
  
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapGetters } from "vuex";
import axios from "axios"


export default {
  name: 'activity-full-detail',
  components: { QrcodeStream },

  data () {
    return {
      BigData:{
        user_name: "",
        activity:{
            location:"",
            name:"",
            day:"",
            time:"",
            registration_link:"",
            registration_open:"",
            description:"",
        },
      },
      SmallData: {
        student_username:"",
        errorQR:""
      },
      error:"",
      isValid: undefined,
      camera: 'auto',
      result: null,
      fullscreen: false
    }
  },
  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },

  methods: {
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    toggle () {
        this.fullscreen = !this.fullscreen
        console.log(this.fullscreen)
      },
    onInit (promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
      this.activity_external_id= this.$route.params.activity_external_id

      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activitiesdashboard_vue/activity/activity_external_idistid',{user: this.StateUsername(), activity_external_id:  this.activity_external_idistid, student_external_id: this.result},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response =>{ this.SmallData = response.data} )
  
      await this.timeout(3000)
      if (this.SmallData.errorQR != ""){
        this.isValid = false
      }
      else{
        this.isValid = true
      }

      await this.timeout(2000)

      this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  },
  mounted() {
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity/qrcode',{activity_external_id: this.$route.params.activity_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.BigData = response.data
    if (this.BigData.error != '') {
        this.$router.push({name: 'activities-dashboard'})
    }})
    this.SmallData.student_username = this.StateUsername()
  },
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.square {
  margin:auto;
  width: 50%;
}
.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}

.flex-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  flex-direction: column;
  
}
.item{
  background-color:  rgb(240,240,240);
  padding:1%;
  border-radius:10%
 }
 
</style>