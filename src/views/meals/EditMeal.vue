<template>

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
  <TopBar :username="this.StateUsername()"/>

    <SectionHeader :name="responsedata.meal.type" description="Edit information" back_page="/meals"/>

<br>



     
    <div class="create-form">
        <blockquote v-if="responsedata.error!=''" class="create-error">
        {{ responsedata.error }}
        </blockquote>
   

        <form class="col s12" >

                <div class="row">
                <div class="input-field col s2">
                    <select name="type" class="form-control" v-model="responsedata.meal.type" style="display:block">
                    <option disabled value="">Select a meal type</option>
                    <option v-for="meal_type in responsedata.meal_types" :key="meal_type" :value="meal_type">{{ meal_type }}</option>
                    </select>
                </div>

                <div class="input-field col s3 validate">
                    <p>Location</p>
                <input id="location" name="location" type="text" v-model="responsedata.meal.location" maxlength="100" placeholder="Location">
                </div>
            </div>

             
            <div class="row s7">
                <div class="input-field col s2" :class="{boxname:detectext(responsedata.meal.day)}">
                    <p>Day</p>
                    <date-pick
                    v-model="responsedata.meal.day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
                </div>

                <div class="input-field col s2">
                    <p>Time</p>
                    <vue-timepicker name="time" v-model="responsedata.meal.time" required></vue-timepicker>
                </div>
            </div>

            
            <div class="row s7">
                <div class="input-field col s2 validate" :class="{boxname:detectext(responsedata.meal.registration_day)}">
                    <p>Registration Day</p>
                    <date-pick
                    v-model="responsedata.meal.registration_day"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    :inputAttributes="{size: 32}"
                    required
                ></date-pick>
                </div>

                <div class="input-field col s2 validate">
                    <p>Registration Time</p>
                    <vue-timepicker name="time" v-model="responsedata.meal.registration_time" required></vue-timepicker>
                </div>
            </div>

            
            <p>Participating companies:</p>
                  <vue-multi-select
                v-model="responsedata.companies_in_meal"
                search
                :btnLabel="btnLabel"
                :filters="filters"
                :options="options"
                :selectOptions="responsedata.companies"/>
             

            
            <div style="margin-right: 80vw;">
        Insert the meal dishes:
      </div>

      <div id="dishes">
        <div class="row" v-for="dish in responsedata.dishes" :key="dish.index">
          <div class="input-field col s3">
            
            <input id="dish_name" name="dish_name" type="text" class="validate" v-model="dish.name" placeholder="Dish Name" maxlength="100">
          </div>

          <div class="input-field col s3">
            <input id="dish_description" name="dish_description" type="text" class="validate" v-model="dish.description" placeholder="Dish Description" maxlength="300">
          </div>

          <div class="input-field col s3" id="dish_type_select">
            <select name="dish_type" class="browser-default" v-model="dish.type">
              <option disabled value="">Select the dish type</option>
              <option v-for="dish_type in responsedata.dish_types" :key="dish_type" :value="dish_type">{{ dish_type }}</option>
             
            </select>
          </div>
        <button id="remove" type="button" title="remove_dish" @click="removeDish(dish.index)" class="waves-effect red waves-light btn-floating"><i class="material-icons left">remove</i>Remove dish</button>
        </div>
      </div>

    <button id="add" type="button" title="add_dish" @click="addDish" class="waves-effect green lighten-2 btn add-btn left"><i class="material-icons left">add</i>Add dish</button>

      <button type="submit" class="waves-effect blue lighten-2 btn add-btn" @click="updateMeal"><i class="material-icons left">save</i>Save Meal</button>

      <button class="waves-effect red darken-2 btn add-btn right" @click="deleteMeal"><i class="material-icons left">clear</i>Delete Meal</button>
     
    </form>
        
    </div>



        

    </div>




</template>

<script>
import axios from 'axios';
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import DatePick from 'vue-date-pick';
import fecha from 'fecha';
import VueTimepicker from 'vue2-timepicker';
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';
import { mapGetters } from "vuex";
export default {
  name: 'edit-meal',
  components: {
    TopBar,
    SectionHeader,
    VueTimepicker,
    DatePick,
    vueMultiSelect
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      responsedata:{
        error:"",
        meal:{
            type:"",
            location:"",
            day:"",
            time:"",
            registration_day:"",
            registration_time:"",
        },
        companies_in_meal:[],
      },
      format: 'DD MM YYYY, dddd',
      date: fecha.format(new Date(), 'DD MM YYYY, dddd'),
      role:'',
      btnLabel: values => `Select Companies (${values.length})`,
      filters: [{
            nameAll: 'Select all',
            nameNotAll: 'Deselect all',
            func() {
              return true;
            },
          }],
          options: {
          multi: true,
          groups: false,
          labelList: 'companies.name',
          cssSelected: option => (option.selected ? { 'background-color': '#00A36C' } : ''),
          },
  };
},
mounted(){
  this.role = this.getRole()
  axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/meal/update-meal",{meal_external_id:this.$route.params.meal_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> this.responsedata = response.data)
},
methods:{
  ...mapGetters(["getRole"]),
  ...mapGetters(["StateUsername"]),
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
    let newIndex = this.responsedata.dishes.length
    const newDish = {
      index:newIndex,
      dish_name:"",
      dish_type:"",
      dish_description:"",
    }
    this.responsedata.dishes.push(newDish)
  },
  removeDish(index){
    this.responsedata.dishes.splice(index,1)
    for(let i=index;i<this.responsedata.dishes.length;i++){
        this.responsedata.dishes.index --;
    }
  },
  updateMeal(e){
    e.preventDefault();
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/meal/update-meal/submission",{meal_external_id:this.$route.params.meal_external_id,meal_type:this.responsedata.meal.type,
        meal_location:this.responsedata.meal.location, meal_day:this.responsedata.meal.day, meal_time:this.responsedata.meal.time,
        meal_registration_day:this.responsedata.meal.registration_day, meal_registration_time:this.responsedata.meal.registration_time,
        meal_companies:this.responsedata.companies_in_meal, dishes:this.responsedata.dishes},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> {
            this.responsedata.error = response.data
            this.$router.push("/meals");})
  },
  deleteMeal(e){
    e.preventDefault();
    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/meal/update-meal/delete",{meal_external_id:this.$route.params.meal_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> {
          this.responsedata.error = response.data
          this.$router.push("/meals")
            
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