<template>
    <div class="section-title-component">
        <div class="section-title center-align" style="margin-top:30px;">
            {{section}}
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
      name: 'section-title-component',
      components: {
        
      },
      props: {
        section: String,
      }
    }
</script>

<style>
    .section-title {
    font-size: 25px;
    font-family: 'Karla';
    font-weight: 600;
    }
</style>