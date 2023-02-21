<template>


<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Meals Management" description="Dishes choosen by the companies" back_page="/meals"/>



    
<div class="section-title center-align" style="margin-top:50px;">
List of dishes per company
</div>

<blockquote v-if="responsedata.closed" class="create-error">
    Meal Closed
  </blockquote>

 
<div class="list">

<table class="striped">
  <thead>
    <tr>
      <th>Company</th>

      
      <th v-for="dish in responsedata.dishes" :key="dish">{{ dish }}</th>
      
      
    </tr>
  </thead>
  <tbody>
    
    
    <tr v-for="company in responsedata.companies" :key="company">
      <td>
        {{ company }}
      </td>

      <td v-for="dish in responsedata.dishes" :key="dish">
        <div v-if="dish == responsedata.dishes_per_companies.company[0]">
          {{ company_dish[1] }}
        </div>
        <div v-else>
          0
        </div>
      
    </td>
    
    </tr>
    
    
    <tr>
      <td>
        <b>Total</b>
      </td>
    
      <td v-for="total in responsedata.total_dishes" :key="total">
        <b>{{ total }}</b>
      </td>
    
    </tr>
  </tbody>
</table>
</div>

</div>

</template>

<script>
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
  name: 'meal-dishes',
  components: {
    TopBar,
    SectionHeader
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      responsedata:{
        closed:true,
      },
      role:''
  };
},
mounted(){
  this.role = this.getRole()
  axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/meal/dishes",{meal_external_id:this.$route.params.meal_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> this.responsedata = response.data)
},
methods:{
  ...mapGetters(["getRole"]),
}
}

</script>
