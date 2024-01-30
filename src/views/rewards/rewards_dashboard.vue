<template>
    <div class="rewards-dasboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <div>
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Rewards Management" description="Create and manage rewards" back_page="/students-app/"/>

        <section-title-component section="List of Rewards"/>

        <div class="search-bar">
            <form class="col s12" method="get">
                <div class="row">
                    <div class="input-field col s8">
                        <input type="text" v-model="search" class="col s12 validate" id="search" name="search" @keyup.enter="filteredRewards" required/>

                        <label for="search" v-if="search == ''">
                            Search reward
                        </label>
                    </div>
                    <span>
                        <button v-if="search != ''" class="search-btn red btn-floating left" style="margin-top: 20px;" @click="eraseSearch"><i class="material-icons">clear</i></button>
                    </span>
                </div>
            </form>
        </div>

        <div>
            <router-link router-link to="/rewards/add">
                <button class="waves-effect blue lighten-2 btn add-btn right"><i
                    class="material-icons left">add</i>Reward</button>
            </router-link>
            <router-link router-link to="/rewards/individual">
                <button class="waves-effect lighten-2 btn add-btn right"><i
                    class="material-icons left">add</i>Individual Reward</button>
            </router-link>
            <router-link router-link to="/rewards/squad">
            
                <button class="waves-effect lighten-2 btn add-btn right"><i
                    class="material-icons left">edit</i>Squad Rewards</button>
        
            </router-link>
            <router-link router-link to="/rewards/jeecpot">
            
                <button class="waves-effect lighten-2 btn add-btn right"><i
                    class="material-icons left">edit</i>JEECPOT Rewards</button>
            
            </router-link>
            <br><br>
        </div>

        <div class="list">
            <div v-if="responsedata.error != null">
                <blockquote class="create-error">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else-if="filteredRewards.length == 0" class="create-error">
                <blockquote class="create-error">
                    <p>No results found!</p>
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                Rewards: {{ filteredRewards.length }}
                </div>

                <table class="striped" ref="rewardsTable">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="reward in filteredRewards" :key="reward.external_id">
                            <td>
                                <b>
                                {{ reward.name }}
                                </b>
                            </td>

                            <td>
                                {{ reward.description }}
                            </td>

                            <td>
                                <a :href="reward.link" target="_blank">{{ reward.link }}</a>
                            </td>

                            <td>
                                {{ reward.quantity }}
                            </td>

                            <td>
                                <router-link router-link :to="{ name: 'update-reward', params: { external_id: reward.external_id }}">
                                    <button title="Edit Reward" class="waves-effect waves-light btn-floating">
                                        <i class="material-icons left">edit</i>Edit</button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import TopBar from '../../components/TopBar.vue';
    import { mapGetters } from "vuex";
    export default {
        name: 'rewards-dashboard',
        components: {
                TopBar
            },
        
        data(){
            return{
                search: '',
                responsedata: {error: null, rewards: []},

                ready: false,
                role:''
            }
        },

        computed: {
            filteredRewards() {
                return this.responsedata.rewards.filter((reward) => {
                    return reward.name.toLowerCase().includes(this.search.toLowerCase())
                });
            },
        },

        methods: {
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            eraseSearch(){
                this.search = '';
            },
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/rewardss",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{this.responsedata = response.data});
            
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

    .list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
    }

    .search-bar {
    margin-left: 35vw;
    margin-right: 20vw;
    }

    .search-btn {
    margin-top: 20px;
    }

    .clear-search {
        color: rgb(119, 119, 119);
    }

    .clear-search:hover {
        color: rgb(172, 172, 172);
    }
</style>