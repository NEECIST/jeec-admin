<template>
  <div class="top-bar">
    <div class="nav-bar">
    <img class="brain-logo" :src="brain">

    <div class="company-dash-username right" style="color:black; margin-top:10px">{{username}}</div>

    <!-- <form action="{{ url_for('companies_api.company_logout') }}" method="get"> -->
    <router-link router-link to="/">
      <form method="get">
      <button class="waves-effect red lighten-2 btn-small right logout-btn" ><i class="material-icons left">lock</i>Log
        out</button>
    </form>
    </router-link>

    <a target="_blank" rel="noopener noreferrer" href="https://jeec.ist" method="get">
      <button class="waves-effect waves-light btn-small right" style="margin-top:10px; margin-right: 50px;"><i
          class="large material-icons left">web</i>Visit website</button>
    </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    username: String
  },
  data(){
    return{
      brain:require("../assets/brain.png"),
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

.logout-btn {
    float: right;
    margin-right: 40px;
    width: 130px;
    margin-top: 10px;
}

.company-dash-username {
    margin-top: 16px;
    font-size: 17px;
    margin-right: 40px;
}

.brain-logo {
    display: block;
    width: 50px;
    margin-left: 40px;
    float: left;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
