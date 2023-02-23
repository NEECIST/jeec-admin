<template>
    <div class="squad-rewards-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'|| role == 'marketing'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Squad Rewards Management" description="Manage the daily rewards for the top Squads" back_page="/rewards"/>

        <section-title-component section="List of Squad Rewards"/>

        <div class="list">
            <div v-if="error != null">
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
                        <tr v-for="squad_reward in squad_rewards" :key="squad_reward.id">
                            <td>
                                <b>{{ squad_reward.date }}</b>
                            </td>

                            <td>
                                <form method="post" onsubmit="confirm('Are you sure you want to change the reward?');">
                                    <select v-model="reward.id" class="form-control">
                                        <option v-for="reward in rewards" :key="reward.id" :value="reward.name">{{ reward.name }}</option>
                                    </select>
                                </form>
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
    export default {
        name: 'squad-rewards-dashboard',
        components: {

            },
        
        data(){
            return{
                error: null,
                squad_rewards: [{reward_id: '#', date: '27/11'}, {reward_id: '#2', date: '28/11'},],
                reward: '',
                rewards: [
                    {id: '#', name: 'something'},
                    {id: '#2', name: 'something2'},
                ],
                role:''
            }
        },
        methods:{
            ...mapGetters(["getRole"]),
        },
        mounted(){
            this.role = this.getRole()
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