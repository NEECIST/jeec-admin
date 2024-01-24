<template>
    <div class="squads-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Squads Management" description="Ban and manage squads" back_page="/students-app/"/>

        <section-title-component section="List of Squads"/>

        <div class="search-bar">
            <form class="col s12" method="get">
                <div class="row">
                    <div class="input-field col s8">
                        <input v-model="search" id="search" name="search" type="text" class="col s12 validate" required>

                        <label for="search" v-if="search == ''">
                            Search squad
                        </label>
                    </div>
                    <span>
                        <button v-if="search != ''" class="search-btn red btn-floating left" style="margin-top: 20px;" @click="eraseSearch"><i class="material-icons">clear</i></button>
                    </span>
                </div>
            </form>
        </div>

        <div class="list">
            <div v-if="responsedata.error != null">
                <blockquote class="create-error">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else-if="filteredSquads.length == 0">
                <blockquote class="create-error">
                    <p>No results found!</p>
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                Squads: {{ filteredSquads.length }}
                </div>

                <table class="striped">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Cry</th>
                        <th>Captain Id</th>
                        <th>Members Id</th>
                        <th>Daily Points</th>
                        <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="squad in filteredSquads" v-bind:key="squad.name">
                            <td>
                                <b>
                                {{ squad.name }}
                                </b>
                            </td>

                            <td>
                                {{ squad.cry }}
                            </td>

                            <td>
                                {{ squad.captain_ist_id }}
                            </td>

                            <td>
                                {{ squad.members_id }}
                            </td>

                            <td>
                                {{ squad.daily_points }}
                            </td>

                            <td>
                                {{ squad.total_points }}
                            </td>

                            <td>
                                <form onsubmit="return confirm('Are you sure you want to ban this squad?');">
                                    <button title="Ban squad" class="waves-effect waves-light btn-floating" @click="bansquads(squad.name)">
                                        <i class="material-icons red left">person_remove</i>Ban</button>
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
    import axios from "axios";
    import TopBar from '../../components/TopBar.vue';
    import { mapGetters } from "vuex";
    export default {
        name: 'squads-dashboard',
        components: {
            TopBar
            },

        data(){
            return{
                search: '',
                role:'',
                responsedata: {error: null, squads:[]},
            }
        },

        computed: {
            filteredSquads() {
                return this.responsedata.squads.filter((squad) => {
                    return squad.name.toLowerCase().includes(this.search.toLowerCase())
                });
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/squadss",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
        },

        methods: {
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            bansquads(name){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/bansquad", {bansquad: name},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
            }
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