<template>

  <div class="users-dashboard" v-if="current_user.role == 'webdev' || current_user.role == 'webdev_tl' || current_user.role == 'coordination' || current_user.role == 'admin'">
      <!-- <div v-if="this.isAuthenticated()"> -->
        <top-bar :username="current_user.name"/>

        <section-header-component
        name="Users Management"
        description="Add or delete system users"
        back_page='/dashboard/'/>
    <router-link to="/addteamuser">
    <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Team
      User</button>
    </router-link>
    <router-link to="/addcompanyuser">
    <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Company
      User</button>
    </router-link>

  <div class="section-title center-align" style="margin-top:90px;">
    List of Users
  </div>

  <div class="search-bar">
    <form class="col s12" @submit="searchUsers">
      <div class="row">
        <div class="input-field col s8">
          <input class="col s12 validate" id="username" name="username" type="text" v-model="input" required>
        </div>
        <button type="submit" class="btn-floating blue lighten-2 search-btn"><i
            class="material-icons">search</i>Search</button>
        <button class="red lighten-2 btn-floating search-btn right" v-if="search" @click="undoSearch"><i
            class="material-icons">clear</i></button>
      </div>
    </form>
  </div>


  <div class="list">
    <blockquote class="create-error" v-if="response_data.error!=''">
      {{ response_data.error }}
    </blockquote>
    <div v-else>
    <div class="counter right">
      Users: {{count}}
    </div>

    <table class="striped">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Role</th>
          <th>Post</th>
          <th>Email</th>
          <th>Company</th>
          <th v-if="current_user.role=='admin'">Password</th>
          <th>Food Manager</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in response_data.users" :key="user.name">
          <td>
            <b>
              {{ user.username }}
            </b>
          </td>

          <td>
            {{ user.name }}
          </td>

          <td>
            {{ user.role }}
          </td>

          <td></td>

          <td>
            {{ user.email }}
          </td>

          <td>

          </td>

          <td v-if="current_user.role=='admin'">
            {{ user.password }}
          </td>
          <td v-else></td>

          <td></td>

          <td v-if="current_user.name!=user.username&&(current_user.role=='admin'||current_user.role=='webdev_tl')&&user.role!='admin'">
              <button title="Delete user" class="waves-effect waves-light btn-floating" @click="deleteUser(user.external_id)"><i
                  class="material-icons left">delete</i>Delete</button>
          </td>
        </tr>
        <tr v-for="company_user in response_data.company_users" :key="company_user.name">
          <td>
            <b>
              {{ company_user.username }}
            </b>
          </td>

          <td>
            {{ company_user.name }}
          </td>

          <td>
            company
          </td>

          <td>
            {{ company_user.post }}
          </td>

          <td>
            {{ company_user.email }}
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
import axios from "axios"
import CryptoJS from 'crypto-js'
export default {
  name: 'users-dashboard',
  components: {
    
  },
  data(){
    return{
      response_data:{
        users: [],
        company_users:[],
        error:'',
      },
      input:'',
      search: false,
      // current_user:this.StateUsername(),
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
    searchUsers(e){
      e.preventDefault();
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/userss',{name:this.input},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
        this.response_data=response.data;
        this.count = response.data.users.length + response.data.company_users.length
        for(var i=0;i<this.response_data.users.length;i++){
          this.response_data.users[i].password = CryptoJS.DES.decrypt(this.response_data.users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
        for(i=0;i<this.response_data.company_users.length;i++){
          this.response_data.company_users[i].password = CryptoJS.DES.decrypt(this.response_data.company_users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
      })
      this.search=true
    },
    undoSearch(e){
      e.preventDefault();
      axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/userss',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
        this.response_data=response.data;
        this.count = response.data.users.length + response.data.company_users.length
        for(var i=0;i<this.response_data.users.length;i++){
          this.response_data.users[i].password = CryptoJS.DES.decrypt(this.response_data.users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
        for(i=0;i<this.response_data.company_users.length;i++){
          this.response_data.company_users[i].password = CryptoJS.DES.decrypt(this.response_data.company_users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
      })
      this.search=false
      this.input = ''
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
        this.count = response.data.users.length + response.data.company_users.length
        for(var i=0;i<this.response_data.users.length;i++){
          this.response_data.users[i].password = CryptoJS.DES.decrypt(this.response_data.users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
        for(i=0;i<this.response_data.company_users.length;i++){
          this.response_data.company_users[i].password = CryptoJS.DES.decrypt(this.response_data.company_users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }

      })
      
    },
  },
  mounted() {
    this.current_user.name = this.StateUsername()
    this.current_user.role = this.getRole()
    axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/userss',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
        this.response_data=response.data;
        this.count = response.data.users.length + response.data.company_users.length
        for(var i=0;i<this.response_data.users.length;i++){
          this.response_data.users[i].password = CryptoJS.DES.decrypt(this.response_data.users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
        for(i=0;i<this.response_data.company_users.length;i++){
          this.response_data.company_users[i].password = CryptoJS.DES.decrypt(this.response_data.company_users[i].password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        }
        // const password = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
        // const hashed = CryptoJS.AES.encrypt(password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
        // console.log(hashed)
      })
  },
}

</script>