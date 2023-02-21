<template>

<div class="add-company-user" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
    <top-bar :username="current_user"/>

        <section-header-component
        name="Company User"
        description="Add a new user"
        back_page='/usersdashboard'/>

  <div class="create-form">
    <blockquote v-if="response_data.error!=''" class="create-error">
      {{ response_data.error }}
    </blockquote>

    <form class="col s12" @submit="createCompanyUser" style="display:flex flex-wrap:wrap">
      <div class="row">
        <div class="input-field col s9" style="margin-left: 30px;">
          <input id="name" name="name" type="text" v-model="user.name" placeholder="Name" required>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s4" style="margin-left: 30px;">
          <input class="col validate" id="username" name="username" type="text" v-model="user.username" placeholder="Username" required>
        </div>

        <div class="input-field col s4" style="margin-left: 30px;">
          <input class="col validate" id="post" name="post" type="text" v-model="user.position" placeholder="Position">
        </div>
      </div>

      <div class="row">
        <div class="input-field col s9" style="margin-left: 30px;">
          <input id="email" name="email" type="text" v-model="user.email" placeholder="Email" required>
        </div>
      </div>

      <div class="row">
        <div class="col s4">
          <p v-if="response_data.companies.length==0" class="right">Please create a company profile first!</p>
          <div v-else style="text-align:center">
            Select company
            <br>
            <select name="company_external_id" class="select-css right" style="width: 20vw; display: block; height:30px" v-model="user.company_external_id" required>
            <option v-for="company in response_data.companies" :key=company.name :value="company.external_id">{{ company.name }}</option>
          </select>
          </div>
        </div>

      <div class="col s7">Food Manager:
        <p>
          <label style="margin-right: 20px;">
            <input class="with-gap" name="food_manager" type="radio" value="True" v-model="user.food_manager"/>
            <span>Yes</span>
          </label>
          <label>
            <input class="with-gap" name="food_manager" type="radio" value="False" v-model="user.food_manager"/>
            <span>No</span>
          </label>
        </p>
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
import { mapGetters } from "vuex";
import CryptoJS from 'crypto-js'
export default {
  name: 'add-company-user',
  components: {
    
  },
  data(){
    return{
        user:{
            name:'',
            username:'',
            position:'',
            email:'',
            company_external_id:'',
            food_manager:'False',
            password:'',
        },
        response_data:{
            error:'',
            companies:[],
        },
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
    createCompanyUser(e){
    e.preventDefault();
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/user/addcompanyuser",{user:this.user},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
        this.response_data.error=response.data
        if(response.data == ''){
          this.$router.push('/usersdashboard')
        }
      }
      )
    }
  },
  mounted() {
    this.current_user = this.StateUsername()
    this.role = this.getRole()

    axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/user/addcompanyuser',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
        this.response_data=response.data;
      })
    let password = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
    // console.log(password)
    let hashed = CryptoJS.DES.encrypt(password, process.env.VUE_APP_API_KEY).toString();
    this.user.password = hashed
  },
}

</script>