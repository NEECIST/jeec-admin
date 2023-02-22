<template>
    <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
      <head-component/>
        
        <navbar-component logo="brain.png"/>

        <section-header-component name="Auctions Management" description="Add a new auction" back_page="/auctions"/>

      

        <div class="create-form">
            <blockquote v-if="error != ''" class="create-error">
              {{ error }}
            </blockquote>

          <form class="col s12" action="/admin/auctions/new-auction" method="post">
            <div class="row boxname">
              <div class="input-field col s4">
                <input id="name" v-model="name" type="text" class="validate"/>
                <label for="name">Name</label>
              </div>

              <div class="row">
                <div class="input-field col s2">
                  <input id="minimum_value" v-model="minimum_value" type="number" required>
                  <label for="minimum_value">Minimum bid amount</label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s8 box" :class="{boxname:detectext(description)}">
                <textarea v-model="description" id="bio" class="materialize-textarea" maxlength="300"></textarea>
                <label for="description">Description</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
                <p class="add-auction">Starting Date</p>
                <date-pick
                    v-model="starting_date"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
              </div>

              <div class="input-field col s1">
                <p class="add-auction">Starting Time</p>
                <vue-timepicker name="starting_time" v-model="starting_time" required></vue-timepicker>
              </div>
            </div>
            
            <div class="row">
              <div class="input-field col s3">
                <p class="add-auction">Closing Date</p>
                <date-pick
                    v-model="closing_date"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
              </div>

              <div class="input-field col s1">
                <p class="add-auction">Closing Time</p>
                <vue-timepicker v-model="closing_time" name="closing_time" required></vue-timepicker>
              </div>
            </div>
            <router-link router-link to="/auctions">
              <button v-on:click="postAuction" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">save</i>Save Auction</button>
            </router-link>
          </form>
        </div>
 
    </div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import fecha from 'fecha';
    import VueTimepicker from 'vue2-timepicker';
    import axios from "axios";
    import { mapGetters } from "vuex";
    export default {
      name: 'add-auction',
      components: {
        DatePick, VueTimepicker,
      },
      props:{
          
      },
      data(){
        return{
            error:"",
            name: '',
            description: '',
            minimum_value: '',
            starting_date: '',
            starting_time: '',
            closing_date: '',
            closing_time: '',
            format: 'DD MM YYYY, dddd',
            date: fecha.format(new Date(), 'DD MM YYYY, dddd'),
            role:''
        }
      },
      methods: {
        ...mapGetters(["getRole"]),
        ...mapGetters(["StateUsername"]),
        detectext(stringvar){
          return stringvar!=''; 
        },
        postAuction(e) {
          e.preventDefault()
          if (this.name == '') {
            this.error = 'Missing "Name"!'
            return
          }
          if (this.minimum_value == '') {
            this.error = 'Missing "Minimum Value"!'
            return
          }
          if (this.starting_date == '') {
            this.error = 'Missing "Starting Date"!'
            return
          }
          if (this.starting_time == '') {
            this.error = 'Missing "Starting Time"!'
            return
          }
          if (this.closing_date == '') {
            this.error = 'Missing "Closing Date"!'
            return
          }
          if (this.closing_time == '') {
            this.error = 'Missing "Closing Time"!'
            return
          }
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/post-new-auction_vue', {name: this.name, description: this.description, minimum_value: this.minimum_value, 
                  starting_date: this.starting_date, starting_time: this.starting_time, closing_date: this.closing_date, 
                  closing_time: this.closing_time, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.error = response.data
          if (this.error == '') {
            this.$router.push("/auctions")
          }
          else {
              this.$router.push("/auctions/new-auction")
          }})
        },
        parseDate(dateString, format) {
            return fecha.parse(dateString, format);
        },
        formatDate(dateObj, format) {
            return fecha.format(dateObj, format);
        }
      },
      mounted() {
        this.role = this.getRole()
      }
    }

</script>

<style> 
  @import 'vue2-timepicker/dist/VueTimepicker.css';
  .add-auction{
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