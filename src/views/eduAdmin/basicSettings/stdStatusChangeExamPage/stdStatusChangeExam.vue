<template>
  <div id="studentStatusChangeExamination">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--页面主组件-->
    <studentStatusChangeExaminationDiv></studentStatusChangeExaminationDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/basicSettings/stdStatusChangeExamPage/topBar/topBar.vue'
  import studentStatusChangeExaminationDiv from '../../../../components/eduAdmin/basicSettings/stdStatusChangeExamPage/stdStatusChangeExamDiv/stdStatusChangeExamDiv.vue'
  export default {
    name: 'studentStatusChangeExamination',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      studentStatusChangeExaminationDiv,
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("studentStatusChangeExamination");
      dom.style.minHeight = window.innerHeight *0.85 + "px";
    }
  }
</script>

<style scoped>

</style>
