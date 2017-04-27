<template>
  <div id="eduResearchGroupManagement_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success btn-active">教研组管理</button>
  </div>
</template>

<script>
  export default {
    name: 'eduResearchGroupManagement_topBar',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      backClick: function(){
        history.go(-1);
      }
    }
  }
</script>

<style scoped>
  html{

  }
  #topBarButton{
    margin-left: 5rem;
  }

  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

