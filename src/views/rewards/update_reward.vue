<template>
    <div class="update-reward" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <div class="section-header-component">
            <div class="section-header" style="margin-top:100px">
                <h2>Rewards Management</h2>
                <p>Update the {{name}} reward</p>
            </div>
        </div>

        <router-link router-link to="/rewards">
            <button class="waves-effect waves-light btn back-btn left"><i
                class="material-icons left">arrow_back</i>back</button>
        </router-link>

        <br>

        <div class="create-form">
            <div v-if="error != null">
                <blockquote class="create-error">
                    {{ error }}
                </blockquote>
            </div>

            <form class="col s12">
                <div class="row">
                    <div class="input-field col s5 left">
                        <input id="name" name="name" type="text" class="validate" v-model="name" required>               <!--shit missing in value-->

                        <label for="name" v-if="name == ''">
                            Name
                        </label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s8">
                        <textarea name="description" id="description" class="materialize-textarea" maxlength="300" v-model="description"></textarea>      <!--shit missing here-->
                    
                        <label for="description" v-if="description == ''">
                            Description
                        </label>
                    </div>
                </div>

                <div class="row s7">
                    <div class="input-field col s3">
                        <input id="link" name="link" type="url" class="validate" value="" required v-model="link">                          <!--shit missing in value-->
                    
                        <label for="link" v-if="link == ''">
                            Link
                        </label>
                    </div>

                    <div class="input-field col s1">
                        <input id="quantity" name="quantity" type="number" min="0" class="validate" value="" required v-model="quantity">       <!--shit missing in value-->
                    
                        <label for="quantity" v-if="quantity == ''">
                            Quantity
                        </label>
                    </div>
                </div>

                Image:
                <div v-if="this.create_url != 'erro'">
                    <img :src="this.url_image" class="company-logo centered-image">                                                <!--shit missing in src-->
                </div>
                <div v-else>
                    <blockquote class="create-error">
                        Image missing! Please, upload one!
                    </blockquote>
                </div>

                <div class="file-field input-field" style="width:500px;">
                    <div class="btn">
                        <i class="material-icons left">image</i>
                        <span v-if="this.create_url != 'erro'">change image</span><span v-else>add image</span>
                        <input type="file" name="image" @change="selectFile">
                    </div>
                    <div class="file-path-wrapper">
                        <input v-if="fileToUpload != ''" class="file-path validate" type="text" :placeholder="fileSelected">
                        <input v-else class="file-path validate" type="text" placeholder="use .png with < 200kB">
                    </div>
                </div>
            </form>
        </div>

        <form>
            <button class="waves-effect red darken-2 btn delete-btn left" @click="deleteReward"><i class="material-icons left">clear</i>Delete
            Reward</button>

            <button type="submit" class="waves-effect blue lighten-2 btn add-btn right" @click="updateReward"><i
                class="material-icons left">save</i>Save Reward</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapGetters } from "vuex";
    export default {
        name: 'update-reward',
        components: {

            },

        data(){
            return{
                error: '',
                name: '',
                description: '',
                link: '',
                quantity: '',
                image: null,
                fileUp: '',
                create_url: '',
                url_image: '',
                fileSelected: null,
                fileToUpload: '',
                role:''
            }
        },

        methods:{
            ...mapGetters(["getRole"]),
            selectFile(event){
                this.fileSelected = event.target.files[0].name;
                this.fileToUpload = event.target.files[0];
            },

            updateReward(){

                const new_reward = new FormData();

                new_reward.append('external_id', this.$route.params.external_id)
                new_reward.append('image', this.fileToUpload)
                new_reward.append('name', this.name)
                new_reward.append('description', this.description)
                new_reward.append('link', this.link)
                new_reward.append('quantity', this.quantity)

                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/reward/update", new_reward).then(response=>this.error = response.data);
                
                if (this.error == ''){
                    this.$router.push('/rewards')
                }
            },

            forceFileDownload(response) {
                if (this.create_url != 'erro') {
                    this.url_image = URL.createObjectURL(new Blob([response.data]))
                }
            },

            deleteReward() {
                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/reward/delete", {external_id: this.$route.params.external_id}).then(response=>this.error = response.data)

                if (this.error == ''){
                    this.$router.push('/rewards')
                }else{
                    this.$forceUpdate()
                }
            }
        },

        mounted(){
            this.role = this.getRole()
            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/reward/update/get', {external_id: this.$route.params.external_id}).then(response=>{
                const data = response.data;
                this.name = data.name;
                this.description = data.description;
                this.link = data.link;
                this.quantity = data.quantity;
            })

            axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/reward/update/create_url', {reward_external_id: this.$route.params.external_id}).then(response=> {const data = response.data; this.create_url = data.error})

            axios({
                url: '/reward/update/get/image',
                method: 'POST',
                responseType: 'arraybuffer',
                data: {reward_external_id: this.$route.params.external_id,}
            }).then(response=> {
                if (this.create_url != 'erro') {
                    this.url_image = URL.createObjectURL(new Blob([response.data]))
                }
            })
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

    .delete-btn {
    margin-left: 40px;
    margin-top: 20px;
    }

    .create-form {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50px;
    }

    .create-error {
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
    }

    .company-logo {
    max-height: 150px;
    max-width: 300px;
    margin-bottom: 40px;
    }

    .section-header {
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 30px;
    margin-top: 0px;
    }

    .section-header h2 {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 36px;
    text-transform: uppercase;
    text-align: center;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 10px;
    }

    .section-header p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-family: 'Karla';
    font-weight: 500;
    color: #9195a2;
    }

    .section-header::before {
    content: '';
    position: absolute;
    display: block;
    width: 100px;
    height: 2px;
    background: #4089ff;
    bottom: 0;
    left: calc(50% - 50px);
    }

    @media only screen and (max-width: 750px) {
    .section-header p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 0;
    margin-top: 30px;
    font-size: 18px;
    font-family: 'Karla';
    font-weight: 500;
    color: #9195a2;
    }
    }
</style>