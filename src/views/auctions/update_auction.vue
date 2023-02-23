<template>
    <div class="update-auction" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
      <head-component/>
      
      <body>
        <navbar-component logo="brain.png"/>

        <section-header-component name="Auctions Management" description="Update an auction" back_page="/auctions"/>

        <br>

        <div class="create-form">
          <blockquote v-if="bigdata.error != ''" class="create-error">
            {{ bigdata.error }}
          </blockquote>
          <blockquote v-else>
            <router-link router-link to="/auctions"/>
          </blockquote>

          <form class="col s12 boxname" method="post">
            <div class="row">
              <div class="input-field col s4">
                <input id="name" name="name" type="text" class="validate" v-model="bigdata.auction.name" maxlength="100" required>
                <label for="name">Name</label>
              </div>

              <div class="row">
                <div class="input-field col s2">
                  <input id="minimum_value" name="minimum_value" type="number" step="0.01"
                    v-model="bigdata.auction.minimum_value" required>
                  <label for="minimum_value">Minimum bid amount (€)</label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s8 box" :class="{boxname:detectext(bigdata.auction.description)}">
                <textarea name="description" id="bio" class="materialize-textarea" maxlength="300"
                   v-model="bigdata.auction.description"></textarea>
                <label for="description">Description</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
                <p>Starting Date</p>
                <date-pick
                    v-model="bigdata.auction.starting_date"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
              </div>

              <div class="input-field col s1 boxname">
                <p>Starting Time</p>
                <vue-timepicker name="starting_time" v-model="bigdata.auction.starting_time" required></vue-timepicker>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
                <p>Closing Date</p>
                <date-pick
                    v-model="bigdata.auction.closing_date"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
              </div>

              <div class="input-field col s1">
                <p>Closing Time</p>
                <vue-timepicker v-model="bigdata.auction.closing_time" name="closing_time" required></vue-timepicker>
              </div>
            </div>
            <button v-on:click="postAuction" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
                class="material-icons left">save</i>Save Auction</button>
          </form>
        </div>

        <form method="get">
          <button v-on:click="deleteAuction" class="waves-effect red darken-2 btn delete-btn"><i class="material-icons left">clear</i>Delete
            Auction</button>
        </form>

      </body>
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
      name: 'update-auction',
      components: {
        DatePick, VueTimepicker,
      },
      props:{
          
      },
      data(){
        return{
            bigdata: {
              error:"",
              auction: {},
            },
            auction_id: this.$route.params.auction_id,
            format: 'DD MM YYYY, dddd',
            date: fecha.format(new Date(), 'DD MM YYYY, dddd'),
            role:''
        }
      },
      methods: {
        ...mapGetters(["getRole"]),
        ...mapGetters(["StateUsername"]),
        detectext(stringvar) {
          return stringvar!=''; 
        },
        postAuction(e) {
          e.preventDefault()
          if (this.bigdata.auction.name == '') {
            this.bigdata.error = 'Missing "Name"!'
            return
          }
          if (this.bigdata.auction.minimum_value == '') {
            this.bigdata.error = 'Missing "Minimum Value"!'
            return
          }
          if (this.bigdata.auction.starting_date == '') {
            this.bigdata.error = 'Missing "Starting Date"!'
            return
          }
          if (this.bigdata.auction.starting_time == '') {
            this.bigdata.error = 'Missing "Starting Time"!'
            return
          }
          if (this.bigdata.auction.closing_date == '') {
            this.bigdata.error = 'Missing "Closing Date"!'
            return
          }
          if (this.bigdata.auction.closing_time == '') {
            this.bigdata.error = 'Missing "Closing Time"!'
            return
          }
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions_vue',{name: this.bigdata.auction.name, description: this.bigdata.auction.description, 
              minimum_value: this.bigdata.auction.minimum_value, starting_date: this.bigdata.auction.starting_date, starting_time: this.bigdata.auction.starting_time,
              closing_date: this.bigdata.auction.closing_date, closing_time: this.bigdata.auction.closing_time, auction_external_id: this.bigdata.auction.external_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data
          if (this.bigdata.error == '') {
            this.$router.push({name: 'auctions-dashboard'})
          }
          else {
            this.$router.push({ name: 'update-auction', params: { auction_id: this.auction_id}})
          }})
        },
        deleteAuction(e) {
          e.preventDefault()
          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/delete_vue',{auction_external_id: this.auction_id, username: this.StateUsername()}, {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data

          if (this.bigdata.error == '') {
            this.$router.push({name: 'auctions-dashboard'})
          }
          else {
            this.$router.push({ name: 'update-auction', params: { auction_id: this.auction_id}})
          }})
        },
        parseDate(dateString, format) {
            return fecha.parse(dateString, format);
        },
        formatDate(dateObj, format) {
            return fecha.format(dateObj, format);
        },
      },
      mounted() {
        this.role = this.getRole()
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/get_vue',{auction_external_id: this.auction_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response => {this.bigdata = response.data
        if (this.bigdata.error != '') {
          this.$router.push({name: 'auctions-dashboard'})
        }})
      }
    }

</script>

<style>
  @import 'vue2-timepicker/dist/VueTimepicker.css';

  .update-auction p {
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
  

