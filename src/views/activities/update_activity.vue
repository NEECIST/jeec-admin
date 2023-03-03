<template>
    <div class="update-activity" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'||role == 'partnerships'">
      <head-component/>
        
      <body>
         <navbar-component logo="brain.png"/>

        <section-header-component :name="bigdata.activity.activity_type.name" description="Edit information" back_page="/activities"/>

        <br>

        <div class="create-form">
          <blockquote v-if="bigdata.error != ''" class="create-error">
            {{ bigdata.error }}
          </blockquote>

          <form class="col s12" method="post" enctype="multipart/form-data">
            <br>

            <div class="row">
              <div class="input-field col s5 boxname">
                <input id="name" name="name" type="text" class="validate" v-model="bigdata.activity.name" maxlength="100" required>
                <label for="name">Name</label>
              </div>

              <div class="input-field col s2" style="margin-left: 30px;">
                <p>Activity type</p>
                <select v-model="bigdata.activity_type_external_id" class="form-control" style="width: 250px; display: block;" required>
                  <option value="" disabled></option>
                  <option v-for="type in bigdata.activity_types" :key="type.id" name="type" :value="type.external_id" selected="selected" >{{ type.name }}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s8 box" :class="{boxname:detectext(bigdata.activity.description)}">
                <textarea name="description" class="materialize-textarea" maxlength="300"
                  v-model="bigdata.activity.description"></textarea>
                <label for="description">Description</label>
              </div>
            </div>

            <div class="row s7">
              <div class="input-field col s3 box" :class="{boxname:detectext(bigdata.activity.location)}">
                <input id="location" name="location" type="text" class="validate" v-model="bigdata.activity.location" maxlength="100">
                <label for="location">Location</label>
              </div>

              <div class="input-field col s2 box" :class="{boxname:detectext(bigdata.activity.day)}">
                <p>Day</p>
                <date-pick
                    v-model="bigdata.activity.day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
              </div>

              <div class="input-field col s1 box" :class="{boxname:detectext(bigdata.activity.time)}">
                <p>Starting Time</p>
                <vue-timepicker name="starting_time" v-model="bigdata.activity.time" required></vue-timepicker>
              </div>

              <div class="input-field col s2 box" :class="{boxname:detectext(bigdata.activity.end_time)}">
                <p style="margin-left: 40px;">Ending Time</p>
                <vue-timepicker name="end_time" v-model="bigdata.activity.end_time" required></vue-timepicker>
              </div>
            </div>

            <div class="row s7">
              <div class="input-field col s2 box" :class="{boxname:detectext(bigdata.activity.points)}">
                <input id="points" name="points" type="number" min="0" class="validate" v-model="bigdata.activity.points">
                <label for="points">Points</label>
              </div>
            </div>

            <div class="row s10">
              <div class="col s2">
                <p>Registration Open:</p>
                <p>
                <label style="margin-right: 20px;">
                  <input v-if="bigdata.activity.registration_open" v-model="bigdata.activity.registration_open" class="with-gap" name="registration_open" type="radio" value="true" checked/>
                  <input v-else v-model="bigdata.activity.registration_open" class="with-gap" name="registration_open" type="radio" value="true" />
                  <span>Yes</span>
                </label>
                <label>
                  <input v-if="bigdata.activity.registration_open == false" v-model="bigdata.activity.registration_open" class="with-gap" name="registration_open" type="radio" value="false" checked/>
                  <input v-else v-model="bigdata.activity.registration_open" class="with-gap" name="registration_open" type="radio" value="false" />
                  <span>No</span>
                </label>
                </p>
              </div>

              <div class="col s6">
                <div class="input-field box" :class="{boxname:detectext(bigdata.activity.registration_link)}">
                  <input id="registration_link" name="registration_link" type="url" class="validate"
                    v-model="bigdata.activity.registration_link">
                  <label for="registration_link">Registration url</label>
                </div>
              </div>
            </div>

            
           

            <div class="flex-container">
              <div class="input-field flex-object">
                <p>Choose Companies to add to activity </p>
                <vue-multi-select
                v-model="bigdata.activity.companies"
                search
                :key="loaded"
                :btnLabel="btnLabel2"
                :filters="filters"
                :options="options2"
                :selectOptions="bigdata.companies"/>
              </div>
              <div class="input-field flex-object">
                <p>Choose Volunteers to monitor this activity </p>
                <vue-multi-select
                v-model="bigdata.activity.volunteers"
                search
                :key="loaded"
                :btnLabel="btnLabel"
                :filters="filters"
                :options="options"
                :selectOptions="bigdata.volunteers"/>
              </div>

              <div class="input-field flex-object">
                <p>Choose speakers</p>
                <select v-model="bigdata.speakers_external_id" multiple style="height:75px; width: 250px; display: block;">
                  <option value="" disabled></option>
                  <option v-for="speaker in bigdata.speakers" :key="speaker.id" name="speaker" :value="speaker.external_id" selected="selected" >
                    {{ speaker.name }}</option>
                </select>
              </div>

              <div class="input-field flex-object">
                <p>Choose Moderator</p>
                <select v-model="bigdata.moderator_external_id" style="width: 250px; display: block;">
                  <option value="" disabled></option>
                  <option v-for="moderator in bigdata.speakers" :key="moderator.id" name="moderator" :value="moderator.external_id" selected="selected">{{ moderator.name }}</option>
                </select>
              </div>
            
              <div class="input-field flex-object">
                <p>Choose tags</p>
                <select v-model="bigdata.tags_external_id" multiple style="height:75px; width: 250px; display: block;">
                  <option value="" disabled></option>
                  <option v-for="tag in bigdata.tags" :key="tag.id" name="tag" :value="tag.external_id" selected="selected">
                    {{ tag.name }}</option>
                </select>
              </div>

              <div class="input-field flex-object">
                <p>Choose Reward</p>
                <select v-model="bigdata.reward_external_id" style="width: 250px; display: block;" required>
                  <option value="" disabled></option>
                  <option v-for="reward in bigdata.rewards" :key="reward.id" name="reward" :value="reward.external_id" selected="selected">{{ reward.name
                    }}</option>
                </select>
              </div>

            </div>
            
            <router-link router-link :to="{ name: 'activities-dashboard' }">
              <button v-on:click="updateActivity" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
                  class="material-icons left">save</i>Save Activity</button>
            </router-link>
          </form>
        </div>
      </body>
    </div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import fecha from 'fecha';
    import VueTimepicker from 'vue2-timepicker';
    import axios from "axios";
    import { mapGetters } from "vuex";
    import vueMultiSelect from 'vue-multi-select';
    import 'vue-multi-select/dist/lib/vue-multi-select.css';
    export default {
      name: 'update-activity',
      components: {
        DatePick, VueTimepicker,vueMultiSelect
      },
      props:{
          
      },
      data(){
        return{
            bigdata: {
              error:"",
              activity_types:[],
              activity: { volunteers:[]},
              companies:[],
              speakers:[],
              rewards:[],
              tags:[],
              tags_external_id: [],
              minDate: '',
              maxDate: '',
              activity_type_external_id: '',
              companies_external_id: [],
              speakers_external_id: [],
              moderator_external_id: '',
              reward_external_id: '',
              volunteers:[],
            },
            registration_open: false,
            registration_link:'',
            points: '',
            format: 'DD MM YYYY, dddd',
            date: fecha.format(new Date(), 'DD MM YYYY, dddd'),   
            activity_id: this.$route.params.activity_id,   
            role:'',
            loaded:false,
            volunteers:[{"name":"", "id":""}], 

            filters: [{
              nameAll: 'Select all',
              nameNotAll: 'Deselect all',
              func() {
                return true;
              },
            }],
            options: {
            multi: true,
            groups: false,
            labelList: "volunteers.",
            cssSelected: option => (option.selected ? { 'background-color': '#00A36C' } : ''),
            },
            btnLabel: values => `Select Volunteers (${values.length})`,
            options2: {
            multi: true,
            groups: false,
            labelList: 'companies.name',
            cssSelected: option => (option.selected ? { 'background-color': '#00A36C' } : ''),
            },
            btnLabel2: values => `Select Companies (${values.length})`

        }
      },
      methods: {
        ...mapGetters(["StateUsername"]),
        ...mapGetters(["getRole"]),
        detectext(stringvar){
          return stringvar!=''; 
        },
        updateActivity(e) {
            e.preventDefault()

            if (this.bigdata.activity.name == '') {
                this.bigdata.error = 'Missing "Name"!'
                return
            }
            if (this.bigdata.activity.day == '') {
                this.bigdata.error = 'Missing "Day"!'
                return
            }
            if (this.bigdata.activity.time == '') {
                this.bigdata.error = 'Missing "Starting Time"!'
                return
            }
            if (this.bigdata.activity.end_time == '') {
                this.bigdata.error = 'Missing "Ending Time"!'
                return
            }
            if (this.bigdata.activity_type_external_id == '') {
                this.bigdata.error = 'Missing "Activity Type"!'
                return
            }
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity/update_vue' ,{name: this.bigdata.activity.name, description: this.bigdata.activity.description, 
              location: this.bigdata.activity.location, day: this.bigdata.activity.day, time: this.bigdata.activity.time, 
              end_time: this.bigdata.activity.end_time, registration_link: this.bigdata.activity.registration_link,  
              points: this.bigdata.activity.points,registration_open: this.bigdata.activity.registration_open,
              reward_external_id: this.bigdata.reward_external_id,  
              activity_external_id: this.bigdata.activity.external_id, 
              username: this.StateUsername(), 
              companies_external_id: this.bigdata.companies_external_id, speakers_external_id: this.bigdata.speakers_external_id, 
              moderator_external_id: this.bigdata.moderator_external_id, tags_external_id: this.bigdata.tags_external_id, 
              activity_type_external_id: this.bigdata.activity_type_external_id, volunteers: this.bigdata.activity.volunteers,
              },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data

              if (this.bigdata.error == '') {
                this.$router.push({name: 'activities-dashboard'})
              }
              else {
                this.$router.push({ name: 'update-activity', params: { activity_id: this.activity_id}})
              }})
        },
        parseDate(dateString, format) {
            return fecha.parse(dateString, format);
        },
        formatDate(dateObj, format) {
            return fecha.format(dateObj, format);
        },
      },
      mounted() {
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity_vue', {activity_external_id: this.$route.params.activity_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data, this.loaded = true
          console.log(this.bigdata.companies)
          
          if (this.bigdata.error != '') {
            this.$router.push({name: 'activities-dashboard'})
          }})
          
         
          // this.volunteers = []
          // for(let i = 0; i <)
          this.role = this.getRole()
        
      }
    }

</script>

<style>
  @import 'vue2-timepicker/dist/VueTimepicker.css';

  .update-activity p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    padding: 0;
    margin-top: 4px;
    font-size: 14px;
    font-family: 'Karla';
    font-weight: 500;
    color: #9195a2;
    }
</style>

<style> 
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