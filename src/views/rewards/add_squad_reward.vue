<template>
    <div class="add-squad-reward" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Squad Rewards Management" description="Add a new squad reward" back_page="/rewards/squad"/>

        <br>
        
        <div class="create-form">
            <div v-if="error != ''">
                <blockquote class="create-error">
                    {{ error }}
                </blockquote>
            </div>
            
            <form class="col s12" enctype="multipart/form-data">
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
                </div>
                

                <button type="submit" class="waves-effect blue lighten-2 btn add-btn right" @click="newsquadreward">
                    <i class="material-icons left">save</i>Save Squad Reward</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex";
    export default {
        name: 'add-squad-reward',
        components: {

            },

        data(){
            return{
                error: '',
                role:'',
                reward: {id: ''},
                rewards: [
                    {id: '#', name: 'something'},
                    {id: '#2', name: 'something2'},
                ],
                student: {id: ''},
                students: [],
                date: '',
                dates: []
            }
        },

        methods: {
            ...mapGetters(["getRole"]),
            
            newsquadreward(e){
                e.preventDefault()
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/createsquadreward_vue", {
                    date: this.date,
                    reward_id: this.reward.id,
                    //winner_id: this.student.id
                },{auth: {
                    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME,
                    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                    }}).then(response=>{this.error = response.data.error
                if (this.error == ''){
                    this.$router.push({name: 'squad-rewards-dashboard'})
                }
                })
                
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