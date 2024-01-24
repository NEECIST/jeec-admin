<template>
    <div class="cvs-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="CVs Approval Management" description="Manage students' CVs" back_page="/students-app/"/>
       
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
                        <th>Uploaded CV</th>
                        <th>Approved CV</th>
                        <th>Download</th>
                        <th>Reject</th>
                        <th>Approve</th>

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
                                <div v-if="student.cv == true">
                                    <i class="material-icons icon-green">check</i>
                                </div>
                                <div v-else>
                                    <i class="material-icons icon-red">clear</i>
                                </div>
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
                                <button class="waves-effect blue lighten-2 btn dashboard-btn">Download</button>
                            </td>

                            <td>
                                <button class="waves-effect red lighten-2 btn dashboard-btn">Reject</button>
                            </td>

                            <td>
                                <div v-if="student.cv == true">
                                    <button class="waves-effect green lighten-2 btn dashboard-btn">Approve</button>
                                </div>
                                <div v-else>
                                    <button class="waves-effect grey lighten-2 btn dashboard-btn">Approve</button>
                                </div>
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
        name: 'cvs-dashboard',
        components: {
                
            },

        data(){
            return{
                search:'',
                role:'',
                remove_points:1,
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
