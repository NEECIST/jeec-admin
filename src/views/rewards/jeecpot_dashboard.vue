<template>
    <div class="jeecpot-rewards-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="JEECPOT Rewards Management" description="Manage the rewards for the top students and squads" back_page="/rewards"/>

        <section-title-component section="List of JEECPOT Rewards"/>

        <button class="waves-effect blue lighten-2 btn add-btn right" @click="createReward()"><i
                    class="material-icons left">add</i>JEECPOT Reward</button>

        <div class="list">
            <div v-if="responsedata.error != null">
                <blockquote class="create-error">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else>
                <table class="striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="jeecpot_reward in this.jeecpot_rewards" :key="jeecpot_reward.id">
                            <td style="width: 10%;">
                                <b>{{ jeecpot_reward.id }}</b>
                            </td>

                            <td style="width: 85%;">
                                <select name="reward" class="form-control" 
                                v-model="jeecpot_reward.reward_id" 
                                @change="updateReward(jeecpot_reward)">
                                    <option selected disabled value="">Select one reward</option>
                                    <option v-for="reward in rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                </select>
                            </td>

                            <td style="width: 5%;">
                                <button title="Delete Reward" class="waves-effect waves-light btn-floating left" 
                                    @click="deleteReward(jeecpot_reward)"><i class="material-icons red left">delete</i>Delete</button>
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
    import TopBar from '../../components/TopBar.vue';
    import { mapGetters } from "vuex";
    export default {
        name: 'jeecpot-rewards-dashboard',
        components: {
                TopBar
            },

        data(){
            return{
                responsedata: {},
                role:'',
                jeecpot_rewards:[],
                rewards:[],
            }
        },

        async mounted(){
            this.role = this.getRole()
            await axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/jeecpot_rewards",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
            const data = response.data;
            this.jeecpot_rewards = data.jeecpot_rewards;
            this.rewards = data.rewards;        
        });
        },

        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            updateReward(jeecpotReward){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/jeecpot_rewards/update",
                    {external_id: jeecpotReward.external_id,
                     reward_id: jeecpotReward.reward_id,
                    },{auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }});
                },

            createReward(){
                axios.get(process.env.VUE_APP_JEEC_BRAIN_URL+"/jeecpot_rewards/create",
                    {auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }}).then(response=>{
                        const data = response.data;
                        this.jeecpot_rewards = data.jeecpot_rewards;
                        this.rewards = data.rewards;        
                    });
                },

            deleteReward(jeecpotReward){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/jeecpot_rewards/delete",
                    {external_id: jeecpotReward.external_id,},
                    {auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }}).then(response=>{
                        const data = response.data;
                        this.jeecpot_rewards = data.jeecpot_rewards;
                        this.rewards = data.rewards;        
                    });
                },
        }
    }
</script>

<style>
    .back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
    }

    .create-error {
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
    }

    .list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
    }

    .form-control{
    display: block;
    }
</style>