<template>  
  
  <div v-if="role == 'webdev' || role == 'webdev_tl' || role == 'business' || role == 'coordination' || role == 'admin'">
    <TopBar/>

    <SectionHeader :name="responsedata.company.name" description="Edit Company information" back_page="/companies"/>


    
  <br>  

  
    <div class="create-form">
        
        <blockquote v-if="responsedata.error!=''" class="create-error">
          {{ error }}
        </blockquote>
      

      <form class="col s12" @submit="updateCompany">
        <div v-if="this.url_image != null">
            <img class="centered-image speaker-img" :src="this.url_image" >
          </div>

         <div v-else>
             <blockquote style="text-align: left;" class="create-error">
                 Company image missing! Please, upload one
             </blockquote> 
         </div>
                
          
          <br>

          <div class="row">
            
            <div class="input-field col s4">
              Name
              <input class="col s12 validate" v-model="responsedata.company.name" type="text">
            </div>

            <div class="col">
              CV's Access:
              <p>
                <label style="margin-right: 20px;">
                  <input class="with-gap" v-model="responsedata.company.cvs_access" type="radio" value="True" />
                  <span>Yes</span>
                </label>
                <label>
                  <input class="with-gap" v-model="responsedata.company.cvs_access" type="radio" value="False"  />
                  <span>No</span>
                </label>
              </p>
            </div>
          </div>


          <div class="row">
            <div class="input-field col s4 validate">
              Website
              <input v-model="responsedata.company.link" type="url" >
            </div>
  
          
            <div class="input-field col s3 validate">
              Email
              <input v-model="responsedata.company.email" type="email">
            </div>
          </div>


          <div class="row">
            <div class="input-field col s6">
              Business area
              <input v-model="responsedata.company.business_area" type="text">
            </div>
          </div>

                        

          <p>
            Partnership tier
            <select v-model="responsedata.company.partnership_tier" class="browser-default" style="margin-left: 100px;width: 200px;display: inline-block;">
              <option value="">Partnership</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
              <option value="main_sponsor" >Main Sponsor</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </p>

          <br>

          <div style="margin-right: 80vw;">  
            Show company in JEEC website:
            <p>
                <label style="margin-right: 20px;">
                    <input class="with-gap" v-model="responsedata.company.show_in_website" type="radio" value="True"/>
                <span>Yes</span>
                </label>
                <label>
                <input class="with-gap" v-model="responsedata.company.show_in_website" type="radio" value="False" />
                <span>No</span>
                </label>
            </p>

            <br>
          </div>


          <div class="file-field input-field" style="width:500px;">
            <div class="btn">
              <i class="material-icons left">add_a_photo</i>
              <div v-if="this.url_image != null">
                <span> change image </span>
              </div>
              <div v-else>
                <span> add image </span>
              </div>

              <input type="file" name="file" @change="onFileSelected">
            </div>
            <div class="file-path-wrapper">
              <div v-if="url_image != null">
                <input class="file-path validate" type="text" :placeholder="url_image">
              </div>
              <div v-else-if="fileSelected != null">
                <input class="file-path validate" type="text" :placeholder="fileSelected">
              </div>
              <div v-else>
                <input class="file-path validate" type="text" placeholder="use a .png, .jpg, .jpeg or .svg with < 200kB">
              </div>
            </div>
          </div>


          <button type="submit" class="waves-effect blue lighten-2 btn add-btn right"><i class="material-icons left">save</i>Save Company</button>
      </form>
    
    </div>
    


    <form @submit="deleteCompany">
      <button type="submit" class="waves-effect red darken-2 btn delete-btn"><i class="material-icons left">clear</i>Delete Company</button>
    </form>
  

  </div>
  

</template>  


<script>
import axios from 'axios';
import SectionHeader from '../../components/SectionHeader.vue';
import TopBar from '../../components/TopBar.vue';
import { mapGetters } from "vuex";
export default {
  name: 'edit-company',
  components: {
    TopBar,
    SectionHeader
},
data(){
  return{
      SectionHeader:require("../../components/SectionHeader.vue"),
      TopBar: require( "../../components/TopBar.vue"),
      responsedata:{
        error:'',
        company:{}
      },
      url_image:null,
      fileSelected:null,
      fileToUpload:null,
      role:''
  };
},
async mounted(){
  await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/company/info',{external_id: this.$route.params.company_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=> this.responsedata = response.data)
  if(this.responsedata.company.image){
    axios({
          url: process.env.VUE_APP_JEEC_BRAIN_URL+'/getimagecompany',
          method: 'POST',
          auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY,
          },
          responseType: 'arraybuffer',
          data: {
            external_id: this.$route.params.company_external_id,
          }
        }).then(response=>{
          if(response.data!=''){
            this.forceFileDownload(response)
          }
        })
  }
  this.role = this.getRole()
},
methods:{
  ...mapGetters(["getRole"]),
  onFileSelected(event){
    this.fileSelected = event.target.files[0].name;
    this.fileToUpload = event.target.files[0];
    this.url_image = URL.createObjectURL(new Blob([event.target.files[0]]))
    },
    deleteCompany(e){
      e.preventDefault()
      if(confirm('Are you sure you want to delete this company?')){
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/company/delete',{external_id: this.$route.params.company_external_id},{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response=>{
          if(response.data==''){
            this.$router.push("/companies")
          }
          else{
            this.responsedata.error = response.data
          }
        })
      }
    },
    updateCompany(e){
      e.preventDefault()
          const new_company = new FormData();

          console.log(this.fileToUpload)
          new_company.append('image', this.fileToUpload)
          
          new_company.append('name', this.responsedata.company.name)
          new_company.append('link', this.responsedata.company.link)
          new_company.append('business_area', this.responsedata.company.business_area)
          new_company.append('email', this.responsedata.company.email)
          new_company.append('show_in_website', this.responsedata.company.show_in_website)
          new_company.append('partnership_tier', this.responsedata.company.partnership_tier)
          new_company.append('cvs_access', this.responsedata.company.cvs_access)
          new_company.append('external_id', this.$route.params.company_external_id)

          axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+'/company/update',new_company,{auth: {
          username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
          password: process.env.VUE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            this.error = response.data
            if(this.error==""){
                this.$router.push("/companies")
            }
        })
    },
    forceFileDownload(response) {
      this.url_image = URL.createObjectURL(new Blob([response.data]))
    },
}
}

</script>