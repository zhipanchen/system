<template>
  <div id="textbookManagement_topBar">
    <div class="topBarDiv am-btn-group">
      <button id="topBarButton" class="am-btn am-btn-success btn-active">教材管理</button>
    </div>
    <div id="whiteDiv">
      <div id="buttonDiv">
        <span><button class="am-btn am-btn-success am-radius"  @click="downloadClick">下载模版</button></span>
        <span id="uploadSpan">
          <!--<button id="uploadButton" class="am-btn am-btn-success am-radius" @click="uploadClick">导入</button>-->
          <Upload
              id="upload"
              ref="uploadForTextbook"
              :show-upload-list="false"
              :format="['xls','xlsx']"
              :max-size="1024"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleSize"
              :on-success="handleSuccess"
              :on-progress="handleProgress"
              :on-error="handleError"
              action="./textbookManage/uploadTextbookInfo">
              <!--action="../updateTest/updata.php">-->
              <!--headers={"Content-Type":"multipart/form-data;charset=UTF-8"}>-->
            <i-button type="ghost" id="importButton">导入</i-button>
          </Upload>
        </span>
        <span><button id="downloadButton" class="am-btn am-btn-success am-radius" @click="downloadClick">导出</button></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'textbookManagement_topBar',
    data () {
      return {
        msg: ''
      }
    },
    mounted: function(){
      var importButton = document.getElementById("importButton");
      importButton.className = "am-btn am-btn-success am-radius";
    },
    methods:{
      downloadClick: function(){
        this.$http.post('./textbookManage/exportTextbookInfo',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          console.log("获取教室:");
          console.log(response.body);
          location.href = response.body.fileUrl;
        },function(error){
          console.log(error);
        });
      },
      handleFormatError: function(){
        this.$Message.error('文件格式错误！限制格式为'+this.$refs.uploadForTextbook.format,3);
      },
      handleSize: function(){
        this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.uploadForTextbook.maxSize,3);
      },
      handleError: function(res){
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(this.loadingMsg){
//            结束进度条
          this.$Loading.error();
//            移除“正在上传……”的msg
          if(!!window.ActiveXObject || "ActiveXObject" in window){
            msg[0].parentNode.innerHTML = "";
//                IE浏览器对removeChild实现有问题
          }else{
            msg[0].parentNode.removeChild(msg[0]);
          }
        }
        this.$Message.error('文件上传失败！'+res,3);
        this.loadingMsg = false;
      },
      handleProgress: function(){
        this.$Loading.start();
        this.$Message.loading('正在上传中……', 0);
        this.loadingMsg = true;
      },
      handleSuccess: function(res){
        this.$Loading.finish();
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(!!window.ActiveXObject || "ActiveXObject" in window){
          msg[0].parentNode.innerHTML = "";
        }else{
          msg[0].parentNode.removeChild(msg[0]);
        }
        this.$Message.success('上传成功！3s后自动刷新页面！',3);
        console.log(res);
        this.loadingMsg = false;
        setTimeout("location.reload(location.href)",4000);
      },
      downloadClick: function(){
        location.href = "../关于iview的使用.zip";
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #topBarButton{
    margin-left: 5rem;
  }
  #buttonDiv{
    display: flex;
    margin: 0 5rem;
    align-items: center;
    justify-content: center;
  }
  #whiteDiv{
    background-color: white;
    text-align: center;
  }
  #uploadSpan{
    position: relative;
  }
  #uploadBtn{
    /*width: ;*/
  }
  #uploadButton{
    position: absolute;
    z-index: 1000;
    top: -0.2rem;
    left: -0.3rem;
  }
  button{
    margin-right: 1.6rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

