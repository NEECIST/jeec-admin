<template>
    <div class="add-activity" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'|| role == 'partnerships'">
      <head-component/>
        
      <body>
        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Activities Management" :description="'Add a new activity to ' + bigdata.event.name" back_page="/activities"/>

        <br>

        <div class="create-form">
          <blockquote v-if="bigdata.error != ''" class="create-error">
            {{ bigdata.error }}
          </blockquote>

          <form class="col s12" action="/admin/activities/new-activity" method="post" id="form">
            <div class="row boxname">
              <div class="input-field col s5">
                <input id="name" v-model="name" type="text" class="validate" required maxlength="100">
                <label for="name">Name</label>
              </div>

              <div class="input-field col s2" style="margin-left: 30px;">
                <p>Activity type</p>
                <select v-model="activity_type_external_id" name="type" class="form-control" style="width: 250px; display: block;" required>
                  <option v-for="tyype in bigdata.event.activity_types" :value="tyype.external_id" :key="tyype.external_id">{{ tyype.name }}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s8 box" :class="{boxname:detectext(description)}">
                <input v-model="description" id="bio" class="materialize-textarea" maxlength="300">
                <label for="description">Description</label>
              </div>
            </div>

            <div class="row s7">

              <div class="input-field col s2 box" :class="{boxname:detectext(day)}">
                <p>Day</p>
                <date-pick
                    v-model="day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
              </div>

              <div class="input-field col s2 box" :class="{boxname:detectext(time)}">
                <p>Starting Time</p>
                <vue-timepicker name="starting_time" v-model="time" required></vue-timepicker>
              </div>

              <div class="input-field col s2 box" :class="{boxname:detectext(end_time)}">
                <p style="margin-left: 40px;">Ending Time</p>
                <vue-timepicker name="end_time" v-model="end_time" required></vue-timepicker>
              </div>
            </div>

            <div class="input-field col s2 box" :class="{boxname:detectext(points)}">
                <input id="points" v-model="points" type="number" min="0" class="validate">
                <label for="points">Points</label>
              </div>


            <div class="flex-container">
              <div class="input-field flex-object">
                <p>Choose Companies to add to activity</p>
                <vue-multi-select
                v-model="companies_external_id"
                search
                :btnLabel="btnLabel2"
                :filters="filters"
                :options="options2"
                :selectOptions="bigdata.companies"/>
              </div>
              <div class="input-field flex-object">
                <p>Choose Volunteers to monitor this activity</p>
                <vue-multi-select
                v-model="volunteers"
                search
                :btnLabel="btnLabel"
                :filters="filters"
                :options="options"
                :selectOptions="bigdata.volunteers"/>
              </div>

              <div class="input-field flex-object">
                <p>Choose tags</p>
                <select v-model="tags_external_id" multiple name="tag" style="height:75px; display: block;">
                  <option value="" disabled></option>
                  <option v-for="tag in bigdata.tags" :key="tag.id" :value="tag.external_id">{{ tag.name }}</option>
                </select>
              </div>

              <div class="input-field flex-object">
                <p>Choose speakers</p>
                <select v-model="speakers_external_id" multiple name="speaker" id="speakers" style="height:75px; display: block;">
                  <option value="" disabled></option>
                  <option v-for="speaker in bigdata.speakers" :key="speaker.id" :value="speaker.external_id">{{ speaker.name }}</option>
                </select>
                
              </div>

              <div class="input-field flex-object">
                <p>Choose Moderator</p>
                <select v-model="moderator_external_id" name="moderator" id="moderator" style="display: block;">
                  <option value="" disabled></option>
                  <option v-for="moderator in bigdata.speakers" :key="moderator.id" :value="moderator.external_id">{{ moderator.name }}</option>
                </select>
              </div>

              <div class="input-field flex-object">
                <p>Choose Reward</p>
                <select v-model="reward_external_id" name="reward" style="display: block;" required>
                  <option value=""></option>
                  <option v-for="reward in bigdata.rewards" :key="reward.id" :value="reward.external_id">{{ reward.name }}</option>
                </select>
              </div>

              
            </div>
            <router-link router-link :to="{ name: 'activities-dashboard' }">
              <button v-on:click="postActivity" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
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
    import { mapGetters, mapMutations } from "vuex";
    import fecha from 'fecha';
    import VueTimepicker from 'vue2-timepicker';
    import axios from "axios";
    import vueMultiSelect from 'vue-multi-select';
    import 'vue-multi-select/dist/lib/vue-multi-select.css';
    import TopBar from '../../components/TopBar.vue';
    export default {
      name: 'add-activity',
      components: {
        DatePick, VueTimepicker,vueMultiSelect,TopBar
      },
      props:{
          
      },
      data(){
        return{
            bigdata: {
              companies:[],
              speakers:[],
              rewards:[],
              tags:[],
              error:"",
              minData:'', maxDate:'',
              event: {},
            },           
            registration_link:'',
            points: '', 
            name:'', description:'', location:'', 
            day:'', time:'', end_time:'', registration_open: 'false', quest: 'false', chat: 'none',
            code_per_company: '',
            format: 'DD MM YYYY, dddd',
            date: fecha.format(new Date(), 'DD MM YYYY, dddd'),

            activity_type_external_id: '',
            companies_external_id: [],
            speakers_external_id: [],
            moderator_external_id: '',
            tags_external_id: [],
            reward_external_id: '',
            role:'',
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
          labelList: 'volunteers.name',
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
        ...mapGetters(["Event_id"]),
        ...mapGetters(["getRole"]),
        ...mapMutations(["setEvent_id"]),
        detectext(stringvar){
          return stringvar!=''; 
        },
        postActivity(e) {
            e.preventDefault()
            if (this.name == '') {
                this.bigdata.error = 'Missing "Name"!'
                return
            }
            if (this.day == '') {
                this.bigdata.error = 'Missing "Day"!'
                return
            }
            if (this.time == '') {
                this.bigdata.error = 'Missing "Starting Time"!'
                return
            }
            if (this.end_time == '') {
                this.bigdata.error = 'Missing "Ending Time"!'
                return
            }
            if (this.activity_type_external_id == '') {
                this.bigdata.error = 'Missing "Activity Type"!'
                return
            }

            console.log(this.activity_type_external_id)

            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-activity_vue',{event_id: this.bigdata.event.external_id, name: this.name, 
                        description: this.description, location: this.location, day: this.day,registration_link: this.registration_link,
                        registration_open: this.registration_open, reward_external_id:this.reward_external_id,
                        time: this.time, end_time: this.end_time,points: this.points, activity_type_external_id: this.activity_type_external_id,
                        username: this.StateUsername(), companies_external_id: this.companies_external_id,
                        speakers_external_id: this.speakers_external_id, moderator_external_id: this.moderator_external_id, 
                        tags_external_id: this.tags_external_id, volunteers: this.volunteers},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data

            if (this.bigdata.error == '') {
                this.$router.push({ name: 'activities-dashboard' })
            }
            else {
                this.$router.push({ name: 'add-activity' })
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
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-activity-get_vue',{event_id: this.Event_id(), username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data
          if (this.bigdata.error != '') {
            this.$router.push({ name: 'activities-dashboard' })
          }})
          this.role = this.getRole()
      }
    }

</script>

<style>
  @import 'vue2-timepicker/dist/VueTimepicker.css';
  .add-activity p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    padding: 0;
    margin-top: 8px;
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
  .flex-container{
    display:flex;
    flex-wrap:wrap;
  }
  .flex-object{
    min-width:100px;
    max-width:200px;
    margin-left:30px;
    margin-right:30px;
  }
</style>