<template>
    <div class="students-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Students Management" description="Ban and manage students" back_page="/students-app/"/>

        <router-link router-link to="/students/banned">
        
            <button class="waves-effect waves-light btn back-btn red right" style="margin-right: 30px;"><i
                class="material-icons right">arrow_forward</i>Banned Students</button>
   
        </router-link>
        <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
            <button @click="BanAllStudents()" class="waves-effect waves-light btn back-btn red right" style="margin-right: 30px;"><i
            class="material-icons right">arrow_forward</i>Ban All Students</button>
        </div>
       
       
        <section-title-component section="List of Students"/>

        <div class="search-bar">
            <form class="col s12" method="get">
                <div class="row">
                    <div class="input-field col s8">
                        <input v-model="search" class="col s12 validate" id="search" name="search" type="text" required>

                        <label for="search" v-if="search == ''">
                            Search name
                        </label>
                    </div>
                    <span>
                        <button v-if="search != ''" class="search-btn red btn-floating left" style="margin-top: 20px;" @click="eraseSearch"><i class="material-icons">clear</i></button>
                    </span>
                </div>
            </form>
        </div>

        <div class="list">
            <div v-if="responsedata.error != null">
                <blockquote class="create-error">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else-if="filteredStudents.length == 0" class="create-error">
                <blockquote class="create-error">
                    <p>No results found!</p>
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                Students: {{ filteredStudents.length }}
                </div>

                <table class="striped">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>IST Id</th>
                        <th>Email</th>
                        <th>Linkedin</th>
                        <th>Level</th>
                        <th>Daily Points</th>
                        <th>Total Points</th>
                        <th>Uploaded CV</th>
                        <th>Squad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in filteredStudents" v-bind:key="student.id">
                            <td>
                                {{ student.id }}
                            </td>

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
                                <div v-if="student.linkedin">
                                    <a href="" target="_blank">{{ student.linkedin }}</a>
                                </div>
                                <div v-else>
                                    <i class="material-icons icon-red">clear</i>
                                </div>
                            </td>

                            <td>
                                {{ student.level }}
                            </td>

                            <td>
                                {{ student.daily_points }}
                            </td>

                            <td>
                                {{ student.total_points }}
                            </td>

                            <td>
                                <div v-if="student.cv == true">
                                    <i class="material-icons icon-green">check</i>
                                </div>
                                <div v-else>
                                    <i class="material-icons icon-red">clear</i>
                                </div>
                            </td>

                            <td>
                                <div v-if="student.squad">
                                    {{ student.squad }}
                                </div>
                            </td>

                            <div>
                                <td>
                                    <form onsubmit="return confirm('Are you sure you want to ban this student?');" style="margin: 0;">
                                        <button title="Ban student" class="waves-effect waves-light btn-floating left" @click="banstudent(student.id)"><i class="material-icons red left">person_remove</i>Ban</button>
                                    </form>
                                </td>
                                <!-- <td>
                                    <button title="Add Points" data-target="modal1" data-name=""
                                    class="waves-effect waves-light green btn-floating modal-trigger points-btn left"><i
                                        class="material-icons left">qr_code</i>Add Points</button>
                                </td> -->
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- <div id="modal1" class="modal" style="height: auto;"> 
            <div class="modal-content">
                <div class="row">
                    <div class="input-field col s2">
                        <input class="col s12 validate" id="points" name="points" type="number" required>
                        <label for="points">Points</label>
                    </div>
                    <div class="input-field col s2">
                        <input class="col s12 validate" id="activity_id" name="activity_id" type="number">
                        <label for="activity_id">Activity ID</label>
                    </div>
                </div>

                <p id="points-msg"></p>

                <div class="row">
                    <button id="points-submit" type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i
                        class="material-icons left">save</i>Add Points</button>
                </div>
            </div>
        </div>  -->

    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex";
    export default {
        name: 'students-dashboard',
        components: {
                
            },

        data(){
            return{
                search:'',
                role:'',

                responsedata: {error: '', students: []}
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/studentss",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
        },

        computed: {
            filteredStudents() {
                return this.responsedata.students.filter((student) => {
                    return student.name.toLowerCase().includes(this.search.toLowerCase())
                });
            }
        },

        methods: {
            ...mapGetters(["getRole"]),
            eraseSearch(){
                this.search = '';
            },

            banstudent(student_id){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/studentban",{banstudent: student_id},{auth: {
                username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
                password: process.env.VUE_APP_JEEC_WEBSITE_KEY
                }}).then(response=>this.responsedata = response.data);
            },
            BanAllStudents(){
         
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL+"/order66",{auth: {
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

    .add-btn {
    margin-right: 40px;
    margin-top: 10px;
    margin-bottom: 20px;
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

    .list {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    padding-bottom: 150px;
    }

    .search-bar {
    margin-left: 35vw;
    margin-right: 20vw;
    }

    .search-btn {
    margin-top: 20px;
    }

    .clear-search {
        color: rgb(119, 119, 119);
    }

    .clear-search:hover {
        color: rgb(172, 172, 172);
    }
</style>