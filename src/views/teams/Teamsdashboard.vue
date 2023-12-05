<template>
    <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
       <top-bar logo="brain.png" username=""/>
       <section-header-component name="Team Management" description="Add, edit or delete JEEC teams" back_page="/dashboard/"/>
       
  <router-link router-link to="/teams/addteam">
    <form >
      <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Team</button>
    </form>
  </router-link>

  <div class="section-title center-align" style="margin-top:90px; margin-left:100px;">
    List of Teams
  </div>
 
  <div class="search-bar">
    <form class="col s12" >
      <div class="row">
        <div class="input-field col s8">
          <input @input="countMembers" class="col s12 validate" id="name" name="name" type="text" v-model="search" required>

          <label v-if="search == ''" for="name">search name</label>
        </div>
        <button class = "search-btn lighten-2 red btn-floating left" @click = "eraseSearch"> <i class="material-icons">clear</i> </button>
        <!-- <button type="button" v-on:click="searchTeam = true" class="btn-floating blue lighten-2 search-btn"><i class="material-icons">search</i>Search</button> -->
      </div>
    </form>
  </div>


  <div v-if="(search != old_search)">
    <div :set="(old_search = search)"></div>
    <div :set="(update_member_count = false)">
    </div>
  </div>
    
  <div class="left" style="margin-left: 30px;">
    <div class="sub_section-title">Events</div>
    <form class="col s12" id="event_form">
      <select v-model="event" class="form-control" style="height:60px; width: 100px; display: block;" required>
        <option v-for="eventt in this.bigdata.events" :key="eventt.id" :value="eventt.name"  selected>{{ eventt.name }}</option>
      </select>
    </form>
  </div>
 
  <div class="list">
    <blockquote v-if="error != null" class="create-error" style="margin-top: 150px;">
      {{ error }}
    </blockquote>
            
 
    <br>
    <div class="counter right">
      <div>
        Teams: {{ this.teamsFiltradas.length}}
      </div>

      <p>Colaborators: {{ members_count }}</p>
    </div>

    <table class="striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Event</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Members</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in filteredTeams" v-bind:key="team.id">
          <td><b>{{ team.name }}</b></td>

          <td>{{ team.event }}</td>

          <td>
            <div v-if="team.description != ''">
              {{ team.description }}                                
            </div>
          </td>

          <td>
            {{ team.website_priority }}
          </td>

          <td>
            {{ team.members.length }}
          </td>
 
          <td>
            <router-link router-link :to="{ name: 'update-team', params: { externalid : team.external_id }}">
              <form >
                <button title="Edit team" class="waves-effect waves-light btn-floating"><i
                class="material-icons left">edit</i>Edit</button>
              </form>
            </router-link>
            
          </td>

          <td>
            <router-link router-link :to="{ name: 'teamdashboard-main', params: { externalid : team.external_id }}">
              <form >
                <button title="Edit members" class="waves-effect light-blue darken-1 btn-floating"><i
                class="material-icons left">person</i>Members</button>
              </form>
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
    import { mapGetters } from "vuex";
    export default {
        name: 'teamsdashboard-main',
        components: {
      },
      data(){ 
          return{
              bigdata: [],
              error: null,
              printa: '',
              search: '',
              old_search: '',
              searchTeam: true,
              members_count: 0,
              event: '',
              events: [
                  { id: 'A', name: 'JEEC22'},
                  { id: 'B', name: 'EVENT2'},
                  { id: 'C', name: 'EVENT3'}
              ],
              teams: [],
              update_member_count: true,
              teamsFiltradas: [],
              role:''
          }
      },
      methods: {
        ...mapGetters(["getRole"]),
        eraseSearch(){
          this.search = '';
          this.event = '';
        },
        updateMemberCount(){
            this.update_member_count = true;
            this.printa = 'ola'
        },
        countMembers(){
          if(this.event == ''){
            if(this.searchTeam){
              this.teamsFiltradas = this.teams.filter((team) => {
              return team.name.toLowerCase().match(this.search.toLowerCase());
              });
            }
            else{
              this.teamsFiltradas = this.teams;
            }
          }
          else{
            if(this.searchTeam){
              this.teamsFiltradas = (this.teams.filter((team) => {
              return team.name.toLowerCase().match(this.search.toLowerCase());
              })).filter((team) => {
              return team.event.toLowerCase().match(this.event.toLowerCase());
              });
            }
            else{
              this.teamsFiltradas = this.teams;
            }
          }
          this.members_count = 0;
          for (let i = 0; i < this.teamsFiltradas.length; i++){
            this.members_count = this.members_count + this.teamsFiltradas[i].members.length;
          }
        }
      },
      computed:{

        filteredTeams: function(){
          
          if(this.event == ''){
            if(this.searchTeam){
              return this.teams.filter((team) => {
              return team.name.toLowerCase().match(this.search.toLowerCase());
              });
            }
            else{
              return this.teams;
            }
          }
          else{
            if(this.searchTeam){
              return (this.teams.filter((team) => {
              return team.name.toLowerCase().match(this.search.toLowerCase());
              })).filter((team) => {
              return team.event.toLowerCase().match(this.event.toLowerCase());
              });
            }
            else{
              return this.teams;
            }
          }
          
        },
        filteredTeamslen: function(){
          if(this.event == ''){
            if(this.searchTeam){
              return (this.teams.filter((team) => {
              return team.name.toLowerCase().match(this.search.toLowerCase());
              })).length;
            }
            else{
              return this.teams.length;
            }
          }
          else{
            if(this.searchTeam){
              return ((this.teams.filter((team) => {
              return team.name.toLowerCase().match(this.search.toLowerCase());
              })).filter((team) => {
              return team.event.toLowerCase().match(this.event.toLowerCase());
              })).length;
            }
            else{
              return this.teams.length;
            }
          }
           
        }
      },
      mounted() {
        this.role = this.getRole()
        this.search = '';
        this.event = '';
        axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/teams-vue',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.bigdata = data; this.teams = data.teams;
        this.countMembers();})
        
      }
  }
</script>

<style>
   @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
   @import "https://fonts.googleapis.com/icon?family=Material+Icons";
   @import "https://fonts.googleapis.com/css?family=Karla|Lato|Roboto|Raleway|Source+Sans+Pro";
   
</style>
   
   