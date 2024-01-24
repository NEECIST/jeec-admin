<template>
 <div class="dashboard-main" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
    <TopBar :username="this.StateUsername()"/>
    <section-header-component name="DEVELOPMENT" description="Members" back_page="/teams"/>

    <div>
        <router-link router-link :to="{ name: 'addteammember-main', params: { externalid : this.$route.params.externalid }}">
            <form >
                <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Member</button>
            </form>
        </router-link>
    </div>

    <div class="section-title center-align" style=" margin-top:90px; margin-left: 150px;">
        List of members
    </div>
     
    <div class="search-bar">
        <form class="col s12" >
            <div class="row">
            <div class="input-field col s8">
                <input class="col s12 validate" id="name" name="name" type="text" v-model="search"  required>
                <label v-if="search == ''" for="name">search name</label>

            </div>
            <button class = "search-btn red btn-floating left"  @click = "eraseSearch"> <i class="material-icons">clear</i> </button>
            </div>
        </form>
 
    </div>

    <div class="list">
        <div v-if="error != null">
            <blockquote class="create-error">
              {{ error }}
            </blockquote>
        </div>
        
            <div class="counter right">
                Members: {{ filteredMembers.length }}
            </div>
            <table class="striped">
                <thead><tr>
                <th>Name</th>
                <th>IST_id</th>
                <th>Email</th>
                <th>LinkedIn</th>
                </tr></thead>
                <tbody>
                    <tr v-for="member in filteredMembers" v-bind:key="member.ist_id">
                        <td><b>{{ member.name }}</b></td>
        
                        <td>
                            <div v-if="member.ist_id != ''">
                                {{ member.ist_id }}                                
                            </div>
                        </td>
        
                        <td>
                            <div v-if="member.email != ''">
                                {{ member.email }}                            
                            </div>
                        </td>
        
                        <td>
                            <div v-if="member.linkedin_url != ''">
                                <a href="">{{ member.linkedin_url }}</a>                            
                            </div>
 
                        </td>
                         
                        <td >
                        <router-link router-link :to="{ name: 'updateteammember-main', params: { externalid : external_id, member_id: member.external_id }}">
                            <form >
                                <button class="waves-effect waves-light btn-small"><i class="material-icons left">edit</i>Edit</button>
                            </form>
                        </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br>

            <form class="right" onsubmit="return confirm('Are you sure you want to delete all the members in this team?');">
                <button v-on:click="eraseMembers" class="waves-effect red btn-small"><i class="material-icons left">delete</i>Delete all</button>
            </form>
    </div>
</div>

</template>

<script>
        import axios from 'axios';
        import TopBar from '../../components/TopBar.vue';
        import { mapGetters } from "vuex";
        export default {
          name: 'teamdashboard-main',
          components: {
            TopBar
        },
        data(){
            return{
                error: null,
                search: '',
                searchmember: true,
                teamm: {id:'1', members: [{name:'Afonso',ist_id: '1', email: 'afonso.alemao01@gmail.com', linkedin_url: 'https://www.google.com/'}, 
                {name:'Afonso',ist_id: '2', email: 'afo01@gmail.com', linkedin_url: 'https://www.google.com/'}, 
                {name:'germanboy',ist_id: '3', email: 'afonso.alemao01@gmail.com', linkedin_url: 'https://www.google.com/'}]},
                team: [],
                members: [],
                external_id: this.$route.params.externalid,
                bigdata: [],
                role:''
            }
        },
        methods: {
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
          eraseSearch(){
            this.search = '';
          },
          eraseMembers(e) {
            e.preventDefault()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/erase',{external_id: this.external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.bigdata = response.data)
            this.$router.push("/teams/teamsdashboard")
          },
          
        },
        mounted() {
            this.role = this.getRole()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/team/members',{external_id : this.$route.params.externalid  },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.team = data.team; this.members = data.members})

        },
        computed:{
          filteredMembers: function(){
            if(this.searchmember){
              return this.members.filter((member) => {
              return member.name.toLowerCase().match(this.search.toLowerCase());
              });
            }
            else{
              return this.members;
            }
          }
        }
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
@import "https://fonts.googleapis.com/css?family=Karla|Lato|Roboto|Raleway|Source+Sans+Pro";

</style>

