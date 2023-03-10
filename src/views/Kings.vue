<template>
    <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Check the Kings" description="Find out who the kings are" back_page="/dashboard/"/>

        <h1>King of 15/15:</h1>
        <p>{{ king_15 }}</p>
        <h1>King of Inside Talks:</h1>
        <p>{{ king_inside_talks }}</p>
        <h1>King of Feira de Emprego:</h1>
        <p>{{ king_job_fair }}</p>
        <h1>King of Palestras:</h1>
        <p>{{ king_palestras }}</p>
        <h1>King of Workshop:</h1>
        <p>{{ king_workshop }}</p>

    </div>
</template>
<script>
    import axios from "axios";
    import { mapGetters } from "vuex";
    export default {
        name: 'kings-dashboard',

        data(){
            return{
                role:'',
                king_15:'',
                king_job_fair:'',
                king_inside_talks:'',
                king_palestras:'',
                king_workshop:'',
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL+'/getkings',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
            }}).then(response=>{
                this.king_15 = response.data.king_15
                this.king_job_fair = response.data.king_job_fair
                this.king_inside_talks = response.data.king_inside_talks
                this.king_palestras = response.data.king_palestras
                this.king_workshop = response.data.king_workshop
            })
        },
        methods:{
            ...mapGetters(["getRole"]),
        }
    }

</script>