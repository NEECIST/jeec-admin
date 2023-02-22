<template>

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Meals Management" description="Add, edit or delete meal" back_page="/dashboard/"/>



<br>





<router-link to="meals/add-meal">
  <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Meal</button>
</router-link>



  
<div class="section-title center-align" style="margin-top:90px;">
    Search
</div>

       
      
<div class="center-align" style="margin-top:10px;">
    by type
</div>


<div class="search-meal-buttons center-align">

    <button class="waves-effect blue lighten-2 btn-small search-type-btn" @click="newTypeSearch('Breakfast')">Breakfast</button>

    <button class="waves-effect blue lighten-2 btn-small search-type-btn" @click="newTypeSearch('Lunch')">Lunch</button>

    <button class="waves-effect blue lighten-2 btn-small search-type-btn" @click="newTypeSearch('Dinner')">Dinner</button>

    <button class="waves-effect blue lighten-2 btn-small search-type-btn" @click="newTypeSearch('Snack')">Snack</button>
</div>

 
<div class="search-bar">
  <div class="col s12">
    <div class="row">
      <div class="input-field col s8 validate">
        <input class="col s12" v-model="search_input" type="text" placeholder="search day">
      </div>
      <button class="btn-floating blue lighten-2 search-btn" @click="newDaySearch()"><i class="material-icons">search</i>Search</button>
      <button v-if="search_day!=''||search_on" class="btn-floating red lighten-2 search-btn" style="margin-left:2vw" @click="clearSearchResults"><i
                  class="material-icons left">clear</i>Clear</button>
    </div>
  </div>

</div>


<div class="section-title center-align" style="margin-top:50px;">
    List of meals
</div>


<div class="list">
   
    <blockquote v-if="response_data.error!=''" class="create-error">
      {{ response_data.error }}
    </blockquote>

    <div v-else>
    <!-- <div class="counter right">
      Meals: {{ response_data.meals_list|length }}
    </div> -->

    <table class="striped">
        <thead><tr>
          <th>Type</th>
          <th>Day</th>
          <th>Time</th>
          <th>Location</th>
          <th>Registration Day</th>
          <th>Registration Time</th>
        </tr></thead>
        <tbody>
            <tr v-for="meal in meals_list" :key="meal.day">
              <td>
                        {{ meal.type }}
                    </td>

                    <td v-if="meal.day!=null">
                        {{ meal.day }}
                    </td>
                    <td v-else></td>

                    <td v-if="meal.time!=null">
                        {{ meal.time }}
                    </td>
                    <td v-else></td>

                    <td v-if="meal.location!=null">
                        {{ meal.location }}
                    </td>
                    <td v-else></td>
                    
                    <td v-if="meal.registration_day!=null">
                        {{ meal.registration_day }}
                    </td>
                    <td v-else></td>

                    <td v-if="meal.registration_time!=null">
                        {{ meal.registration_time }}
                    </td>
                    <td v-else></td>



                <td>
                  <router-link router-link :to="{ name: 'edit-meal', params: {meal_external_id: meal.external_id }}">
                    <button title="Edit meal" class="waves-effect waves-light btn-floating"><i class="material-icons left">edit</i>Edit</button>
                  </router-link>
                </td>

                <td>
                  <router-link router-link :to="{ name: 'meal-dishes', params: {meal_external_id: meal.external_id }}">
                    <button title="Dishes info" class="waves-effect waves-light btn-floating"><i class="material-icons left">room_service</i>Info</button>
                  </router-link>
                </td>
              </tr>
   
            </tbody>
    </table>

  </div>
</div>



</div>
</template>  

<script>
import axios from 'axios';
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import { mapGetters } from "vuex";
export default {
  name: 'dashboard-meal',
  components: {
    TopBar,
    SectionHeader
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      response_data:{
        error:"",
        meals_list:[]
      },
      search_type:"All",
      meals_list:[],
      search_input:"",
      search_day:"",
      search_on: false,
      role:''
  };
},
  mounted(){
    this.role = this.getRole()
    axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/meals_vue",
    {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
      this.response_data = response.data
      this.meals_list = response.data.meals_list
    })
  },
  methods:{
    ...mapGetters(["getRole"]),
    newTypeSearch(search_type){
      this.search_on = true
      this.meals_list=[]
      for(let i=0;i<this.response_data.meals_list.length;i++){
        if(this.response_data.meals_list[i].type==search_type && this.response_data.meals_list[i].day.includes(this.search_day)){
          this.meals_list.push(this.response_data.meals_list[i])
        }
      }
    },
    clearSearchResults(){
      this.meals_list = this.response_data.meals_list
      this.search_day = ''
      this.search_on = false
    },
    newDaySearch(){
      this.search_day = this.search_input
      let new_meals = []
      for(let i=0;i<this.meals_list.length;i++){
        if(this.meals_list[i].day.includes(this.search_day)){
          new_meals.push(this.meals_list[i])
        }
      }
      this.meals_list = new_meals
    }
  }
}

</script>