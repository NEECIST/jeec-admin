<template>
    <div class="navbar-component">
        <div class="nav-bar">
            <a href=""><img class="jeec-logo-mobile"
                :src="require('@/assets/' + logo)"></a>

            <form action="" method="get">
                <button @click="logout" class="waves-effect red lighten-2 btn-small right logout-btn"><i
                    class="material-icons left">lock</i>Log out</button>
            </form>

            <!-- <a target="_blank" rel="noopener noreferrer" href="https://jeec.ist" method="get">
                <button class="waves-effect waves-light btn-small right" style="margin-top: -3px; margin-right: 50px;"><i
                        class="large material-icons left">web</i>Visit website</button>
            </a> -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import router from "../router";
import { mapActions } from "vuex";

export default {
  name: 'navbar-component',
  components: {
    
  },
  props: {
    logo: String,
  },
  data(){
    return{
        user:{name:'',role:''},
    }
  },
  methods: {
    ...mapActions(["LogOut"]),
    logout(){
        this.LogOut()
        router.push('/admin')
    }
  }
}
</script>

<style>
    .nav-bar {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    color: white;
    z-index: 1000;
    background-color: #ffffff;
    }

    .jeec-logo-mobile {
    display: block;
    width: 50px;
    margin-left: 40px;
    float: left;
    }

    .logout-btn {
    float: right;
    margin-right: 40px;
    width: 130px;
    margin-top: -3px;
    }
</style>