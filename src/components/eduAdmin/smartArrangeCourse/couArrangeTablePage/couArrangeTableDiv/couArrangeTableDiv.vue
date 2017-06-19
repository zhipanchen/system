<template>
  <div id="couArrangeTableDiv">
    <div id="operationDiv">
      <div id="selectDiv">
        <button id="queryButton" @click="modal = true"  class="am-btn am-btn-success am-radius">智能排课</button>
        <form action="./autoArrangeSeeCurriculumExcel" method="get">
          <!--使用form表单进行文件下载-->
          <button id="exportButton" class="am-btn am-btn-success am-radius" type="submit" style="margin-left: 1.4rem">导出</button>
        </form>
      </div>
    </div>
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > 智能排课 > 排课执行</span>
    </div>
    <div id="mainDiv">
      <p id="tableTipP">显示当前智能排课结果生成的课表；支持调换选定的两门课程；重新排课之后可能会由于程序运行时间问题，需要等待并刷新页面。</p>
      <p id="tableInfoP">当前排课课表：</p>
      <tableDiv :queryCourse="queryCourse"></tableDiv><!--表格组件-->
    </div>

    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :closable="closable"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ modalMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <Button  id="modalBtn" @click="restartArrangeClick()" :loading="loading">确定</Button>
        <button id="modalBtn" @click="closeModal()">取消</button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import tableDiv from '../tableDiv/tableDiv.vue'
  export default {
    name: 'couArrangeTableDiv',
    data () {
      return {
        modal: false,
//        对话框显隐
        modalMessage: "您确定进行智能排课吗?",
        loading: false,
//        异步关闭对话框
        closable: false,
//        取消esc关闭对话框和左上角×
        isClose: true
//        是否允许关闭对话框
      }
    },
    components: {
      tableDiv
    },
    methods: {
      restartArrangeClick: function(){
        this.modalMessage = '正在智能排课中……';
        this.loading = true;
//        开启等待动态效果
        this.isClose = false;
//        不允许关闭对话框,防止误操作
        this.$http.post('./acdeminArrangeCurriculum',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          location.reload();
//          排课成功刷新页面
          this.modal = false;
          this.isClose = true;
          this.loading = false;
          this.modalMessage =  "您确定进行智能排课吗?";
        },function(error){
          this.modalMessage =  "排课失败，请重试！";
          this.isClose = true;
//        允许关闭对话框
          this.$Message.error("连接失败，请重试！");
        });
      }, //重新智能排课
      closeModal: function () {
        if(this.isClose){
//          判断是否运行关闭对话框
          this.modal = false;
          this.loading = false;
//          关闭等待动态效果
          this.modalMessage =  "您确定进行智能排课吗?";
//          恢复对话框内容
        }
      }//关闭对话框
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
    /*操作区域外层*/
    background-color: white;
    margin: 0 0 0.6rem;
  }
  #selectDiv{
    /*操作区域*/
    padding: 0.6rem 5rem;
    display: flex;
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
  @media screen and (max-width:1025px) {
    html {
      font-size: 56%;
    }
  }
</style>
