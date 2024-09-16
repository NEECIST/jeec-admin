<template>
    <div class="tags-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="" description="JEECPOT" back_page="/students-app/"/>

        <section-title-component section="Get JEECPOT Winners"/>

        <p v-for="winner in winners" :key="winner">
            {{ winner }} <br>
        </p>

    </div>

</template>

<script>
    import axios from "axios";
    import TopBar from '../../components/TopBar.vue';
    import { mapGetters } from "vuex";
    export default {
        name: 'tags-dashboard',
        components: {
                TopBar
            },

        data(){
            return{
                role:'',
                name: '',
                winners:[],
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/jeecpot_winners",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.winners = response.data.names);
        },

        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
        }
    }
</script>

<style>
    .tag {
    margin: 0;
    margin-top: 22px;
    width: 200px;
    height: 50px;
    font-size: 20px;
    color: white;
    overflow-wrap: break-word;
    }

    .tag-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #26a69a;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 20px;
    margin-bottom: 20px;
    }

    .list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
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
</style>