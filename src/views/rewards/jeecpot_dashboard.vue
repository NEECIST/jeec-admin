<template>
    <div class="jeecpot-rewards-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="JEECPOT Rewards Management" description="Manage the rewards for the top students and squads" back_page="/rewards"/>

        <section-title-component section="List of JEECPOT Rewards"/>

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
                            <th>Destinatary</th>
                            <th>Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <b>First Student</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.first_student_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Second Student</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.second_student_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Third Student</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.third_student_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>First Squad</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.first_squad_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Second Squad</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.second_squad_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Third Squad</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.third_squad_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>King of Job Fair</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.king_job_fair_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>King of Knowledge</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.king_knowledge_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>King of Hacking</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.king_hacking_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>King of Networking</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.king_networking_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>CV Platform Raffle</b>
                            </td>

                            <td>
                                <form>
                                    <select name="reward" class="form-control" v-model="responsedata.jeecpot_rewards.cv_platform_raffle_reward_id" @change="updateReward">
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
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
    import axios from "axios"
    import { mapGetters } from "vuex";
    export default {
        name: 'jeecpot-rewards-dashboard',
        components: {
                TopBar
            },

        data(){
            return{
                responsedata: {},
                role:''
            }
        },

        async mounted(){
            this.role = this.getRole()
            await axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/jeecpot-rewardss",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{this.responsedata = response.data});
        },

        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            updateReward(){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/jeecpot-rewards/update",{jeecpot_external_id: this.responsedata.jeecpot_external_id,
                    first_student_reward_id: this.responsedata.jeecpot_rewards.first_student_reward_id,
                    second_student_reward_id: this.responsedata.jeecpot_rewards.second_student_reward_id,
                    third_student_reward_id: this.responsedata.jeecpot_rewards.third_student_reward_id,
                    first_squad_reward_id: this.responsedata.jeecpot_rewards.first_squad_reward_id,
                    second_squad_reward_id: this.responsedata.jeecpot_rewards.second_squad_reward_id,
                    third_squad_reward_id: this.responsedata.jeecpot_rewards.third_squad_reward_id,
                    king_job_fair_reward_id: this.responsedata.jeecpot_rewards.king_job_fair_reward_id,
                    king_knowledge_reward_id: this.responsedata.jeecpot_rewards.king_knowledge_reward_id,
                    king_hacking_reward_id: this.responsedata.jeecpot_rewards.king_hacking_reward_id,
                    king_networking_reward_id: this.responsedata.jeecpot_rewards.king_networking_reward_id,
                    cv_platform_raffle_reward_id: this.responsedata.jeecpot_rewards.cv_platform_raffle_reward_id,
                },{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response=>this.error = response.data);
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