<template>
    <div class="auction-participants-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>
        
      <body>
            <navbar-component logo="brain.png"/>

            <section-header-component :name=bigdata.auction.name description="Participants" back_page="/auctions"/>
            
            <br>
            <br>
            <br>

            <form style="margin-right: 100px;">
                <p v-if="bigdata.not_participants.length == 0" class="right">All companies are participating in the auction!</p>
                <select v-else v-model="company.external_id" name="company_external_id" class="select-css right" style="width: 200px; display: block;" required>
                    <option disabled>Select new participant</option>
                    <option v-for="companyy in bigdata.not_participants" :key="companyy.id" :value="companyy.external_id">{{ companyy.name }}</option>
                </select>

                <br>
                <br>
                <br>   

                <button v-on:click="postParticipant" type="submit" class="waves-effect blue lighten-2 btn-small right"><i class="material-icons left">save</i>Save participant</button>
            </form>
            
            <br>
            
            <div class="section-title center-align" style="margin-top:30px;">
                Companies able to access this auction:
            </div>

            <div class="list">
                <blockquote v-if="error != ''" class="create-error">
                {{ error }}
                </blockquote>
                <div v-else class="counter right">
                    Participants: {{ bigdata.auction.participants.length }}
                </div>
                <table class="striped">
                    <thead><tr>
                    <th>Name</th>
                    </tr></thead>
                    <tbody>
                        <tr v-for="participant in bigdata.auction.participants" :key="participant.id">
                            <td><b>{{ participant.name }}</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
      </body>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters } from "vuex";
    export default {
      name: 'auction-participants-dashboard',
      components: {
        
      },
      props:{
          
      },
      methods: {
        ...mapGetters(["getRole"]),
        ...mapGetters(["StateUsername"]),
        postParticipant(e) {
            e.preventDefault()

            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/add-participant_vue',{auction_external_id: this.bigdata.auction.external_id, company_external_id: this.company.external_id, username: this.StateUsername()}, {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {this.bigdata1 = response.data
            this.error = this.bigdata1.error})
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/participants_vue', {auction_external_id: this.bigdata.auction.external_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.bigdata = response.data)
            //this.bigdata.auction.external_id = this.bigdata1.auction_external_id
        },
      },
      data(){
        return{
            error:"",
            bigdata:{
                not_participants:[],
                auction: {participants: []},
            },
            auction_id: this.$route.params.auction_id,
            path: '/admin/auctions/participants',
            bigdata1:{
                error:"",
                auction_external_id:"",
            },
            company: {name: '', external_id: ''},
            role:''
        }
      },
      mounted() {
        this.role = this.getRole()
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/participants_vue',{auction_external_id: this.auction_id, username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.bigdata = response.data)
        }
    }

</script>