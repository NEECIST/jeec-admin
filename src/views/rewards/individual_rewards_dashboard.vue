<template>
    <div class="squad-rewards-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Individual Rewards Management" description="Manage the daily rewards for the top Students" back_page="/rewards"/>

        <section-title-component section="List of Individual Rewards"/>

        <div>
            <router-link router-link to="/individual_rewards/add">
                <button class="waves-effect blue lighten-2 btn add-btn right"><i
                    class="material-icons left">add</i>Individual Reward</button>
            </router-link>
        </div>

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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="squad_reward in squad_rewards" :key="squad_reward.id">
                            <td>
                                <b>{{ squad_reward.date }}</b>
                            </td>

                            <td>
                                <b>{{ squad_reward.name }}</b>
                            </td>

                            <td>
                                <form method="get" style="margin: 0;">
                                    <router-link router-link :to="{ name: 'update-individual-reward', params: { external_id: squad_reward.external_id }}">
                                    <button title="Edit Individual Reward" class="waves-effect waves-light btn-floating"><i
                                        class="material-icons left">edit</i>Edit</button>
                                    </router-link>
                                </form>
                            </td>
                            <td>
                                <button type="submit" class="waves-effect red lighten-2 btn-floating" @click="deleteIndividualReward(squad_reward.external_id)">
                                <i class="material-icons left">close</i>Delete Individual Reward</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import axios from 'axios';

    export default {
        name: 'individual-rewards-dashboard',
        components: {

            },
        
        data(){
            return{
                error: '',
                squad_rewards: [{reward_id: '#', date: '27/11'}, {reward_id: '#2', date: '28/11'},],
                reward: '',
                rewards: [
                    {id: '#', name: 'something'},
                    {id: '#2', name: 'something2'},
                ],
                role:'',
                errorr: ''
            }
        },
        methods:{
            ...mapGetters(["getRole"]),
            async deleteIndividualReward(external_id) {
                await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/delete_individual_reward',{external_id: external_id},{auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response => 
                {const data = response.data; // [{}, {}]
                this.errorr = data.error;
                if (this.errorr == '') {
                    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/individual_rewards',{}, {auth: {
                        username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                        password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                        }}).then(response => {
                            const data = response.data; // [{}, {}]
                            this.squad_rewards = data.individual_rewards;
                            this.rewards = data.rewards})
                }})
            },
        },
        mounted(){
            this.role = this.getRole()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/individual_rewards',{}, {auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response => {
                    const data = response.data; // [{}, {}]
                    this.squad_rewards = data.individual_rewards;
                    this.rewards = data.rewards})
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
</style>