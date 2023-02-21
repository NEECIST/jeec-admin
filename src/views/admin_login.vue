<template>
    <div class="admin-login">
        <head-component/>
        
        <body>
          
          <section-header-component name="BRAIN" description="Conference management system" back_page=""/>
          {{bigdata.show}}
            <div v-if="bigdata.show == ''" class="login-card center-align">
                <form method="post">
                    <div class="input-field col s2" :class="{boxname:detectext(form.username)}">
                        <input type="text" v-model="form.username" class="username-input" name="username">
                        <label for="username">Username</label>
                    </div>
                    
                    <div class="input-field col s2" :class="{boxname:detectext(form.password)}">
                        <input type="password" v-model="form.password" class="password-input" name="password">
                        <label for="password">Password</label>
                    </div>

                    <p v-if="error" class="login-error">{{ error }}</p>

                    <button @click="submit" class="waves-effect blue lighten-2 btn-large login-button">Login</button>
                </form>
            </div>
        </body>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import { mapGetters } from "vuex";

    import axios from 'axios'
    export default {
      name: 'admin-login',
      components: {
        
      },
      props:{
          
      },
      data(){
        return{
            error:"",
            form:{
              username:"",
              password:"",
            },
            bigdata: {show: ''},
            event: {external_id: ''},
            show: '',
        }
      },
      methods: {
        ...mapActions(["LogIn"]),
        ...mapGetters(["isAuthenticated"]),
        ...mapGetters(["StateUsername"]),
        detectext(stringvar) {
          return stringvar!=''; 
        },
        async submit(e) {
          e.preventDefault()
          try {
              await this.LogIn(this.form)
              if(this.isAuthenticated()){
                console.log("Checked if authenticated")
              this.$router.push({name: 'dashboard-main'})
              this.showError = false
              this.error=''
            }
            else{
              console.log("Checked if authenticated")
              this.showError = true
              this.error='Access Denied'
            }
          } catch (error) {
            this.showError = true
          }
        },
      },
      mounted() {
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/_vue',{username: this.StateUsername()}, {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {const data = response.data; this.bigdata = data; this.show = data.show 
          if (this.bigdata.show != '') {
            this.$router.push({name: 'dashboard-main'})
          }
        })
      }
    }

</script>

<style> 
    .boxname input:focus ~ label,
    .boxname input:valid ~ label,
    .boxname textarea:focus ~ label,
    .boxname textarea:valid ~ label
    {
      top: -20px;
      left: 10px;
      width:50vw;
      font-size: 12px;
    }
    
    .box input:invalid ~ label,
    .box input:focus ~ label,
    .box textarea:focus ~ label,
    .box textarea:not(:valid) ~ label
    {
      top: -20px;
      left: 10px;
      width:50vw;
      font-size: 12px;
    }
    .input-field{
      width:50vw;
      margin:auto;
    }


  </style>