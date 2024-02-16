<template>
    <div class="ticket_levels-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Ticket Levels Management" description="Define the students progess" back_page="/students-app/"/>

        <section-title-component section="List of Ticket Levels"/>

        <div class="list">
            <div v-if="responsedata.error != null">
                <blockquote class="create-error left">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else-if="error != ''">
                <blockquote class="create-error left">
                    {{ error }}
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                Ticket Levels: {{ responsedata.ticket_levels.length }}
                </div>

                <blockquote class="create-error left">
                <b>Caution!</b> Deleting ticket levels could directly affect the students progress!
                </blockquote>

                <table class="striped">
                    <thead>
                        <tr>
                        <th>Ticket Type</th>
                        <th>Threshold</th>
                        <th>Reward</th>
                        </tr>
                    </thead>
                    <tbody>                
                        <tr v-for="ticket_level in responsedata.ticket_levels" v-bind:key="ticket_level.external_id">
                            <td width="10%">
                                <b>
                                {{ ticket_level.ticket_type }}
                                </b>
                            </td>

                            <td>
                                {{ ticket_level.threshold}} 
                            </td>


                            <td width="20%">
                                <form>
                                    <select name="reward" class="form-control" v-model="ticket_level.reward.external_id" @change="changeReward(ticket_level)">
                                        <option disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" v-bind:key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>

                            <td>
                                                                                                    <!--retirei cenas do onsubmit-->
                                    <button title="Delete ticket level" class="waves-effect waves-light red btn-floating" @click="deleteTicketLevel(ticket_level.external_id)"><i
                                        class="material-icons left">delete</i>Delete</button>
                            
                            </td>
                        </tr>                

                        <tr>

                            <td>
                                <select v-model="ticket_type" id="ticket_type" style="display:block">
                                    <option value="Daily">Daily</option>
                                    <option value="Final">Final</option>
                                    </select>
                                
                            </td>

                            <td>
                                <input v-model="threshold" id="threshold">
                            </td>

                            <td>
                     
                                    <select name="reward" form="create-ticket_level" class="form-control" v-model="Reward" required>
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" v-bind:key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                           
                            </td>

                                <td>
                                    <button title="Add ticket level" class="waves-effect waves-light btn-floating" @click="createTicketLevel()"><i
                                        class="material-icons left">add</i>Add</button>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>            
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters } from "vuex";
    import TopBar from '../../components/TopBar.vue';
    export default {
        name: 'ticket_levels-dashboard',
        components: {
            TopBar
            },
        data(){
            return{
                error: '',
                level_points: 1,
                responsedata: {error: null, ticket_levels: [], rewards: []},
                Reward: '',
                role:'',
                ticket_type:'',
                threshold:'',
            }
        },
        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/ticket_levelss",
                    {auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response=>{
                        this.responsedata = response.data;
                        // let points = 0;
                        // for(var i = 0; i < this.responsedata.levels.length; i++){
                        //     this.responsedata.levels[i].starting_points = points;
                        //     this.responsedata.levels[i].points = this.responsedata.levels[i].ending_points - this.responsedata.levels[i].starting_points;
                        //     points += this.responsedata.levels[i].points;
                        // }
            });
        },
        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            deleteTicketLevel(external_id){
                if(!confirm('Are you sure that you want to delete this level?')){
                    return
                }
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/ticket_level/delete",{external_id: external_id}, {auth: {
                    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }}).then(response=>{
                        this.responsedata = response.data;
                        this.$router.go();
                    });
                },
                createTicketLevel(){
                    if(this.Reward == ''){
                        return
                    }
                    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/ticket_level/create",{reward_id: this.Reward, ticket_type: this.ticket_type, threshold: this.threshold},{auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                        }} ).then(response=>{
                            this.error = response.data;
                            this.$router.go();});
                    
                },
            changeReward(ticket_level){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/ticket_level/update", {ticket_level_external_id: ticket_level.external_id, change_reward_id: ticket_level.reward.external_id},{auth: {
                    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response=>this.error = response.data);
            }
        }
    }
</script>
<style>
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
    .back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
    }
</style>