<template>
    <div class="update-activity-type" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'|| role == 'partnerships'">
      <head-component/>
        
      <body>
        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component :name=bigdata.activity_type.name description="Edit information" back_page="/activities/types"/>

        <br>

        <div class="create-form">
          <blockquote v-if="bigdata.error != ''" class="create-error">
            {{ bigdata.error }}
          </blockquote>

          <form class="col s12" method="post" enctype="multipart/form-data">
            <div class="row">
              <div class="input-field col s5 boxname">
                <input id="name" name="name" type="text" class="validate" v-model="bigdata.activity_type.name" maxlength="100" required>
                <label for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s8 box" :class="{boxname:detectext(bigdata.activity_type.description)}">
                <textarea name="description" class="materialize-textarea" maxlength="300" 
                  v-model="bigdata.activity_type.description"></textarea>
                  <label for="description">Description</label>
              </div>
            </div>

            <div class="row s7">
              <div class="input-field col s3 box" :class="{boxname:detectext(bigdata.activity_type.price)}">
                <input id="price" name="price" type="text" class="validate" v-model="bigdata.activity_type.price">
                <label for="price">Price (€)</label>
              </div>
            </div>

            Show activity type in JEEC website Homepage:
            <p></p>
            <div>
              <label v-if="bigdata.activity_type.show_in_home" style="margin-right: 20px;">
                <input v-model="bigdata.activity_type.show_in_home" class="with-gap" name="show_in_home" type="radio" value="true" checked/>
                <span>Yes</span>
              </label>
              <label v-else style="margin-right: 20px;">
                <input v-model="bigdata.activity_type.show_in_home" class="with-gap" name="show_in_home" type="radio" value="true"/>
                <span>Yes</span>
              </label>
              <label v-if="!bigdata.activity_type.show_in_home">
                <input v-model="bigdata.activity_type.show_in_home" class="with-gap" name="show_in_home" type="radio" value="false" checked/>
                <span>No</span>
              </label>
              <label v-else>
                <input v-model="bigdata.activity_type.show_in_home" class="with-gap" name="show_in_home" type="radio" value="false"/>
                <span>No</span>
              </label>
            </div>
            <br>
            Show activities of this type in JEEC website Schedule:
            <p></p>
            <div>
              <label v-if="bigdata.activity_type.show_in_schedule" style="margin-right: 20px;">
                <input v-model="bigdata.activity_type.show_in_schedule" class="with-gap" name="show_in_schedule" type="radio" value="true" checked/>
                <span>Yes</span>
              </label>
              <label v-else style="margin-right: 20px;">
                <input v-model="bigdata.activity_type.show_in_schedule" class="with-gap" name="show_in_schedule" type="radio" value="true"/>
                <span>Yes</span>
              </label>
              <label v-if="!bigdata.activity_type.show_in_schedule">
                <input v-model="bigdata.activity_type.show_in_schedule" class="with-gap" name="show_in_schedule" type="radio" value="false" checked/>
                <span>No</span>
              </label>
              <label v-else>
                <input v-model="bigdata.activity_type.show_in_schedule" class="with-gap" name="show_in_schedule" type="radio" value="false"/>
                <span>No</span>
              </label>
            </div>
            <br>
            Show activities of this type in JEEC Student App:
            <p></p>
            <div>
              <label v-if="bigdata.activity_type.show_in_app" style="margin-right: 20px;">
                <input v-model="bigdata.activity_type.show_in_app" class="with-gap" name="show_in_app" type="radio" value="true" checked/>
                <span>Yes</span>
              </label>
              <label v-else style="margin-right: 20px;">
                <input v-model="bigdata.activity_type.show_in_app" class="with-gap" name="show_in_app" type="radio" value="true"/>
                <span>Yes</span>
              </label>
              <label v-if="!bigdata.activity_type.show_in_app">
                <input v-model="bigdata.activity_type.show_in_app" class="with-gap" name="show_in_app" type="radio" value="false" checked/>
                <span>No</span>
              </label>
              <label v-else>
                <input v-model="bigdata.activity_type.show_in_app" class="with-gap" name="show_in_app" type="radio" value="false"/>
                <span>No</span>
              </label>
            </div>
            <br>
            <router-link router-link :to="{ name: 'activity-types-dashboard'}">
              <button v-on:click="updateActivityType" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
                  class="material-icons left">save</i>Save {{ bigdata.activity_type.name }}</button>
            </router-link>
          </form>
        </div>

        <router-link router-link :to="{ name: 'activity-types-dashboard'}">
          <form method="get">
            <button v-on:click="deleteActivityType" class="waves-effect red darken-2 btn delete-btn"><i class="material-icons left">clear</i>Delete
              {{ bigdata.activity_type.name }}</button>
          </form>
        </router-link>
      </body>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters } from "vuex";
    import TopBar from '../../components/TopBar.vue';

    export default {
      name: 'update-activity-type',
      components: {
        TopBar
      },
      props:{
          
      },
      data(){
        return{
            bigdata: {
              error:"",
              activity_type: {},
            },
            activity_type_id: this.$route.params.activity_type_id,  
            role:''
        }
      },
      methods: {
        ...mapGetters(["StateUsername"]),
        ...mapGetters(["getRole"]),
        detectext(stringvar) {
          return stringvar!=''; 
        },
        updateActivityType(e) {
          e.preventDefault()
          if (this.bigdata.activity_type.name == '') {
              this.bigdata.error = 'Missing "Name"!'
              return
          }
          if (this.bigdata.activity_type.price == '') {
              this.bigdata.error = 'Missing "Price"!'
              return
          }
          if (this.bigdata.activity_type.show_in_home == '') {
              this.bigdata.error = 'Missing "Show activity type in JEEC website Homepage"!'
              return
          }
          if (this.bigdata.activity_type.show_in_schedule == '') {
              this.bigdata.error = 'Missing "Show activities of this type in JEEC website Schedule"!'
              return
          }
          if (this.bigdata.activity_type.show_in_app == '') {
              this.bigdata.error = 'Missing "Show activities of this type in JEEC Student App"!'
              return
          }
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activities/types/update_vue', {activity_type_external_id: this.bigdata.activity_type.external_id, 
            name: this.bigdata.activity_type.name, description: this.bigdata.activity_type.description, price: this.bigdata.activity_type.price, 
              show_in_home: this.bigdata.activity_type.show_in_home, show_in_schedule: this.bigdata.activity_type.show_in_schedule, 
              show_in_app: this.bigdata.activity_type.show_in_app, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data

          if (this.bigdata.error == '') {
              this.$router.push({name: 'activity-types-dashboard'})
          }
          else {
              this.$router.push({ name: 'update-activity-type', params: { activity_type_id: this.activity_type_id}})
          }})
        },
        deleteActivityType(e) {
          e.preventDefault()
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activities/types/delete_vue',{activity_type_external_id: this.activity_type_id, username: this.StateUsername()}, {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data

          if (this.bigdata.error == '') {
            this.$router.push({name: 'activity-types-dashboard'})
          }
          else {
            this.$router.push({ name: 'update-activity-type', params: { activity_type_id: this.activity_type_id }})
          }})
        }
      },
      mounted() {
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activities/types/get_activity_type_vue', {activity_type_external_id: this.activity_type_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data
          if (this.bigdata.error != '') {
            this.$router.push({name: 'activity-types-dashboard'})
          }})
          this.role = this.getRole()
      }
    }
</script>

<style>
  .update-activity-type p {
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
</style>