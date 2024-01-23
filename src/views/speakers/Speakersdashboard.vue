<template>
 <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'partnerships' || role == 'admin'">
    <top-bar logo="brain.png" username=""/>
    <section-header-component name="SPEAKERS MANAGEMENT" description="Add, edit or delete speakers" back_page="/dashboard/"/>
    <router-link router-link to="/new-speaker">
      <form >
          <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Speaker</button>
      </form>
    </router-link>
    <br> 

    <div class="left" style="margin-left: 30px;">
      <div class="sub_section-title">Events</div>
      <form class="col s12" id="event_form">
        <select v-model="event_chooser" class="form-control" style="height:50px; width: 100px; display: block;" required @change="changeEvent(event_chooser.id)">
          <option v-for="eventt in this.events" :key="eventt.id" :value="eventt"  selected>{{ eventt.name }}</option>
        </select>
      </form>
    </div>
  

    <div class="section-title center-align" style="margin-top:90px;">
        List of Speakers 
    </div>

    <div class="search-bar">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s8">
            <input class="col s12 validate" id="name" name="name" type="text" v-model="search" required>
              <label v-if="search == ''" for="name">search name</label>
            
          </div>
          <button class = "search-btn red btn-floating left"  @click = "eraseSearch"> <i class="material-icons">clear</i> </button>
          <!-- <button type="button" v-on:click="searchspeaker = true" class="btn-floating blue lighten-2 search-btn"><i class="material-icons">search</i>Search</button> -->
        </div>
      </form>
      <!-- <button v-if="search != ''" class = "search-btn red btn-floating left" style="margin-top: -30px; margin-left: 250px;" @click = "eraseSearch"> <i class="material-icons">clear</i> </button> -->
    </div>
 
      <div class="list">
        <div v-if="error != '' ">
          <blockquote class="create-error">
            {{ error }}
          </blockquote>
        </div>
        <div v-else> 
          <div class="counter right">
            Speakers: {{ filteredSpeakers.length }}
          </div>
        </div>
          

          <table class="striped">
              <thead><tr>
                <th>ID</th>
                <th>Event</th>
                <th>Name</th>
                <th>Company</th>
                <th>Position</th>
                <th>Origin</th>
                <th>Biography</th>
                <th>LinkedIn</th>
              </tr></thead>
              <tbody>
                    <tr v-for="speaker in filteredSpeakers" v-bind:key="speaker.id" >
                      <td>{{ speaker.id }}</td>

                      <td>{{ event_chooser.name }}</td>

                      <td><b>{{ speaker.name }}
                        <div v-if="speaker.spotlight">
                          <i class="material-icons icon-gold">star</i>
                        </div> 
                      </b></td>
                      
                      <td>
                          <div v-if ="speaker.company_link != null " >
                            <a v-bind:href="speaker.company_link">
                              {{ speaker.company }}
                            </a>
                          </div>
                          <div v-else>
                            {{ speaker.company }}
                          </div> 
                      </td>
      
                      <td>
                        <div v-if="speaker.position">
                          {{ speaker.position }}
                        </div>
                      </td>
      
                      <td>
                        <div v-if="speaker.country">
                          {{ speaker.country }}
                        </div>
                      </td>
      
                      <td style="width: 20%">
                        <div v-if="speaker.bio != null ">
                          {{ speaker.bio }}
                        </div>
                      </td>
                      
                      <td>
                        <div v-if="speaker.linkedin_url">
                          <a v-bind:href="speaker.linkedin_url">Check profile</a>
                        </div>
                      </td>
                        

                      <td >
                        <router-link router-link :to="{ name: 'update-speaker', params: { external_id : speaker.external_id }}">
                          <form >
                            <button title="Edit speaker" class="waves-effect waves-light btn-floating"><i class="material-icons left">edit</i>Edit</button>
                          </form>
                        </router-link>
                      </td>
                      <td>
                  <button type="submit" class="waves-effect red btn-floating" @click="deleteSpeaker(speaker.external_id)">
                    <i class="material-icons left">person_remove</i>Delete Speaker</button>
                </td>
                    </tr>
              </tbody> 
          </table> 
      </div>
</div>

</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    export default {
        name: 'dashboard-speaker',
        components: {
      },
      data(){
          return{
              bigdata: [],
              error: '',
              search: '',
              speakers: [],
              role:'',
              events:[],
              event_chooser:[],
              show_speakers:[],
          }
      },
      methods: {
        ...mapGetters(["StateUsername"]),
        ...mapGetters(["getRole"]),

        changeEvent(event){
          this.show_speakers = this.speakers[event - 1]
        },
        eraseSearch(){
          this.search = '';
        },
        deleteSpeaker(external_id) {
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/speaker/delete', {external_id: external_id},{auth: {
            username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
            password: process.env.VUE_APP_JEEC_WEBSITE_KEY
          }}).then(response => {
            const data = response.data;
            this.error = data.error;
            this.speakers = data.speakers;
            this.events = data.events;
            this.show_speakers = this.speakers[this.event_chooser-1];
          })
          this.$router.go()
        },
      },
      computed:{
        filteredSpeakers: function(){
          if(this.search){
            return (this.show_speakers.filter((speaker) => {
            return speaker.name.toLowerCase().match(this.search.toLowerCase());
            })).filter((speaker) => {
            return speaker.event==this.event_chooser.id;
            });
          }
          else{
            return this.show_speakers.filter((speaker) => {
              return speaker.event==this.event_chooser.id;
            });
          }
        }
      },  
      mounted() {
        axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/speakerss',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
          const data = response.data;
          this.speakers = data.speakers;
          this.events = data.events;
        
          for(var i = this.events.length; i != 0; i--){
            if(this.events[i-1].default == true){
              this.event_chooser = this.events[i-1];
              this.show_speakers = this.speakers[i-1];
              break
            } 
          }
          console.log(this.show_speakers)
        }),
        this.role = this.getRole()
      }
  }
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
@import "https://fonts.googleapis.com/css?family=Karla|Lato|Roboto|Raleway|Source+Sans+Pro";

</style>

