<template>
    <div class="add-reward" v-if="role == 'webdev' || role == 'webdev_tl' || role == 'coordination' || role == 'admin'">
        <head-component/>

        <navbar-component logo="brain.png"/>

        <section-header-component name="Rewards Management" description="Add a new reward" back_page="/rewards"/>

        <br>
        
        <div class="create-form">
            <div v-if="error != ''">
                <blockquote class="create-error">
                    {{ error }}
                </blockquote>
            </div>
            
            <form class="col s12" enctype="multipart/form-data">
                <div class="row">
                    <div class="input-field col s5">
                        <input v-model="name" id="name" name="name" type="text" class="validate" required>

                        <label for="name" v-if="name == ''">
                            Name
                        </label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s8">
                        <textarea v-model="description" name="description" id="description" class="materialize-textarea" maxlength="300"></textarea>

                        <label for="description" v-if="description == ''">
                            Description
                        </label>
                    </div>
                </div>

                <div width="40%" class="row s7">
                    <div class="input-field col s3">
                        <input v-model="link" id="link" name="link" type="url" class="validate" required>

                        <label for="link" v-if="link == ''">
                            Link
                        </label>
                    </div>

                    <div width="40%" class="input-field col s1">
                        <input v-model="quantity" id="quantity" name="quantity" type="number" min="0" class="validate" required>

                        <label for="quantity" v-if="quantity == ''">
                            Quantity
                        </label>
                    </div>
                </div>

                <div class="file-field input-field" style="width:500px;">
                    <div class="btn">
                        <i class="material-icons left">image</i>
                        <span>Reward Image</span>
                        <input type="file" name="image" @change="selectFile">
                    </div>
                    <div class="file-path-wrapper">
                        <input v-if="fileToUpload != null" class="file-path validate" type="text" :placeholder="fileSelected">
                        <input v-else class="file-path validate" type="text" placeholder="use .png with < 200kB">
                    </div>
                </div>

                <button type="submit" class="waves-effect blue lighten-2 btn add-btn right" @click="newreward">
                    <i class="material-icons left">save</i>Save Reward</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex";
    export default {
        name: 'add-reward',
        components: {

            },

        data(){
            return{
                error: "",
                name: '',
                description: '',
                link: '',
                quantity: '',
                fileSelected: null,
                fileToUpload: null,
                role:''
            }
        },

        methods: {
            ...mapGetters(["getRole"]),
            selectFile(event){
                this.fileSelected = event.target.files[0].name;
                this.fileToUpload = event.target.files[0];
            },

            newreward(event){

                console.log(event)

                const new_reward = new FormData();

                new_reward.append('image', this.fileToUpload)
                new_reward.append('name', this.name)
                new_reward.append('description', this.description)
                new_reward.append('link', this.link)
                new_reward.append('quantity', this.quantity)

                axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/new-rewardd", new_reward).then(response=>this.error = response.data);
                
                if (this.error == ""){
                    this.$router.push('/rewards')
                }
            },
        },
        mounted(){
            this.role = this.getRole()
        }
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
</style>