<template>

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Events Management" description="Add or edit event editions" back_page="/dashboard/"/>




<router-link to="/companies/add-event">
<button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Event</button>
</router-link>


<div class="section-title center-align" style="margin-top:90px;">
List of Events
</div>



<div class="search-bar">
        <form class="col s12" method="post" @submit="search">
          <div class="row">
            <div class="input-field col s8">
              <input class="col s12 validate" v-model="search_str" type="text" required>
              
              <label for="name"></label>
            </div>
            <button type="submit" class="btn-floating blue lighten-2 search-btn"><i class="material-icons">search</i>Search</button>
            <button v-if="search_bool" @click="clearSearch" class="btn-floating red lighten-2 search-btn right"><i class="material-icons">clear</i>clear</button>
          </div>
        </form>
  
        

        
      </div>

<blockquote v-if="responsedata.error!=''"  class="create-error">
            {{ responsedata.error }}
          </blockquote>



<div class="list" v-else>

<div class="counter right">
  Events: {{ events.length }}
</div>

<table class="striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Start date</th>
      <th>End date</th>
      <th>Email</th>
      <th>Location</th>
      <th>CV's Submission Start</th>
      <th>CV's Submission End</th>
      <th>CV's Access Start</th>
      <th>CV's Access End</th>
      <th>End Game Date</th>
      <th>CV's purged</th>
      <th>Facebook event</th>
      <th>Default event</th>
    </tr>
  </thead>
  <tbody>
    
    <tr v-for="event in events" :key="event.id">
      <td><b>{{ event.name }}
        </b></td>

      <td>
        {{ event.start_date }}
    </td>

      <td>
        {{ event.end_date }}
    </td>

      <td>
        {{ event.email }}
    </td>

      <td>
        {{ event.location }}
    </td>

      <td>
        {{ event.cvs_submission_start }}
    </td>

      <td>
        {{ event.cvs_submission_end }}
    
    </td>

      <td>
        {{ event.cvs_access_start }}
    </td>

      <td>
        {{ event.cvs_access_end }}
    </td>

      <td>
        {{ event.end_game_day }} {{ event.end_game_time }}
        
    </td>

      <td>
        
        <i v-if="event.cvs_purged" class="material-icons icon-green">check</i>
        
        <i v-else class="material-icons icon-red">clear</i>
        
        
      </td>

      <td>
    
        <a :href="event.facebook_event_link">Facebook event</a>
    
    </td>

      <td>
    
        <i v-if="event.default" class="material-icons icon-green">check</i>
    
        <i v-else class="material-icons icon-red">clear</i>
      
    </td>

      
      <td v-if="event.cvs_purgeable">
        <form>
          <button disabled title="Purge CV's" class="waves-effect red waves-light btn-floating"><i
              class="material-icons left">layers_clear</i>Purge CV's</button>
        </form>
      </td>

      

      <td>
        <router-link :to="{ name: 'edit-event', params: {event_external_id: event.external_id }}">
          <button title="Edit event" class="waves-effect waves-light btn-floating"><i
              class="material-icons left">edit</i>Edit</button>
        </router-link>
      </td>

    </tr>

</tbody>
</table>

</div>


</div>

</template>

<script>
import axios from 'axios';
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import { mapGetters } from "vuex";
export default {
  name: 'event-dashboard',
  components: {
    TopBar,
    SectionHeader
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      responsedata:{
        events:[],
        error:'',
      },
      search_str:"",
      search_bool:false,
      events:[],
      role:''
  };
},
mounted(){
  this.role = this.getRole()
  axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/events/vue",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}
        ).then(response=>{
    this.responsedata=response.data
    this.events = this.responsedata.events
  })
},
methods:{
  ...mapGetters(["getRole"]),
      search(e){
        e.preventDefault()
        this.search_bool=true
        this.events=[]
        for(var i=0;i<this.responsedata.events.length;i++){
          if(this.responsedata.events[i].name.includes(this.search_str)){
            this.events.push(this.responsedata.events[i])
          }
        }
      },
      clearSearch(){
        this.search_bool=false
        this.events = this.responsedata.events
        this.search_str = ""
      }
    }
}

</script>