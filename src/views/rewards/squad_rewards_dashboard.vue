<template>
    <div class="squad-rewards-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Squad Rewards Management" description="Manage the daily rewards for the top Squads" back_page="/rewards"/>

        <div class="flexbox">
            <div class="flex-child">
                <section-title-component section="Daily Rewards"/>

                <div class="list">
                    <div v-if="error != ''">
                        <blockquote class="create-error">
                            {{ error }}
                        </blockquote>
                    </div>
                    <div v-else>
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Reward</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="date in this.dates" :key="date.id">
                                    <td>
                                        <b>{{ date.name }}</b>
                                    </td>

                                    <td>
                                        <select name="reward" class="form-control" 
                                        v-model="daily_rewards[date.id].reward_id" 
                                        @change="updateDailyReward(date.name, daily_rewards[date.id])">
                                            <option selected disabled value="">Select one reward</option>
                                            <option v-for="reward in rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                        </select>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="flex-child">
                <section-title-component section="Weekly Rewards"/>

                <div class="list">
                    <div v-if="error != ''">
                        <blockquote class="create-error">
                            {{ error }}
                        </blockquote>
                    </div>
                    <div v-else>
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Place</th>
                                    <th>Reward</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="weekly_reward in this.weekly_rewards" :key="weekly_reward.id">
                                    <td>
                                        <b>{{ weekly_reward.place }}</b>
                                    </td>

                                    <td>
                                        <select name="reward" class="form-control" 
                                        v-model="weekly_reward.reward_id" 
                                        @change="updateWeeklyReward(weekly_reward.place, weekly_reward)">
                                            <option selected disabled value="">Select one reward</option>
                                            <option v-for="reward in rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                        </select>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import axios from 'axios';
    import TopBar from '../../components/TopBar.vue';

    export default {
        name: 'squad-rewards-dashboard',
        components: {
                TopBar
            },
        
        data(){
            return{
                error: '',
                squad_rewards: [{reward_id: '', date: ''}, {reward_id: '', date: ''},],
                rewards: [],
                role:'',
                errorr: '',
                dates:[],
                daily_rewards: [],
                weekly_rewards: [],
            }
        },
        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            updateDailyReward(date, squadReward){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/squad_reward/update",
                    {external_id: squadReward.external_id,
                     reward_id: squadReward.reward_id,
                     date: date,
                     place: null,
                    },{auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }});
                },
            updateWeeklyReward(place, squadReward){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/squad_reward/update",
                    {external_id: squadReward.external_id,
                     reward_id: squadReward.reward_id,
                     date: null,
                     place: place,
                    },{auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }});
                },
        },
        mounted(){
            this.role = this.getRole()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/squad_rewards',{}, {auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response => {
                    const data = response.data; // [{}, {}]
                    this.daily_rewards = data.squad_rewards_daily;
                    this.weekly_rewards = data.squad_rewards_weekly;
                    this.rewards = data.rewards
                    this.dates = data.dates})
        },
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

    .flexbox{
        display:flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-evenly;
    }

    .flex-child{
        width:40%;
    }
</style>