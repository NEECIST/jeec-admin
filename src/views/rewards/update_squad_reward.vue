<template>
    <div class="update-squad-reward" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <div class="section-header-component">
            <div class="section-header" style="margin-top:100px">
                <h2>Squad Rewards Management</h2>
                <p>Update the {{date}} squad reward</p>
            </div>
        </div>

        <router-link router-link to="/rewards/squad">
            <button class="waves-effect waves-light btn back-btn left"><i
                class="material-icons left">arrow_back</i>back</button>
        </router-link>

        <br>

        <div class="create-form">
            <div v-if="error != ''">
                <blockquote class="create-error">
                    {{ error }}
                </blockquote>
            </div>

            <form class="col s12">
                <div class="flex-container">
                    <div class="input-field flex-object">
                        <p>Date</p>
                        <select id="date" name="date" v-model="date" class="form-control">
                            <option v-for="date in dates" :key="date.id" :value="date.name">{{ date.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="input-field flex-object">
                        <p>Reward</p>
                        <select id="reward" name="reward" v-model="reward.id" class="form-control">
                            <option v-for="reward in rewards" :key="reward.id" :value="reward.id">{{ reward.name }}</option>
                        </select>
                    </div>

                    <!-- <div class="input-field flex-object">
                        <p>Winner</p>
                        <select id="winner" name="winner" v-model="student.id" class="form-control">
                            <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}</option>
                        </select>
                    </div> -->
                </div>

            </form>
        </div>

        <form>
            <button class="waves-effect red darken-2 btn delete-btn left" @click="deleteSquadReward"><i class="material-icons left">clear</i>Delete
            Reward</button>

            <button type="submit" class="waves-effect blue lighten-2 btn add-btn right" @click="updateSquadReward"><i
                class="material-icons left">save</i>Save Reward</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import TopBar from '../../components/TopBar.vue';
    import { mapGetters } from "vuex";
    export default {
        name: 'update-squad-reward',
        components: {
                TopBar
            },

        data(){
            return{
                error: '',
                date: '',
                dates: [],
                reward: {id: ''},
                role:'',
                external_id: '',
                rewards: [],
                squad_reward: {id: ''},
                squad_rewards: [],
            }
        },

        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            deleteSquadReward(e) {
                e.preventDefault()
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/deletesquadreward_vue',{external_id: this.external_id},{auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response => {this.error = response.data.error
                if (this.error == ''){
                    this.$router.push({name: 'squad-rewards-dashboard'})
                }})
            },

            updateSquadReward(e){
                e.preventDefault()
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/squadreward/update", {
                    external_id: this.external_id, date: this.date,
                    reward_id: this.reward.id,
                },{auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response=>{this.error = response.data.error
                
                if (this.error == ''){
                    this.$router.push({name: 'squad-rewards-dashboard'})
                }})
            },


        },

        mounted(){
            this.role = this.getRole()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/squadrewards_vue',{}, {auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response => {
                    const data = response.data; // [{}, {}]
                    this.rewards = data.rewards;
                    this.squad_rewards = data.squad_rewards;
                    this.dates = data.dates})
        
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/squadreward/update/get', {external_id: this.$route.params.external_id},{auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response=>{
                        const data = response.data;
                        this.date = data.date;
                        this.reward.id = data.reward_id;
                        this.external_id = this.$route.params.external_id
                    })
        },
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

    .delete-btn {
    margin-left: 40px;
    margin-top: 20px;
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

    .company-logo {
    max-height: 150px;
    max-width: 300px;
    margin-bottom: 40px;
    }

    .section-header {
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 30px;
    margin-top: 0px;
    }

    .section-header h2 {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 36px;
    text-transform: uppercase;
    text-align: center;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 10px;
    }

    .section-header p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-family: 'Karla';
    font-weight: 500;
    color: #9195a2;
    }

    .section-header::before {
    content: '';
    position: absolute;
    display: block;
    width: 100px;
    height: 2px;
    background: #4089ff;
    bottom: 0;
    left: calc(50% - 50px);
    }

    @media only screen and (max-width: 750px) {
    .section-header p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 0;
    margin-top: 30px;
    font-size: 18px;
    font-family: 'Karla';
    font-weight: 500;
    color: #9195a2;
    }
    }
</style>