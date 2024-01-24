<template>
    <div class="tags-dashboard" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">

        <head-component/>

        <!-- <navbar-component logo="brain.png"/> -->
        <TopBar :username="this.StateUsername()"/>

        <section-header-component name="Tags Management" description="Create tags for activities" back_page="/students-app/"/>

        <section-title-component section="List of Tags"/>

        <div class="list">
            <div  v-if="responsedata.error != null">
                <blockquote class="create-error">
                    {{ responsedata.error }}
                </blockquote>
            </div>
            <div v-else>
                <div class="counter right">
                    Tags: {{ responsedata.tags.length }}
                </div>
                <br><br><br>
                <form action="" method="post">
                    <div class="row">
                        <div class="input-field col s3" style="margin: 0;">
                            <input v-model="name" id="name" name="name" type="text" class="validate" required>

                            <label for="name" v-if="name == ''">
                                Add tag
                            </label>
                        </div>
                        <div class="col s1">
                            <button title="Add tag" class="waves-effect waves-light btn-floating" @click="newtag"><i
                                class="material-icons left">add</i>Add</button>
                        </div>
                    </div>
                </form>

                <div style="display: flex; flex-wrap: wrap; margin-bottom: 40px;">
                    <div v-for="tag in responsedata.tags" :key="tag" class="tag-wrapper">
                        <p class="tag">{{ tag }}</p>
                        <button title="Delete tag" class="waves-effect waves-light red btn-floating" @click="deletetag(tag)">
                        <i class="material-icons left">delete</i>Delete</button>
                    </div>
                </div>
            </div>
        </div>
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
                responsedata: {error: '', tags: []} ,
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + "/tagss",{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
        },

        methods:{
            ...mapGetters(["getRole"]),
            ...mapGetters(["StateUsername"]),
            newtag(event){
                event.preventDefault();
                if(this.name == ''){
                    return
                }
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/new-tagg",{tagname: this.name},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
                this.name = '';
            },

            deletetag(tag){
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/tagsdelete",{tagname: tag},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>this.responsedata = response.data);
            }
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