<template>
    <div class="activity-types-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin' || role == 'partnerships'">
      <head-component/>
      
      <body>
        <navbar-component logo="brain.png"/>

        <section-header-component name="Activity Types Management" :description="'Manage activity types of ' + bigdata.event.name" back_page="/activities"/>

        <div class="left" style="margin-left: 30px;">
          <div class="sub_section-title">Events</div>
          <form class="col s12" id="event_form" method="get">
            <select v-model="selected_event_id" @change="EventSetter(selected_event_id)" name="event" id="event" class="form-control" style="width: 200px; display: block;" required>
              <option value="" disabled></option>
              <option v-for="_event in bigdata.events" :key="_event.id" :value="_event.external_id">{{ _event.name }}</option>
            </select>
          </form>
        </div>

        <form id="add_type_form" method="get">
          <input hidden name="_event" type="text" :value="bigdata.event.external_id">
          <router-link router-link :to="{ name: 'add-activity-type' }">
            <button class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">add</i>Activity
            Type to {{ bigdata.event.name }}</button>
          </router-link>
        </form>

        <div class="list">
          <blockquote v-if="bigdata.error != ''" class="create-error">
            {{ bigdata.error }}
          </blockquote>

          <table v-else class="striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price (€)</th>
                <th>Show in Website Homepage</th>
                <th>Show in Website Schedule</th>
                <th>Show in Student App</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="activity_type in bigdata.event.activity_types" :key="activity_type.id">
                <td><b>{{ activity_type.name }}</b></td>

                <td>
                  {{ activity_type.description }}
                </td>

                <td v-if="activity_type.price != ''">
                  {{ activity_type.price }}
                </td>

                <td>
                  <i v-if="activity_type.show_in_home == true" class="material-icons icon-green">check</i>
                  <i v-else class="material-icons icon-red">clear</i>
                </td>

                <td>
                  <i v-if="activity_type.show_in_schedule == true" class="material-icons icon-green">check</i>
                  <i v-else class="material-icons icon-red">clear</i>
                </td>

                <td>
                  <i v-if="activity_type.show_in_app == true" class="material-icons icon-green">check</i>
                  <i v-else class="material-icons icon-red">clear</i>
                </td>

                <td>
                  <form method="get">
                    <router-link router-link :to="{ name: 'update-activity-type', params: {activity_type_id: activity_type.external_id}}">
                      <button title="Edit activity type" class="waves-effect waves-light btn-floating"><i
                        class="material-icons left">edit</i>Edit</button>
                    </router-link>
                  </form>
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
    import { mapGetters, mapMutations } from "vuex";
    export default {
      name: 'activity-types-dashboard',
      components: {
        
      },
      props:{
          
      },
      methods:{
        ...mapGetters(["StateUsername"]),
        ...mapGetters(["Event_id"]),
        ...mapGetters(["getRole"]),
        ...mapMutations(["setEvent_id"]),
        EventSetter(external_id){
            this.setEvent_id(external_id)
        },
      },
      data(){
        return{
            bigdata: {
              error: '',
              event: {},
              events:[{name:"JEEC23", activity_types:[{name:'tipo1', description:'description1', price:1.1, 
              show_in_home: true, show_in_schedule: true, show_in_app: true, external_id: ''}]}],
            },
            selected_event_id: this.Event_id(),
            role:''
        }
      },
      mounted() {
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/activities/types-get_vue',{event_id: this.Event_id(), username: this.StateUsername()},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.bigdata = response.data)
        this.role = this.getRole()
      }
    }

</script>