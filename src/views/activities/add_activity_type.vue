<template>
    <div class="add-activity-type" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'|| role =='partnerships'">
        <head-component/>
        
      <body>
            <!-- <navbar-component logo="brain.png"/> -->
            <TopBar :username="this.StateUsername()"/>

            <section-header-component name="Activity Types Management" :description="'Add a new activity type to ' + bigdata.event.name" back_page="/activities/types"/>

            <br>

            <div class="create-form">
                <blockquote v-if="bigdata.error != ''" class="create-error">
                {{ bigdata.error }}
                </blockquote>

                <form class="col s12" action="/admin/activities/new-activity-type" method="post">
                <input hidden style="color: white;" name="event_id" :value="bigdata.event.external_id" type="text">
                <div class="row boxname">
                    <div class="input-field col s5">
                    <input id="name" v-model="name" type="text" class="validate" maxlength="100" required>
                    <label for="name">Name</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s8 box" :class="{boxname:detectext(description)}">
                    <input v-model="description" name="description" class="materialize-textarea" maxlength="300">
                    <label for="description">Description</label>
                    </div>
                </div>

                <div class="row s7">
                    <div class="input-field col s3 box" :class="{boxname:detectext(price)}">
                        <input id="price" v-model="price" type="number" step="0.01" class="validate">
                        <label for="price">Price (€)</label>
                    </div>
                </div>

                Show activity type in JEEC website Homepage:
                <p>
                    <label style="margin-right: 20px;">
                    <input v-model="show_in_home" class="with-gap" name="show_in_home" type="radio" value="true" checked />
                    <span>Yes</span>
                    </label>
                    <label>
                    <input v-model="show_in_home" class="with-gap" name="show_in_home" type="radio" value="false" />
                    <span>No</span>
                    </label>
                </p>
                <br>
                Show activities of this type in JEEC website Schedule:
                <p>
                    <label style="margin-right: 20px;">
                    <input v-model="show_in_schedule" class="with-gap" name="show_in_schedule" type="radio" value="true" checked />
                    <span>Yes</span>
                    </label>
                    <label>
                    <input v-model="show_in_schedule" class="with-gap" name="show_in_schedule" type="radio" value="false" />
                    <span>No</span>
                    </label>
                </p>
                <br>
                Show activities of this type in JEEC Student App:
                <p>
                    <label style="margin-right: 20px;">
                    <input v-model="show_in_app" class="with-gap" name="show_in_app" type="radio" value="true" checked />
                    <span>Yes</span>
                    </label>
                    <label>
                    <input v-model="show_in_app" class="with-gap" name="show_in_app" type="radio" value="false" />
                    <span>No</span>
                    </label>
                </p>
                <router-link router-link :to="{name: 'activity-types-dashboard'}">
                    <button v-on:click="postActivityType" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
                        class="material-icons left">save</i>Save Activity Type</button>
                </router-link>
                </form>
            </div>
        </body> 
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters, mapMutations } from "vuex";
    export default {
        name: 'add-activity-type',
        components: {
            TopBar,
        },
        props:{
            
        },
        data(){
            return{
                bigdata: {
                    error:"",                
                    event: {},
                },
                price: '', description:'', name:'',
                show_in_home: '', show_in_schedule: '', show_in_app: '',
                role:''
            }
        },
        methods: {
            ...mapGetters(["StateUsername"]),
            ...mapGetters(["Event_id"]),
            ...mapGetters(["getRole"]),
            ...mapMutations(["setEvent_id"]),
            detectext(stringvar){
                return stringvar!=''; 
            },
            postActivityType(e) {
                e.preventDefault()
                if (this.name == '') {
                    this.bigdata.error = 'Missing "Name"!'
                    return
                }
                if (this.price == '') {
                    this.bigdata.error = 'Missing "Price"!'
                    return
                }
                if (this.show_in_home == '') {
                    this.bigdata.error = 'Missing "Show activity type in JEEC website Homepage"!'
                    return
                }
                if (this.show_in_schedule == '') {
                    this.bigdata.error = 'Missing "Show activities of this type in JEEC website Schedule"!'
                    return
                }
                if (this.show_in_app == '') {
                    this.bigdata.error = 'Missing "Show activities of this type in JEEC Student App"!'
                    return
                }
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-activity-type_vue', {name: this.name, description: this.description, price: this.price, 
                    show_in_home: this.show_in_home, show_in_schedule: this.show_in_schedule, show_in_app: this.show_in_app,
                    event_id: this.bigdata.event.external_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data

                if (this.bigdata.error == '') {
                    this.$router.push({name: 'activity-types-dashboard'})
                }
                else {
                    this.$router.push({name: 'add-activity-type'})
                }})
            },
        },
        mounted() {
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-activity-type-dashboard_vue', {event_id: this.Event_id(), username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata = response.data
            if (this.bigdata.error != '') {
                this.$router.push({name: 'activity-types-dashboard'})
            }})
            this.role = this.getRole()
        }
    }
</script>

<style> 
    .boxname input:focus ~ label,
    .boxname input:valid ~ label,
    .boxname textarea:focus ~ label,
    .boxname textarea:valid ~ label
    {
        top: -20px;
        left: 10px;
        font-size: 12px;
    }

    .box input:invalid ~ label,
    .box input:focus ~ label,
    .box textarea:focus ~ label,
    .box textarea:not(:valid) ~ label
    {
        top: -20px;
        left: 10px;
        font-size: 12px;
    }
</style>