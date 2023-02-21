<template>
    <div class="add-quest" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Quests Management" description="Update quest" back_page="/quests"/>

        <br>
        
        <div class="create-form">
            <div v-if="error != ''">
                <blockquote class="create-error">
                    {{ error }}
                </blockquote>
            </div>
            
            <form v-else>
                <div class="row">
                    <div class="input-field col s5">
                        <input v-model="name" name="name" type="text" class="validate" required>

                        <label for="name" v-if="name == ''">
                            Name
                        </label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s8">
                        <textarea v-model="description" name="description" class="materialize-textarea" maxlength="300"></textarea>

                        <label for="description" v-if="description == ''">
                            Description
                        </label>
                    </div>
                </div>

                Reward:

                <select  v-model="reward" style="display:block; width:20vw; margin:auto">
                    <option disabled value="">Please select one reward</option>
                    <option v-for="reward in rewards" :key="reward.name" :value="reward.external_id">{{  reward.name  }}</option>
                    </select>

                    <div class="input-field col s2 box" :class="{boxname:detectext(day)}">
                            <p>Day</p>
                            <date-pick
                                v-model="day"
                                :format="format"
                                :parseDate="parseDate"
                                :formatDate="formatDate"
                                :inputAttributes="{size: 32}"
                                required
                            ></date-pick>
                        </div>

                <p>Choose by:</p>
              <p class="col s2">
                <label style="margin-right: 20px;">
                  <input v-model="by_activity_type" class="with-gap" type="radio" value="False" />
                  <span>Activity</span>
                </label>
                <label>
                  <input v-model="by_activity_type" class="with-gap" type="radio" value="True" />
                  <span>Activity type</span>
                </label>
              </p>

                <div v-if="by_activity_type == 'True'">
                    <select  v-model="activity_type" style="display:block; width:20vw; margin:auto">
                    <option disabled value="">Please select one activity type</option>
                    <option v-for="activity_type in activity_types" :key="activity_type.name" :value="activity_type.external_id">{{  activity_type.name  }}</option>
                    </select>
                    <br>
                    Quantity
                    <br>

                    <input v-model="quantity" id="quantity" type="number" min="1" class="validate" style="width:20vw">

                        
                    
                        

                </div>

                

                <select v-else v-model="activities" multiple style="display:block; width:20vw; height:10vh; margin:auto">
                <option v-for="activity in all_activities" :key="activity.name" :value="activity.external_id">{{  activity.name  }}</option>
                </select>


                <button type="submit" class="waves-effect blue lighten-2 btn add-btn right" @click="newquest">
                    <i class="material-icons left">save</i>Save Quest</button>

            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex";
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import fecha from 'fecha';
    export default {
        name: 'update-quest',
        components: {
            DatePick
            },

        data(){
            return{
                error: "",
                name: '',
                description: '',
                quantity:1,
                by_activity_type: "False",
                activity_type:{name:'',external_id:''},
                activities:[],
                role:'',
                all_activities:[],
                activity_types:[],
                rewards:[],
                reward:null,
                format: 'DD MM YYYY, dddd',
                date: fecha.format(new Date(), 'DD MM YYYY, dddd'),
                day:''
            }
        },

        methods: {
            ...mapGetters(["getRole"]),

            newquest(event){

                event.preventDefault()
                const new_quest = new FormData();
                new_quest.append('external_id',this.$route.params.quest_external_id)
                new_quest.append('reward', this.reward)
                new_quest.append('day',this.day)
                new_quest.append('name', this.name)
                new_quest.append('description', this.description)
                if(this.by_activity_type == "True"){
                    new_quest.append('activities', '')
                    new_quest.append('quantity', this.quantity)
                    new_quest.append('activity_type', this.activity_type)
                }
                else{
                    new_quest.append('activities', this.activities)
                    new_quest.append('quantity', 0)
                    new_quest.append('activity_type', '')
                }
                
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/quest/update",new_quest,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.error = response.data);
                
                if (this.error == ""){
                    this.$router.push('/quests')
                }
            },
            parseDate(dateString, format) {
            return fecha.parse(dateString, format);
        },
        formatDate(dateObj, format) {
            return fecha.format(dateObj, format);
        },
            detectext(stringvar){
          return stringvar!=''; 
        },
            
        },
        mounted(){
            this.role = this.getRole()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/quest/info",{external_id: this.$route.params.quest_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
                this.error = response.data.error,
                this.all_activities = response.data.activities,
                this.activity_types = response.data.activity_types,
                this.rewards = response.data.rewards,
                this.name = response.data.quest.name,
                this.description = response.data.quest.description,
                this.activities = response.data.quest.activities,
                this.quantity = response.data.quest.quantity,
                this.activity_type = response.data.quest.activity_type,
                this.reward = response.data.quest.reward.external_id
                this.day = response.data.quest.day
                if(this.activity_type!=-1){
                    this.by_activity_type="True"
                }
                console.log(this.activities)
            }
            )
        }
    }
</script>

<style>
    .back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
    }

    .add-btn {
    margin-right: 40px;
    margin-top: 10px;
    margin-bottom: 20px;
    }

    .create-form {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50px;
    }

    .create-error {
        bottom: 10px;
        font-size: 16px;
        font-weight: 600;
        margin-left: 30px;
    }
</style>