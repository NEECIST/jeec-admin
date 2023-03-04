<template>


<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Meals Management" description="Dishes chosen by the companies" back_page="/meals"/>



    
<div class="section-title center-align" style="margin-top:50px;">
List of dishes per company
</div>

<blockquote v-if="this.responsedata.closed" class="create-error">
    Meal Closed
  </blockquote>

 
<div class="list">

<table class="striped">
  <thead>
    <tr>
      <th>Company</th>

      
      <th v-for="header in this.responsedata.header" :key="header.id">{{ header }}</th>
      
      
    </tr>
  </thead>
  <tbody>
    
    
    <tr v-for="element in this.responsedata.dishes_per_companies" :key="element.company">
      <td>
        {{ element.company }}
      </td>
      <td v-for="dish in element.dishes" :key="dish.id">
        {{ dish.quantity }}
      </td>
    
    </tr>
    
    <!-- <tr>
      <td>
        <b>Total</b>
      </td>
    
      <td v-for="total in total_dishes" :key="total">
        <b>{{ total }}</b>
      </td>
    
    </tr> -->
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
        closed: false,
        dishes:[],
        companies:[],
        total_dishes:[],
        dishes_per_companies:[],
        header:[],
      },
      role:'',
      total_dishes:0,
  };
},
mounted(){
  this.role = this.getRole()
  axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/meal/dishes",{meal_external_id:this.$route.params.meal_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> {this.responsedata = response.data})

},
methods:{
  ...mapGetters(["getRole"]),
  // get_total(){
  //   for(let i=0; i< this.responsedata.dishes_per_companies.length; i++){
  //     for(let j = 0 ; j < this.responsedata.dishes_per_companies[j]; j++){

  //     }
  //   }
  // }
}
}

</script>
