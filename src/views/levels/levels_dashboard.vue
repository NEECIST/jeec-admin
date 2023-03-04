<template>
    <div class="levels-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Levels Management" description="Define the students progess" back_page="/students-app/"/>

        <section-title-component section="List of Levels"/>

        <div class="list">
            <div v-if="responsedata.error != null">
                <blockquote class="create-error left">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else-if="error != ''">
                <blockquote class="create-error left">
                    {{ error }}
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                Levels: {{ responsedata.levels.length }}
                </div>
            
                <blockquote class="create-error left">
                <b>Caution!</b> Deleting levels could directly affect the students progress!
                </blockquote>

                <table class="striped">
                    <thead>
                        <tr>
                        <th>Level</th>
                        <th>Starting Points</th>
                        <th>Ending Points</th>
                        <th>Points</th>
                        <th>Reward</th>
                        </tr>
                    </thead>
                    <tbody>                
                        <tr v-for="level in responsedata.levels" v-bind:key="level.value">
                            <td width="10%">
                                <b>
                                {{ level.value }}
                                </b>
                            </td>

                            <td>
                                {{ level.starting_points }} 
                            </td>

                            <td>
                                {{ level.ending_points }}
                            </td>

                            <td>
                                {{ level.points }}
                            </td>

                            <td width="20%">
                                <form>
                                    <select name="reward" class="form-control" v-model="level.reward.external_id" @change="changeReward(level)">
                                        <option disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" v-bind:key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>

                            <td>
                                <form v-if="(responsedata.levels[responsedata.levels.length - 1].value == level.value)">                                                                    <!--retirei cenas do onsubmit-->
                                    <button title="Delete level" class="waves-effect waves-light red btn-floating" @click="deleteLevel(level.value)"><i
                                        class="material-icons left">delete</i>Delete</button>
                                </form>
                            </td>
                        </tr>                
                        
                        <tr>
                            <td>
                                <div v-if="responsedata.levels.length > 0">
                                    <input type="number" :value="responsedata.levels[responsedata.levels.length - 1].value" disabled>
                                    <input name="value" type="number" value="" hidden>
                                </div>
                                <div v-else>
                                    <input type="number" value="1" disabled>
                                    <input name="value" type="number" value="1" hidden>
                                </div>
                            </td>

                            <td>
                                <div v-if="responsedata.levels.length > 0">
                                    <input id="starting_points" type="number" :value="responsedata.levels[responsedata.levels.length - 1].ending_points" disabled>                    <!--retirei cenas do value-->
                                </div>
                                <div v-else>
                                    <input id="starting_points" type="number" value="0" disabled>
                                </div>
                            </td>

                            <td>
                                <div v-if="responsedata.levels.length > 0">
                                    <input id="ending_points" type="number" :value="responsedata.levels[responsedata.levels.length - 1].ending_points + level_points" disabled>
                                    <input name="points" id="_ending_points" type="number" min="" value="" hidden>
                                </div>
                                <div v-else>
                                    <input id="ending_points" type="number" min="1" value="1" disabled>
                                    <input name="points" id="_ending_points" type="number" min="1" value="1" hidden>
                                </div>
                            </td>

                            <td>
                                    <input v-model.number="level_points" id="points" type="number" min="1">
                            </td>
                            
                            <td>
                                <form>
                                    <select name="reward" form="create-level" class="form-control" v-model="Reward" required>
                                        <option selected disabled value="">Select one reward</option>
                                        <option v-for="reward in responsedata.rewards" v-bind:key="reward.id" :value="reward.id">{{ reward.name }}</option>
                                    </select>
                                </form>
                            </td>

                                <td>
                                    <button type="submit" title="Add level" class="waves-effect waves-light btn-floating" @click="createLevel(Reward, responsedata.levels.length + 1, level_points)"><i
                                        class="material-icons left">add</i>Add</button>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>            
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex";
    export default {
        name: 'levels-dashboard',
        components: {

            },

        data(){
            return{
                error: '',
                level_points: 1,
                responsedata: {error: null, levels: [], rewards: []},
                Reward: '',
                role:''
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/levelss",
            {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
                this.responsedata = response.data;
                let points = 0;
                for(var i = 0; i < this.responsedata.levels.length; i++){
                    this.responsedata.levels[i].starting_points = points;
                    this.responsedata.levels[i].points = this.responsedata.levels[i].ending_points - this.responsedata.levels[i].starting_points;
                    points += this.responsedata.levels[i].points;
                }});
        },

        methods:{
            ...mapGetters(["getRole"]),
            deleteLevel(value){
                if(!confirm('Are you sure that you want to delete this level?')){
                    return
                }
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/level/delete",{level_value: value}, {auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
            },

            createLevel(reward_id, level_value, level_points){
                if(this.Reward == ''){
                    return
                }
                if(this.responsedata.levels.length>=1){
                    level_points+=this.responsedata.levels[this.responsedata.levels.length - 1].ending_points
                }
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/level/create",{reward_id: reward_id, level_value: level_value, level_points: level_points},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }} ).then(response=>this.error = response.data);
                this.$router.go();
            },

            changeReward(level){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/level/update", {level_external_id: level.external_id, change_reward_id: level.reward.external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.error = response.data);
            }
        }
    }
</script>

<style>
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

    .back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
    }
</style>