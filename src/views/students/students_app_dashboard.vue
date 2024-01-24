<template>
    <div class="students-app-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <!-- <navbar-component logo="jeec_logo_mobile.svg"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Student App Management" description="Manage the JEEC Student App" back_page="/dashboard/"/>

        <div class="flexbox-btns" style="margin-top: 100px;">
            <router-link router-link to="/levels" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
            
                <button class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">bar_chart</i>Levels</button>
            
            </router-link>

            <router-link router-link to="/quests" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
            
            <button class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                    class="large material-icons left">bar_chart</i>Quests</button>
        
            </router-link>

            <router-link router-link to="/rewards" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
                <button class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">emoji_events</i>Rewards</button>
            </router-link>

            <router-link router-link to="/squads" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
            
                <button class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">groups</i>Squads</button>
            
            </router-link>

            <router-link router-link to="/students" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
                <button class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">account_circle</i>Students</button>
            </router-link>

            <router-link router-link to="/tags" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
                <button class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">local_offer</i>Tags</button>
            </router-link>
        </div>

        <blockquote class="left" style="margin-left: 40px;margin-top: 70px;">
            <b>Caution!</b> Any change in this system will instantly affect the <b>JEEC Student App</b>!
        </blockquote>
    </div>
</template>

<script>
    // import axios from "axios"
    import { mapGetters } from "vuex";
    import TopBar from '../../components/TopBar.vue';
    export default {
        name: 'student-app-dashboard',
        components: {
            TopBar
            },

        data(){
            return{
                student_app_management: '',
                description__: '',
                role:''
            }
        },
        
        mounted(){
            this.role = this.getRole()
            // axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/student_app_title").then(response => this.student_app_management = response.data)
            // axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/student_app_description", {description: 'Manage the JEEC Student App'}).then(response => this.description__ = response.data)
        },
        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
        }
    }
</script>

<style>
    .flexbox-btns {
    display: -webkit-box;  /* iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox;  /* IE 10 */
    display: -webkit-flex; /* Safari 6.1+. iOS 7.1+, BB10 */
    display: flex;         /*Firefox, Chrome, Opera */
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    margin-top: 30px;
    }
    button {
    font-weight: 600;
    transition: all .2s ease-in-out; 
    }
</style>