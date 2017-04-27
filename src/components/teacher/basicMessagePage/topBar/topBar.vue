<template>
  <div id="topBarDiv">
    <!--<button id="mesNotButton" class="topBarButton" @click="mesNotClick">{{ mesNotButton}}</button>-->
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        mesNotButton: '个人信息',
        mesNotUrl: 'http://localhost:8080/',
      }
    },
    methods: {
      mesNotClick: function () {
        if(window.location.href == this.mesNotUrl) {
          var mesNotButton = document.getElementById('mesNotButton');
          mesNotButton.style.backgroundColor = "#00a539";
        }
      }}
  }
</script>

<style lang="css">
  html{
    font-size: 16px;
  }

</style>
