<template>
  <div id="certificateManege">
    <topTitle></topTitle>
    <topBar></topBar>
    <tableDiv></tableDiv>

  </div>
</template>

<script>
  import topTitle from '../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/teacher/experiencePage/topBar/topBar3.vue'
  import tableDiv from '../../../components/teacher/certificateManegePage/table/table.vue'
  export default {
    name: 'certificateManege',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      tableDiv
      /*   selDiv*/
    }
  }

</script>

<style lang="css">
  html{
    font-size: 16px;
  }
  body{
    text-align: center;
    background-color: ghostwhite;
    font-family: 微软雅黑;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
