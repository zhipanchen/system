<template>
  <div id="couArrangeTableDiv">
    <div id="operationDiv">
      <div id="selectDiv">
        <button id="queryButton" @click="restartArrangeClick()"  class="am-btn am-btn-success am-radius">重新智能排课</button>
      </div>
    </div>

    <div id="mainDiv">
      <p id="tableTipP">显示当前智能排课结果生成的课表；支持调换选定的两门课程；重新排课之后可能会由于程序运行时间问题，需要等待并刷新页面。</p>
      <p id="tableInfoP">当前排课课表：</p>
      <tableDiv :queryCourse="queryCourse"></tableDiv><!--表格组件-->
    </div>
  </div>
</template>
<!--待完善查询课表的数据交互，需要确认后端的查询方式；待完善下拉搜索功能，需要确认后端提供数据库搜索支持还是前端通过js搜索处理-->
<script>
  import tableDiv from '../tableDiv/tableDiv.vue'
  export default {
    name: 'couArrangeTableDiv',
    data () {
      return {
        term: ''
      }
    },
    components: {
      tableDiv
    },
    /*beforeMount: function() {
      this.$http.post('./alternateLessionHandle.action',{},{
//            this.$http.post('../testPhp/adjustCouApply.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log(response.body);
        var data = response.body;
        this.applications = data.applicationsList;
      },function(error){
        this.$Message.error("连接失败，请重试！");
      });
    },*/
    methods: {
      restartArrangeClick: function(){
        this.$http.post('./autoArrangeSeeCurriculum',{},{
//        this.$http.post('../testPhp/adjustCouApplySetTrue.php',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          console.log(response.body);
          this.$Message.loading('正在重新排课中（页面刷新后若课表无变动，需稍等后刷新）……', 5);
          setTimeout("location.reload(location.href)",6000);
        },function(error){
          this.$Message.error("连接失败，请重试！");
        });
      }
    }
  }
</script>

<style scoped>
  #couArrangeTableDiv{
    background-color: #f3f3f3;
  }
  #mainDiv{
    /*页面*/
    background-color: white;
    margin: 0 5rem;
    min-height: 33rem;
  }
  select{
    margin-right: 1.4rem;
  }
  #operationDiv{
    background-color: white;
    margin: 0 0 0.6rem;
  }
  #selectDiv{
    padding: 0.6rem 5rem;
  }
  #tableTipP{
    /*功能页面标题*/
    color: #C1C1C1;
    position: relative;
    text-align: left;
    z-index: 2;
    padding: 1rem;
    margin: 0;
  }
  #tableInfoP{
    /*表格课表标题*/
    text-align: left;
    position: relative;
    margin-top: 0;
    left: 1rem;
  }
  @media screen and (max-width:1023px) {
    html {
    }
  }
</style>
