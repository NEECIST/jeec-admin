<template>
    <div class="quests" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'" :key="merda">
      <head-component/>
        
        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Quests Management" description="Edit or create quests" back_page="/students-app/"/>


          <router-link router-link :to="{ name: 'add-quest' }">
            <button class="waves-effect blue lighten-2 btn add-btn right"><i
              class="material-icons left">add</i>Quest</button>
          </router-link>
     

        <br>
          <div v-if="quests.length > 0">
            <div class="section-title center-align" style="margin-top:50px;">
          List of quests
        </div>

        <div class="list">
          <table class="striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Reward</th>
                <th>Day</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="quest in quests" :key=quest.id>
                <td>
                    {{ quest.name }}
                </td>
                <td>
                    {{ quest.description }}
                </td>
                <td>
                    {{ quest.reward }}
                </td>
                <td>
                  {{ quest.day }}
                </td>

                <td>
                    <router-link router-link :to="{ name: 'update-quest', params: { quest_external_id: quest.external_id }}">
                      <button class="waves-effect waves-light btn-floating"><i
                        class="material-icons left">edit</i>Edit</button>
                    </router-link>
                </td>
                <td>
                  <button type="submit" class="waves-effect red lighten-2 btn-floating" @click="deletequest(quest.external_id)">
                    <i class="material-icons left">close</i>Delete Quest</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div v-else>
          No quests added yet
        </div>
    </div>
    
</template>

<script>
    import axios from "axios";
    import { mapGetters} from "vuex";
    export default {
      name: 'quests-dashboard',
      components:{
        TopBar
      },
      data(){
        return{
          role:'',
          quests:[],
          merda:0,
        }
      },
      mounted() {
        this.role = this.getRole()
        axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/quests',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
          console.log(response.data)
          this.quests = response.data.quests})
      },
      methods:{
        ...mapGetters(["getRole"]),
        ...mapGetters(["StateUsername"]),
        async deletequest(external_id){
            await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/quest/delete",{external_id:external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }})
            await axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/quests',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
              this.quests = response.data.quests})
            }
      }
      
    }

</script>