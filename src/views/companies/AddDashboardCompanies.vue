<template>  

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Companies Management" description="Add, edit or delete company" back_page="/dashboard"/>

  
      

      <router-link to="/companies/add-company" style="margin-top: -0,5vw;">
          <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Company</button>
      </router-link>

  
      <div class="section-title center-align" style="margin-top:90px;">
          List of Companies
      </div>


      <div class="search-bar">
        <form class="col s12" method="post" @submit="search">
          <div class="row">
            <div class="input-field col s8">
              <input class="col s12 validate" v-model="search_str" type="text" required>
              
              <label for="name"></label>
            </div>
            <button type="submit" class="btn-floating blue lighten-2 search-btn"><i class="material-icons">search</i>Search</button>
            <button v-if="search_bool" @click="clearSearch" class="btn-floating red lighten-2 search-btn right"><i class="material-icons">clear</i>clear</button>
          </div>
        </form>
  
        

        
      </div>


          <blockquote v-if="responsedata.error!=''"  class="create-error">
            {{ responsedata.error }}
          </blockquote>
          <div v-else>
          <div class="counter right">
            Companies: {{ companies.length }}
          </div>
  
          <table class="striped">
              <thead><tr>
                <th>ID</th>
                <th>Name</th>
                <th>Business</th>
                <th>Email</th>
                <th>Website</th>
                <th>Partnership</th>
                <th>CV's Access</th>
                <th>Show in Website</th>
              </tr></thead>
              <tbody>
                  <!--{% for company in companies %}-->
                    <tr v-for="company in companies" :key="company.id">
                      <td>{{ company.id }}</td>
  
                      <td><b>{{ company.name }}</b></td>
  
                      <td v-if="company.business_area">
                        
                          {{ company.business_area }}
    
                      </td>
  
                      <td v-if="company.email">
                        
                          {{ company.email }}
            
                      </td>
                      
                      <td v-if="company.link">
      
                          <a :href="company.link">visit website</a>
                  
                      </td>
  
                      <td>
                        
                          <div v-if="company.partnership_tier == 'gold'" class="tier-indicator gold"></div>
                        
                          <div v-else-if="company.partnership_tier == 'silver'" class="tier-indicator silver"></div>
                        
                          <div v-else-if="company.partnership_tier == 'bronze'" class="tier-indicator bronze"></div>
                        
                          <div v-else-if="company.partnership_tier == 'main_sponsor'" class="tier-indicator icon-red"><i class="material-icons">star</i></div>
                        
                          <div v-else-if="company.partnership_tier == 'sponsor'" class="tier-indicator icon-red"><i class="material-icons">attach_money</i></div>
                        
                      </td>
                        
                      <td>
                        
                          <i v-if="company.cvs_access==true" class="material-icons icon-green">check</i>
                        
                          <i v-else class="material-icons icon-red">clear</i>
                        
                      </td>
  
                      <td>
                        
                          <i v-if="company.show_in_website==true" class="material-icons icon-green">check</i>
               
                          <i v-else class="material-icons icon-red">clear</i>
              
                      </td>
                      
                
                      <td>
                        <router-link :to="{ name: 'edit-company', params: {company_external_id: company.external_id }}">
                          <button title="Edit company" class="waves-effect waves-light btn-floating"><i class="material-icons left">edit</i>Edit</button>
                        </router-link>
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
    import axios from "axios";
    import { mapGetters } from "vuex";
    export default {
    name: 'dash-company',
    components: {
        TopBar,
        SectionHeader
    },
    data(){
    return{
        SectionHeader:require("../../components/SectionHeader.vue"),
        TopBar: require( "../../components/TopBar.vue"),
        responsedata:{
          companies:[],
          error:"",
        },
        companies:[],
        search_str:"",
        search_bool:false,
        role:''
    };
    },
    mounted(){
      axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/companies_vue").then(response=>{
        this.responsedata = response.data
        this.companies = this.responsedata.companies
        this.role = this.getRole()
      })
    },
    methods:{
      ...mapGetters(["getRole"]),
      search(e){
        e.preventDefault()
        this.search_bool=true
        this.companies=[]
        for(var i=0;i<this.responsedata.companies.length;i++){
          if(this.responsedata.companies[i].name.includes(this.search_str)){
            this.companies.push(this.responsedata.companies[i])
          }
        }
      },
      clearSearch(){
        this.search_bool=false
        this.companies = this.responsedata.companies
        this.search_str = ""
      }
    }
    
    }

</script>