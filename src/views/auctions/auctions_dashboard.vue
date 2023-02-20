<template>
    <div class="auctions-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
      <head-component/>
        
      <body>
          <navbar-component logo="brain.png"/>

          <section-header-component :name="auctions_management" :description="description_auctions" back_page="/dashboard"/>
        
        <form v-if="current_user.role.name == 'admin'">
            <router-link router-link :to="{name: 'add-auction'}">
              <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Auction</button>
            </router-link>
        </form>

        <div class="section-title center-align" style="margin-top:90px;">
            List of Auctions
        </div>

        <div class="list">
            <blockquote v-if="bigdata.error != ''" class="create-error">
              {{ bigdata.error }}
            </blockquote>
            <div class="counter right">
              Auctions: {{ bigdata.auctions.length }}
            </div>

            <table class="striped">
                <thead><tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Minimum bid value</th>
                  <th>Highest bid</th>
                  <th>Open</th>
                  <th>Start</th>
                  <th>End</th>
                </tr></thead>
                <tbody>
                      <tr v-for="auction in bigdata.auctions" :key="auction.id">
                        <td><b>
                          {{ auction.name }}
                        </b></td>

                        <td>
                            {{ auction.description }}
                        </td>

                        <td>
                            {{ auction.minimum_value }} €
                        </td>

                        <td v-if="auction.highest_bid == ''">
                          No bids
                        </td>
                        <td v-else>
                          {{ auction.highest_bid }} €
                        </td>

                        <td>
                            <i v-if="auction.is_open == true" class="material-icons icon-green">check</i>
                            <i v-else class="material-icons icon-red">clear</i>
                      </td>
                        
                        <td>
                          {{ auction.starting_date }} {{ auction.starting_time }}
                        </td>

                        <td>
                          {{ auction.closing_date }} {{ auction.closing_time }}
                        </td>
                      
                        <td>
                          <router-link router-link :to="{ name: 'update-auction', params: { auction_id: auction.external_id }}">
                              <button title="Edit auction" class="waves-effect waves-light btn-floating"><i class="material-icons left">edit</i>Edit</button>
                          </router-link>
                        </td>

                        <td>
                          <router-link router-link :to="{ name: 'auction-participants-dashboard', params: { auction_id: auction.external_id }}">
                              <button title="Edit members" class="waves-effect light-blue darken-1 btn-floating"><i class="material-icons left">person_add</i>Participants</button>
                          </router-link>
                        </td>
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
      name: 'auctions-dashboard',
      components: {
        
      },
      props:{
          
      },
      data(){
        return{
            bigdata: {
              error:"",
              auctions:[{name: "auction1", minimum_value: 1, description:'descrição auction', 
                  starting_date: '1/9/2022', closing_date: '2/9/2022',
                  starting_time: '14h', closing_time: '15h', highest_bid:'1', participants: [], external_id: ''
                },
              ],
            },
            current_user:{role:{name:'admin'}},
            auctions_management: '',
            description_auctions: '',
            username: '',
            role:''
        }
      },
      methods: {
        ...mapGetters(["getRole"]),
        ...mapGetters(["StateUsername"]),
        
      },
      mounted() {
        this.role = this.getRole()
        axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/auctions/get-name-auctions-dashboard_vue').then(response => this.auctions_management = response.data)
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/post-description-auctions-dashboard_vue', {descriptionn: 'Add or edit auctions', username: this.StateUsername()}).then(response => this.description_auctions = response.data)
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/get-current_user.role.name_vue', {username: this.StateUsername()}).then(response => this.current_user.role.name = response.data)
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/auctions/get-auctions_vue', {username: this.StateUsername()}).then(response => this.bigdata = response.data)
      }
    }

</script>