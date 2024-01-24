<template>
    <div class="add-quest" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Quests Management" description="Create a new quest" back_page="/quests"/>

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
                        <input v-model="name" name="name" type="text" required>

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
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import fecha from 'fecha';
    import axios from "axios";
    import TopBar from '../../components/TopBar.vue';
    import { mapGetters } from "vuex";
    export default {
        name: 'add-quest',
        components: {
            DatePick,TopBar
            },

        data(){
            return{
                error: "",
                name: '',
                description: '',
                quantity:1,
                by_activity_type: "False",
                activity_type:'',
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
            ...mapGetters(["StateUsername"]),
            detectext(stringvar){
                return stringvar!=''; 
            },

            newquest(event){
                console.log(this.activities)

                event.preventDefault()
                const new_quest = new FormData();
                new_quest.append('day',this.day)
                new_quest.append('name', this.name)
                new_quest.append('description', this.description)
                new_quest.append('reward', this.reward)
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
                
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/quest/create",new_quest,{auth: {
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
        },
        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL+"/quest/create",
            {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
                this.error = response.data.error,
                this.all_activities = response.data.activities,
                this.activity_types = response.data.activity_types,
                this.rewards = response.data.rewards
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