<template>
    <div class="banned-students-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Banned Students Management" description="Unban students" back_page="/students"/>

        <section-title-component section="List of Banned Students"/>

        <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
            <button @click="UnbanAllStudents()" class="waves-effect waves-light btn back-btn green right" style="margin-right: 30px;"><i
            class="material-icons right">arrow_forward</i>Unban All Students</button>
        </div>
        
        <div class="list">
            <div v-if="responsedata.error">
                <blockquote class="create-error left">
                {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                Students: {{ responsedata.students.length }}
                </div>

                <table class="striped">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>IST Id</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in responsedata.students" :key="student.ist_id">
                            <td>
                                <b>
                                {{ student.name }}
                                </b>
                            </td>

                            <td>
                                {{ student.ist_id }}
                            </td>

                            <td>
                                {{ student.email }}
                            </td>

                            <td>
                                <form onsubmit="return confirm('Are you sure you want to unban this student?');">
                                    <button title="Unban student" class="waves-effect waves-light btn-floating right" @click="unban(student.external_id)">
                                        <i class="material-icons red left">person_remove</i>Ban</button>
                                </form>
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
        name: 'banned-students-dashboard',
        components: {
            TopBar
            },

        data(){
            return{
                error:null,

                responsedata: {error: null, students: []},
                role:''
                
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/banned-studentss",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
        },

        methods: {
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            unban(external_id){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/unban", {unbanstudent: external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
            },
            UnbanAllStudents(){
         
         axios.get(process.env.VUE_APP_JEEC_BRAIN_URL+"/skywalker",{auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response=>this.responsedata2 = response.data);

                this.$router.go()
            },
        },
        
    }
</script>

<style>
    .back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
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