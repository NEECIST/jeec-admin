<template>

<div class="add-team-user" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

    <top-bar :username="current_user"/>

        <section-header-component
        name="Management User"
        description="Add a new internal user"
        back_page='/usersdashboard'/>

  <div class="create-form">
    <blockquote v-if="error!=''" class="create-error">
      {{ error }}
    </blockquote>

    <form class="col s12" @submit="createTeamUser">
      <div class="row">
        <div class="input-field col s12" style="margin-left: 30px;">
          <input class="col s4 validate" id="name" name="name" type="text" v-model="user.name" placeholder="Name" maxlength="100" required>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12" style="margin-left: 30px;">
          <input class="col s4 validate" id="username" name="username" type="text" v-model="user.username" placeholder="Username" required>
        </div>
      </div>

      <div class="row">
        <div class="col s2" style="margin-left: 30px;">
          User role
          <select name="role" class="form-control browser-default" v-model="user.role">
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
      </div>

      <button type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
          class="material-icons left">save</i>Save User</button>
    </form>
  </div>
</div>

</template>

<script>
import axios from "axios";
import CryptoJS from 'crypto-js' 
import { mapGetters } from "vuex";
// import axios from "axios"
export default {
  name: 'add-team-user',
  components: {
    
  },
  data(){
    return{
        user:{
            name:'',
            username:'',
            role:'member',
            password:'',
        },
        roles:['webdev','webdev_tl','business','coordination','partnerships','team','admin','marketing'],
        error:'',
        current_user: "regular admin user",
        siren:require("../../assets/siren.png"),
        role:''
    }
  },
  methods:{
    ...mapGetters(["getRole"]),
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["StateUsername"]),
    ...mapGetters(["CompanyImage"]),
    createTeamUser(e){
      e.preventDefault()
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/user/addteamuser",{user:this.user},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> this.error=response.data)
      if(this.error == ''){
        this.$router.push('/usersdashboard')
      }
    }
  },
  mounted(){
    this.current_user = this.StateUsername()
    this.role = this.getRole()
    let password = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
    // console.log(password)
    let hashed = CryptoJS.DES.encrypt(password, process.env.VUE_APP_API_KEY).toString();
    this.user.password = hashed
  }
}

</script>