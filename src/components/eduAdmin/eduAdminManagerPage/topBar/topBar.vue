<template>
  <div class="topBarDiv am-btn-group">
    <a :href="testManageUrl">
      <button id="test" class="topBarButton am-btn am-btn-success btn-active">{{ testManage }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        testManage: '考务管理',
        testManageUrl: 'index.html#'+'eduAdmin/test/eduAdminManager'
      }
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #test {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
