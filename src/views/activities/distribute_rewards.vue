<template>
    <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'||role=='marketing'|| role == 'partnerships'">

        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Check what Activities have a winner" description="Attribute a winner to each activity" back_page="/dashboard/"/>

        <section-title-component section="List of Activities"/>
        <div class="search-bar">
            <form class="col s12" method="post" @submit="search">
              <div class="row">
                <div class="input-field col s8">
                  <input placeholder="Activity Name" class="col s12 validate" v-model="search_str" type="text" required>
                  
                  <label for="name"></label>
                </div>
                <button type="submit" class="btn-floating blue lighten-2 search-btn"><i class="material-icons">search</i>Search</button>
              </div>
            </form>
        </div>
        
        <blockquote v-if="BigData.error!=''"  class="create-error">
          {{ BigData.error }}
        </blockquote>
        <div v-else>
          <div class="counter right">
            Activities: {{ BigData.length }}
          </div>
          <table class="striped">
            <thead><tr>
              <th>Activity Name</th>
              <th>Activity Reward</th>
              <th>Attributed</th>
              <th>Winner</th>
              
            </tr></thead>
            <tbody>
              <tr v-for="activity in BigData.activities" :key="activity.external_id">
                <td>{{ activity.name }}</td>
                
                <td><b>{{ activity.reward }}</b></td>

                <td>
                  <div v-if="activity.attributed">
                    <i class="material-icons icon-green">check</i>
                  </div>
                  <div v-else>
                      <i class="material-icons icon-red">clear</i>
                  </div>
                </td>
                <td>
                    <div v-if="activity.attributed">
                        <b>{{ activity.winner }}</b>
                    </div>
                    <div v-else>
                        <button @click="ChangeState(activity.external_id)" title="Edit " class="waves-effect waves-light btn-floating">
                        </button>
                    </div>
                  </td>
              
              

              </tr>
            </tbody>

          </table>
        </div>
    </div>

        
   

   
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex";
    export default {
        name: 'distribute-rewards',
        components: {
          TopBar,
            },
        data(){
            return{
                BigData:{
                  Activities:[],
                  length:0
                },
                search_str:"",
                search_bool:false,
                role:'',
                loaded:false,
            };
          },
    mounted(){
      this.role =  this.getRole()
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity/all_activities',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.BigData = response.data, this.loaded = true
          console.log(this.BigData)
          if (this.BigData.error != '') {
            this.$router.push({name: 'activities-dashboard'})
          }})
    },
    methods:{
      ...mapGetters(["isAuthenticated"]),
      ...mapGetters(["StateUsername"]),
      ...mapGetters(["getRole"]),
      search(e){
        e.preventDefault()

      },
      clearSearch(){
        this.search_bool=false
        this.rewards = this.BigData.rewards
        this.search_str = ""
      },
      ChangeState(ext_id){
        
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activity/update_attributed',{external_id: ext_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
          this.BigData.error=response.data.error
          if(this.BigData.error==''){
            this.$router.go()
          }
        }
          )
      }
    }
    
    }
</script>

<style>
    .back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
    }

    .list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
    }

    .create-error {
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
    }

    .counter {
    font-size: 15px;
    word-spacing: 10px;
    color: rgb(102, 101, 101);
    margin-right: 40px;
    }
</style>