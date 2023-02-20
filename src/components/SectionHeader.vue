<template>
    <div class="section-header-component">
        <div class="section-header" style="margin-top:100px">
            <h2>{{name}}</h2>
            <p id="description">{{description}}</p>
        </div>
         <router-link v-if="back_page!=''" router-link :to="back_page">
                <button class="waves-light btn back-btn left" style="margin-left:-45vw; margin-top:-10vh"><i
                class="material-icons left">arrow_back</i>back</button>
           
        </router-link>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'section-header-component',
  components: {
    
  },
  props:{
      name:String,
      description:String,
      back_page:String,
  }
}
</script>

<style>
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

#description {
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

.back-btn {
    margin-left: 40px;
    margin-top: 10px;
    position: absolute;
}

</style>