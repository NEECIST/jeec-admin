<template>

    <div class="users-dashboard" v-if="current_user.role == 'webdev' || current_user.role == 'webdev_tl' || current_user.role == 'coordination' || current_user.role == 'admin'">
        <!-- <div v-if="this.isAuthenticated()"> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component
        name="Users Management"
        description="Add or delete system users"
        back_page='/dashboard/'/>

      <router-link to="/addcompanyuser">
      <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Company
        User</button>
      </router-link>
  
    <div class="section-title center-align" style="margin-top:90px;">
      List of Users
    </div>
  
    <div class="search-bar">
        <form class="col s12" method="get">
            <div class="row">
                <div class="input-field col s8">
                    <input v-model="search" class="col s12 validate" id="search" name="search" type="text" required>

                    <label for="search" v-if="search == ''">
                        Search name
                    </label>
                </div>
                <span>
                    <button v-if="search != ''" class="search-btn red btn-floating left" style="margin-top: 20px;" @click="eraseSearch"><i class="material-icons">clear</i></button>
                </span>
            </div>
        </form>
    </div>
  
  
    <div class="list">
      <blockquote class="create-error" v-if="response_data.error!=''">
        {{ response_data.error }}
      </blockquote>
      <div v-else>
      <div class="counter right">
        Users: {{ filteredCompanyUsers.length }}
      </div>
  
      <table class="striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Company</th>
            <th v-if="current_user.role=='admin'">Password</th>
            <th>Food Manager</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company_user in filteredCompanyUsers" :key="company_user.id">
            <td>
              <b>
                {{ company_user.username }}
              </b>
            </td>
  
            <td>
              {{ company_user.name }}
            </td>
  
            <td>
              {{ company_user.company}}
            </td>
  
            <td v-if="current_user.role=='admin'">
              {{ company_user.password }}
            </td>
            <td v-else></td>
  
            <td>
              <i class="material-icons icon-green" v-if="company_user.food_manager">check</i>
              <i class="material-icons icon-red" v-else>clear</i>
            </td>
  
            <td>
                <button v-if="current_user!=company_user.username&&(current_user.role=='admin'||current_user.role=='webdev_tl')" title="Delete user" class="waves-effect waves-light btn-floating" @click="deleteUser(company_user.external_id)"><i
                    class="material-icons left">delete</i>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <!-- </div> -->
    <!-- <h2 v-else id="blink" class="error">
              ACCESS DENIED
              <br>
              <img :src="siren" class="blink">
              <audio v-if="true" controls autoplay >
                <source src="http://soundbible.com/mp3/Police Siren 3-SoundBible.com-553177907.mp3">
              </audio>
          </h2> -->
  </div>
  
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import axios from "axios";
  import TopBar from '../../components/TopBar.vue';
  import CryptoJS from 'crypto-js'
  export default {
    name: 'company-users-dashboard',
    components: {
      TopBar
    },
    data(){
      return{
        response_data:[],
        company_users:[],
        search: '',
        current_user: {name:"regular admin user",role:"admin"},
        siren:require("../../assets/siren.png"),
        count: 0,
        role:''
      }
    },
    methods:{
      ...mapGetters(["getRole"]),
      ...mapGetters(["isAuthenticated"]),
      ...mapGetters(["StateUsername"]),
      ...mapGetters(["CompanyImage"]),

      eraseSearch(){
        this.search = ''
      },
      
      deleteUser(external_id){
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/userss/delete',{external_id:external_id},{auth: {
            username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
            password: process.env.VUE_APP_JEEC_WEBSITE_KEY
          }}).then(response => this.response_data.error = response.data);
        axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/userss',{auth: {
            username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
            password: process.env.VUE_APP_JEEC_WEBSITE_KEY
          }}).then((response)=>{
          this.response_data=response.data;
          this.company_users = this.response_data.company_users
          for(var i=0;i<this.company_users.length;i++){
            this.company_users[i].password = CryptoJS.DES.decrypt(this.company_users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
          }
  
        })
        
      },
    },
    computed: {
        filteredCompanyUsers() {
            return this.company_users.filter((company_user) => {
                return company_user.username.toLowerCase().includes(this.search.toLowerCase())
            }).sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }
    },
    mounted() {
      this.current_user.name = this.StateUsername()
      this.current_user.role = this.getRole()
      axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/users_company',{auth: {
            username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
            password: process.env.VUE_APP_JEEC_WEBSITE_KEY
          }}).then((response)=>{
          this.response_data=response.data;
          this.company_users = this.response_data.company_users;
          
          for(var i=0;i<this.company_users.length;i++){
            this.company_users[i].password = CryptoJS.DES.decrypt(this.company_users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
          }
        })
      
    },
  }
  
  </script>