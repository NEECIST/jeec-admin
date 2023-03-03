<template>

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Meals Management" description="Add a new meal" back_page="/meals"/>


    
  <br>

 
  <div class="create-form">

    <blockquote class="create-error" v-if="error!=''">
      {{ error }}
    </blockquote>

    
    <form class="col s12" @submit="addMeal">
      <div class="row">
        <div class="input-field col s2">
          <select name="type" class="form-control" v-model="form.type" style="display:block">
            <option disabled value="">Select a meal type</option>
            <option v-for="meal_type in response_data.meal_types" :key="meal_type" :value="meal_type">{{ meal_type }}</option>
          </select>
        </div>



        <div class="input-field col s3">
          <input id="location" name="location" type="text" class="validate" v-model="form.location" placeholder="Location" maxlength="100">
        </div>
      </div>



      <div class="row s7">
        <div class="input-field col s2" :class="{boxname:detectext(form.day)}">
          <p>Day</p>
          <date-pick
                    v-model="form.day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
        </div>

        <div class="input-field col s2" :class="{boxname:detectext(form.time)}">
          <p>Time</p>
          <vue-timepicker name="time" v-model="form.time" required></vue-timepicker>
        </div>
      </div>


      <div class="row s7">
        <div class="input-field col s2" :class="{boxname:detectext(form.registration_day)}">
          <p>Registration Day</p>
          <date-pick
                    v-model="form.registration_day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
        </div>

        <div class="input-field col s2" :class="{boxname:detectext(form.registration_time)}">
          <p>Registration Time</p>
          <vue-timepicker name="registration_time" v-model="form.registration_time" required></vue-timepicker>
          </div>
      </div>


      <div class="row">
        <div class="input-field col s3">
          <select multiple id="company_select" name="company" v-model="form.companies" style="display:block; min-height:100px">
            <option disabled value="">Select all participating companies</option>
            <option v-for="company in response_data.companies" :key="company" :value="company">{{ company }}</option>
          </select>
        </div>
      </div>

      <br>

      <div style="margin-right: 80vw;">
        Insert the meal dishes:
      </div>

      <div id="dishes">
        <div class="row" v-for="dish in form.dishes" :key="dish.id">
          <div class="input-field col s3">
            
            <input id="dish_name" name="dish_name" type="text" class="validate" v-model="dish.dish_name" placeholder="Dish Name" maxlength="100">
          </div>

          <div class="input-field col s3">
            <input id="dish_description" name="dish_description" type="text" class="validate" v-model="dish.dish_description" placeholder="Dish Description" maxlength="300">
          </div>

          <div class="input-field col s3" id="dish_type_select">
            <select name="dish_type" class="browser-default" v-model="dish.dish_type">
              <option disabled value="">Select the dish type</option>
              <option v-for="dish_type in response_data.dish_types" :key="dish_type" :value="dish_type">{{ dish_type }}</option>
             
            </select>
          </div>
        </div>
      </div>

      <div style="margin-left: -90vw;">
        <button id="add" type="button" title="add_dish" @click="addDish" class="waves-effect green waves-light btn-floating"><i class="material-icons left">add</i>Add dish</button>
        <button id="remove" type="button" title="remove_dish" @click="removeDish" class="waves-effect red waves-light btn-floating"><i class="material-icons left">remove</i>Remove dish</button>
      </div>

      <button type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">save</i>Save Meal</button>
     
      <!--
    -->
    </form>

  </div>

</div>

</template>


<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import axios from 'axios';
import SectionHeader from '../../components/SectionHeader.vue';
import fecha from 'fecha';
import VueTimepicker from 'vue2-timepicker';
import TopBar from '../../components/TopBar.vue';
import { mapGetters } from "vuex";
export default {
  name: 'add-meal',
  components: {
    TopBar,
    SectionHeader,
    VueTimepicker,
    DatePick
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      response_data:{
        companies:[],
        dish_types:[],
        meal_types:[]
      },
      form:{
        type:"",
        location:"",
        day:"",
        time:"",
        registration_day:"",
        registration_time:"",
        companies:[],
        dishes:[{
          index:0,
          dish_name:"",
          dish_type:"",
          dish_description:"",
        }]
      },
      error:"",
      format: 'DD MM YYYY, dddd',
      date: fecha.format(new Date(), 'DD MM YYYY, dddd'),
      role:''
  };
},
mounted(){
  axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/new-meal_vue",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
    this.response_data = response.data
    console.log(this.response_data.meal_types)
    this.role = this.getRole()
  })
},
methods:{
  ...mapGetters(["getRole"]),
  detectext(stringvar){
    return stringvar!=''; 
  },
  parseDate(dateString, format) {
      return fecha.parse(dateString, format);
  },
  formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
  },
  addDish(){
    let newIndex = this.form.dishes.length
    const newDish = {
      index:newIndex,
      dish_name:"",
      dish_type:"",
      dish_description:"",
    }
    this.form.dishes.push(newDish)
  },
  removeDish(){
    this.form.dishes.pop()
  },
  addMeal(e){
    e.preventDefault()
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/new-meal_vue",{form:this.form},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
      this.error = response.data;
      if(this.error==""){
        this.$router.push("/meals");
      }
    })
  }
}
}

</script>

<style>
  @import 'vue2-timepicker/dist/VueTimepicker.css';
  .add-activity p {
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