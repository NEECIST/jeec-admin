<template>
    <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'||role=='marketing'|| role == 'partnerships'">

        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Check student's rewards" description="Check the rewards each student has obtained" back_page="/dashboard/"/>

        <section-title-component section="List of rewards"/>
        <div class="search-bar">
            <form class="col s12" method="post" @submit="search">
              <div class="row">
                <div class="input-field col s8">
                  <input placeholder="ist1xxxxxx" class="col s12 validate" v-model="search_str" type="text" required>
                  
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
            Rewards: {{ BigData.length }}
          </div>
          <table class="striped">
            <thead><tr>
              <th>IST ID</th>
              <th>Prize Name</th>
              <th>Collected</th>
              <th>Update</th>
            </tr></thead>
            <tbody>
              <tr v-for="reward in BigData.rewards" :key="reward.ext_id">
                <td>{{ reward.student_id }}</td>

                <td><b>{{ reward.reward_name }}</b></td>

                <td>
                  <div v-if="reward.acquired">
                    <i class="material-icons icon-green">check</i>
                  </div>
                  <div v-else>
                      <i class="material-icons icon-red">clear</i>
                  </div>
              </td>
              <td>
                <button @click="ChangeState(reward.ext_id)" title="Edit " class="waves-effect waves-light btn-floating">
                </button>
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
        name: 'check_rewards',
        components: {
            },
        data(){
            return{
                BigData:{
                  rewards:[],
                  length:0
                },
                search_str:"",
                search_bool:false,
                role:''
            };
          },
    mounted(){
      this.role =  this.getRole()
    },
    methods:{
      ...mapGetters(["isAuthenticated"]),
      ...mapGetters(["StateUsername"]),
      ...mapGetters(["getRole"]),
      search(e){
        e.preventDefault()
        this.search_bool=true
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/student_rewards',{search: this.search_str},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.BigData=response.data)
        // for(var i=0;i<this.BigData.rewards.length;i++){
        //   if(this.BigData.rewards[i].name.includes(this.search_str)){
        //     this.rewards.push(this.BigData.rewards[i])
        //   }
        // }
      },
      clearSearch(){
        this.search_bool=false
        this.rewards = this.BigData.rewards
        this.search_str = ""
      },
      ChangeState(ext_id){
        console.log(ext_id)
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/student_rewards/update',{external_id: ext_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.BigData=response.data)
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