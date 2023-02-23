<template>
    <div class="dashboard">
        <head-component/>
        
        <body v-if="bigdata.error==''">
            <div class="navbar-component">
                <div class="nav-bar">
                    <a href=""><img class="jeec-logo-mobile"
                        :src="require('@/assets/' + 'brain.png')"></a>

                    <div class="company-dash-username right" style="color:black">{{user.name}}</div>

                    <form action="" >
                        <button v-on:click="logout" class="waves-effect red lighten-2 btn-small right logout-btn"><i
                            class="material-icons left">lock</i>Log out</button>
                    </form>

                    <a target="_blank" rel="noopener noreferrer" href="https://jeec.ist" method="get">
                        <button class="waves-effect waves-light btn-small right" style="margin-top: -3px; margin-right: 50px;"><i
                                class="large material-icons left">web</i>Visit website</button>
                    </a>
                </div>
            </div>

            <div class="section-header" style="margin-top:100px">
                   <h2>Brain</h2>
                   <p>Event data management system</p><p>Manage all the features for the event</p>
            </div>

            <center>
                <h3 v-if="bigdata.event != ''" class="section-title">{{ bigdata.event.name }}</h3>
            <!--    <img v-if="bigdata.logo != ''" :src="require('@/assets/' + bigdata.logo)" class="company-logo centered-image"> -->
            </center>
            <blockquote v-if="bigdata.event!= '' && bigdata.logo == ''" class="create-error">
                Logo missing! Please, upload one
            </blockquote>
            <blockquote v-if="bigdata.event == ''" class="create-error">
                No default event! Create an event to enjoy all the functionalities.
            </blockquote>

            <div class="flexbox-btns">
                <router-link router-link :to="{name: 'activities-dashboard'}">
                    <form method="get">
                    <button  v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">build</i>Activities</button>
                    </form>
                </router-link>

                 <router-link router-link to="/checkrewards" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'business' || user.role == 'coordination' || user.role == 'admin'||user.role=='marketing'|| user.role == 'partnerships'">
        
                    <button class="waves-effect blue lighten-2 btn-large dashboard-btn" ><i
                        class="large material-icons left">emoji_events</i>Claim Prizes</button>
           
                </router-link>

                <router-link router-link to="/companies" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'business' || user.role == 'coordination' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">business</i>Companies</button>
                    </form>
                </router-link>
                
                <router-link router-link to="/meals" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'business' || user.role == 'coordination' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">restaurant</i>Meals</button>
                    </form>
                </router-link>

                <router-link router-link to="/speakers" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'coordination' || user.role == 'partnerships' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">speaker_notes</i>Speakers</button>
                    </form>
                </router-link>
                
                <router-link router-link to="/teams" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'coordination' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">group</i>Team</button>
                    </form>
                </router-link>
            </div>

            <div class="flexbox-btns" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'coordination' || user.role == 'admin'">
                <router-link router-link to="/auctions">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">attach_money</i>Auctions</button>
                    </form>
                </router-link>
                
                <router-link router-link to="/events" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'coordination' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">event</i>Events</button>
                    </form>
                </router-link>

                <router-link router-link to="/students-app" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'coordination' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn" ><i
                        class="large material-icons left">settings_cell</i>Students App</button>
                    </form>
                </router-link>
                
                <router-link router-link to="/usersdashboard" v-if="user.role == 'webdev' || user.role == 'webdev_tl' || user.role == 'coordination' || user.role == 'admin'">
                    <form method="get">
                    <button v-on:click="EventSetter(bigdata.event.external_id)" class="waves-effect blue lighten-2 btn-large dashboard-btn"><i
                        class="large material-icons left">lock</i>Users</button>
                    </form>
                </router-link>
            </div>

            <blockquote style="margin-left: 40px;margin-top: 70px;">
                <b>Caution!</b> Any change in this system will instantly affect the <b>JEEC website</b> and <b>JEEC Student App</b>!
            </blockquote>
        </body>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex";
    import axios from 'axios'
    import { mapActions } from "vuex";

    export default {
      name: 'dashboard-main',
      components: {
        
      },
      props:{
          
      },
      data(){
        return{
            user:{name:'',role:''},
            bigdata:{
                error:"",
                event: {},
                logo: '',
            }
        }
      },
      methods: {
            ...mapGetters(["isAuthenticated"]),
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            ...mapGetters(["Event_id"]),
            ...mapMutations(["setEvent_id"]),
            ...mapActions(["LogOut"]),
            async logout(e) {
                e.preventDefault()
                try {
                    await this.LogOut()
                    if (!this.isAuthenticated()){
                        console.log("LogOut success")
                        this.$router.push("/")
                    }
                    else{
                        console.log("LogOut failed")
                    }
                    
                } catch (error) {
                    console.log("LogOut failed")
                }

            },
            EventSetter(external_id){
                this.setEvent_id(external_id)
            }
      },
      mounted() {
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/dashboard_vue',{username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            this.bigdata = response.data
            console.log(this.bigdata.error)}); 
        this.user.name = this.StateUsername() 
        this.user.role =  this.getRole()
        }
    }

</script>