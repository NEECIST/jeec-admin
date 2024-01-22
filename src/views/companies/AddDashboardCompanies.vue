<template>  

<div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader name="Companies Management" description="Add, edit or delete company" back_page="/dashboard"/>

    <div class="left" style="margin-left: 30px;">
      <div class="sub_section-title">Events</div>
      <form class="col s12" id="event_form">
        <select v-model="event_chooser" class="form-control" style="height:50px; width: 100px; display: block;" required @change="changeEvent(event_chooser.id)">
          <option v-for="eventt in this.events" :key="eventt.id" :value="eventt"  selected>{{ eventt.name }}</option>
        </select>
      </form>
    </div>

      <router-link to="/companies/add-company" style="margin-top: -0,5vw;">
          <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Company</button>
      </router-link>

      <div class="section-title center-align" style="margin-top:90px;">
          List of Companies
      </div>

      <div class="search-bar">
        <form class="col s12" method="post">
          <div class="row">
            <div class="input-field col s8">
              <input class="col s12 validate" v-model="search_str" type="text" required>
              <label for="name"></label>
            </div>
            <button v-if="search_str" @click="clearSearch" class="btn-floating red lighten-2 search-btn right"><i class="material-icons">clear</i>clear</button>
          </div>
        </form>        
      </div>

          <blockquote v-if="this.error!=''"  class="create-error">
            {{ this.error }}
          </blockquote>
          <div v-else>
          <div class="counter right">
            Companies: {{ filteredCompanies.length }}
          </div>
  
          <table class="striped">
              <thead><tr>
                <th>ID</th>
                <th>Event</th>
                <th>Name</th>
                <th>Business</th>
                <th>Email</th>
                <th>Website</th>
                <th>Partnership</th>
                <th>CV's Access</th>
                <th>Show in Website</th>
              </tr></thead>
              <tbody>
                    <tr v-for="company in filteredCompanies" :key="company.id">
                      <td>{{ company.id }}</td>

                      <td>{{ event_chooser.name }}</td>
  
                      <td><b>{{ company.name }}</b></td>
  
                      <td v-if="company.business_area">
                        
                          {{ company.business_area }}
    
                      </td>
                      <td v-else></td>
  
                      <td v-if="company.email">
                        
                          {{ company.email }}
            
                      </td>
                      <td v-else></td>
                      
                      <td v-if="company.link">
      
                          <a :href="company.link">visit website</a>
                  
                      </td>
                      <td v-else></td>
  
                      <td>
                        
                          <div v-if="company.partnership_tier == 'partner_gold'" class="tier-indicator gold"></div>
                        
                          <div v-else-if="company.partnership_tier == 'partner_silver'" class="tier-indicator silver"></div>
                        
                          <div v-else-if="company.partnership_tier == 'partner_bronze'" class="tier-indicator bronze"></div>
                        
                          <div v-else-if="company.partnership_tier == 'sponsor_platinum'" class="tier-indicator icon-red"><i class="material-icons">star</i></div>

                          <div v-else-if="company.partnership_tier == 'sponsor_gold'" class="tier-indicator gold"><i class="material-icons">star</i></div>

                          <div v-else-if="company.partnership_tier == 'sponsor_silver'" class="tier-indicator silver"><i class="material-icons">star</i></div>

                          <div v-else-if="company.partnership_tier == 'sponsor_bronze'" class="tier-indicator bronze"><i class="material-icons">star</i></div>
                        
                          <div v-else-if="company.partnership_tier == 'nucleo'" class="tier-indicator icon-black"><i class="material-icons">deployed_code</i></div>
                        
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
        companies:[],
        search_str:"",
        search_bool:false,
        role:'',
        event_chooser:[],
        show_companies:[],
        error:'',
        events:[],
    };
    },
    mounted(){
      axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/companies_vue",
      {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
        const data = response.data;
        this.companies = data.companies;
        this.events = data.events;
        this.error = data.error;

        for(var i = this.events.length; i != 0; i--){
            if(this.events[i-1].default == true){
              this.event_chooser = this.events[i-1];
              this.show_companies = this.companies[i-1];
              break
            } 
          }
        this.role = this.getRole()
      })
    },
    methods:{
      ...mapGetters(["getRole"]),
      clearSearch(){
        this.search_str = ""
      },
      changeEvent(event){
        this.show_companies = this.companies[event - 1]
      },
    },
    computed:{
      filteredCompanies: function(){
        if(this.search_str){
          return (this.show_companies.filter((company) => {
          return company.name.toLowerCase().match(this.search_str.toLowerCase());
          })).filter((company) => {
          return company.event==this.event_chooser.id;
          });
        }
        else{
          return this.show_companies.filter((company) => {
            return company.event==this.event_chooser.id;
          });
        }
      }
    },  
    
    }

</script>
