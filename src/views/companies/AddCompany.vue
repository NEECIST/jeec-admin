<template>

 
 
    <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
        <TopBar :username="this.StateUsername()"/>

        <SectionHeader name = "Companies Management" description="Add a new company" back_page="/companies"/>

    <br>
    <br>
    <div class="left" style="margin-left: 0px;">
      <div class="sub_section-title">Event</div>
      <form class="col s12" id="event_form">
        <select v-model="event_chooser" class="form-control" style="height:50px; width: 200px; display: block;" required >
          <option v-for="event in this.events" :key="event.id" :value="event.id">{{ event.name }}</option>
        </select>
      </form>
    </div>

    <div class="create-form" style="margin-left:5vw;">
        <div v-if="error != ''">
            <blockquote class="create-error">
                {{ error }}
            </blockquote>
        </div>

        <form class="col s12" method="post"
        enctype="multipart/form-data">
        <div class="row">
            <div class="input-field col s4">
                <input class="col s12 validate" id="name" name="name" type="text" required v-model="name" maxlength="100" placeholder="Name">

            </div>

            <div class="col">
            CV's Access:
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" name="cvs_access" type="radio" value="True" v-model="cvs_access"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" name="cvs_access" type="radio" value="False" checked v-model="cvs_access"/>
                <span>No</span>
                </label>
            </p>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s4">
            <input id="link" name="link" type="url" class="validate" v-model="link" placeholder="Website link">
            
            </div>


            <div class="input-field col s3">
            <input id="email" name="email" type="email" class="validate" v-model="email" placeholder="Contact email">
            
            <span class="helper-text" data-error="wrong format" data-success="right"></span>
            </div>
        </div>



        <div class="row">
            <div class="input-field col s6">
                <input id="business_area" name="business_area" type="text" class="validate" v-model="business_area" maxlength="100" placeholder="Business area">               
            </div>
        </div>



        <p>
            <select name="partnership_tier" class="browser-default"
            style="margin-right: 100vw; width: 200px;display: inline-block;" v-model="partnership_tier">
            <option value="" disabled selected>Tier</option>
            <option value="partner_gold">Gold Partner</option>
            <option value="partner_silver">Silver Partner</option>
            <option value="partner_bronze">Bronze Partner</option>
            <option value="sponsor_platinum">Platinum Sponsor</option>
            <option value="sponsor_gold">Gold Sponsor</option>
            <option value="sponsor_silver">Silver Sponsor</option>
            <option value="sponsor_bronze">Bronze Sponsor</option>
            <option value="nucleo">Núcleo</option>
            </select>
        </p>



        <br>

        <div style="margin-left: -78vw;">
            Show company in JEEC website:
            <p>
                <label style="margin-right: 20px;">
                <input class="with-gap" name="show_in_website" type="radio" value="True" checked v-model="show_in_website"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" name="show_in_website" type="radio" value="False" v-model="show_in_website"/>
                <span>No</span>
                </label>
            </p>
        </div>

        <br>

        <div class="file-field input-field" style="width:500px;">
                    <div class="btn">
                        <i class="material-icons left">image</i>
                        <span>Company Image</span>
                        <input type="file" name="image" @change="selectFile">
                    </div>
                    <div class="file-path-wrapper">
                        <input v-if="fileToUpload != null" class="file-path validate" type="text" :placeholder="fileSelected">
                        <input v-else class="file-path validate" type="text" placeholder="use a .png, .jpg, .jpeg or .svg with < 200kB">
                    </div>
                </div>



        <div style="margin-top: -5vw; margin-left: 70vw;">
            <button type="submit" v-on:click="create_company" class=" blue lighten-2 btn">
                    <i
                class="material-icons left">save</i>Save Company

            </button>

        </div>

        
        </form>


    </div>


</div>


</template>


<script>
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import axios from 'axios';
import { mapGetters } from "vuex";
export default {
  name: 'add-company',
  components: {
    TopBar,
    SectionHeader
},
data(){
    return{

        SectionHeader:require("../../components/SectionHeader.vue"),
        TopBar: require( "../../components/TopBar.vue"),
        
        error: '',
        name: '',
        cvs_access: null,
        link: '',
        email: '',
        business_area: '',
        partnership_tier: '',
        show_in_website: null,
        fileToUpload: null,
        fileSelected:'',
        role:'',
        event_chooser:'',
        events:'',
        
    }
},
methods: {
    ...mapGetters(["getRole"]),
    ...mapGetters(["StateUsername"]),
        selectFile(event){
            this.fileSelected = event.target.files[0].name;
            this.fileToUpload = event.target.files[0];
        },
      detectext(stringvar){
        return stringvar!=''; 
      },
      onFileSelected(event){
       this.fileSelected = event.target.files[0].name;
      },
      onFileSelected2(event){
          this.fileSelected2 = event.target.files[0].name;
      },
      create_company(e) {
          e.preventDefault()
          const new_company = new FormData();

          new_company.append('image', this.fileToUpload)
          new_company.append('name', this.name)
          new_company.append('link', this.link)
          new_company.append('business_area', this.business_area)
          new_company.append('email', this.email)
          new_company.append('show_in_website', this.show_in_website)
          new_company.append('partnership_tier', this.partnership_tier)
        new_company.append('cvs_access', this.cvs_access)
       new_company.append('event', this.event_chooser)

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/new-company-vue',new_company,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            this.error = response.data
            if(this.error==""){
                this.$router.push("/companies")
            }
        })
      }

    },
    mounted(){
    axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + '/all_events',{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => this.events = response.data.events),
        this.role = this.getRole()
    }
}

</script>

