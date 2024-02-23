<template>
    <div v-if="role=='admin'">
        <h1>RESET DAILY POINTS</h1>
        <br>
        <button @click="resetDailyPoints()">dew it :)</button>
        <h1 :class="{'show':success,'no-show':!success}">IT'S ALL BETTER NOW...</h1>
        <h3>{{ this.error }}</h3>
    </div>
    
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default{
    data(){
        return{
            success:false,
            error:'',
            role:'',
        }
    },
    mounted(){
        this.role = this.getRole()
    },
    methods:{
        ...mapGetters(["getRole"]),
        resetDailyPoints(){
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL+'/reset-daily-points',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
                if(response.data=="Success"){
                    this.success=true
                }
                else{
                    this.error="I'm sorry, something has failed :("
                }
                })
        }
    }
}
</script>
<style>
.show{
    display:block;
}
.no-show{
    display:none;
}
</style>