<template>
  <div id="back">
    <div id="table">
        <div id="top">
          <div>
            <span>*标题:</span>
            <input id="title" v-model="announcementName" type="text">
          </div>
          <div>
            <span>*发布类别:</span>
            <select v-model="announcementType">
              <option  v-for="data in options" :value="data.value">
              {{data.option}}
              </option>
            </select>
          </div>
        </div>
        <div id="middle">
          <span >*内容:</span>
          <textarea v-model="announcementContent" cols ="130" rows = "20" ></textarea>
        </div>
        <div id="bottom">
           <!--<button class="am-btn am-btn-success am-radius" @click="up">上传</button>-->
          <form action="./announcementManage/addAnnouncement" method="post" enctype="multipart/form-data">
              <span>附件：</span>
              <input type="file" name="file">
              <input v-model="announcementName" name="announcementName" readonly style="display: none">
              <input v-model="announcementType"  name="announcementType"  readonly style="display: none">
              <input v-model="announcementContent"  name="announcementContent"  readonly style="display: none">
              <button  class="am-btn am-btn-success am-radius"  type="submit" @click="location.href='#/eduAdmin/information/noticeManage'">发布</button>
           </form>

          <!--<form enctype="multipart/form-data" id="tf">-->
            <!--<span>附件：</span>-->
            <!--<input type="file" name="file">-->
            <!--<input v-model="announcementName" name="announcementName" readonly style="display: none">-->
            <!--<input v-model="announcementType"  name="announcementType"  readonly style="display: none">-->
            <!--<input v-model="announcementContent"  name="announcementContent"  readonly style="display: none">-->
            <!--<input type="button" class="am-btn am-btn-success am-radius" value="发布" @click="publish">-->
          <!--</form>-->


          <!--<form>-->
            <!--<span>附件：</span>-->
            <!--<input type="file" id="file" name="file">-->
            <!--<input v-model="announcementName" name="announcementName" readonly style="display: none">-->
            <!--<input v-model="announcementType"  name="announcementType"  readonly style="display: none">-->
            <!--<input v-model="announcementContent"  name="announcementContent"  readonly style="display: none">-->
            <!--<button type="submit" class="am-btn am-btn-success am-radius" @click="submit">发布</button>-->
          <!--</form>-->


          <!--<button class="am-btn am-btn-success am-radius" @click="publish(announcementName,announcementType,announcementContent)">发布</button>-->
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        content:'',
        announcementName:'',
        announcementType:'',
        announcementContent:'',
        options:[{option:'学院公告',value:'1'},{option:'部门发布',value:'2'},{option:'科研动态',value:'3'},{option:'对外播报',value:'4'},{option:'教务文件',value:'5'},{option:'校务公布',value:'6'}]
      }

    },
//    beforeMount:function(){
//      this.$http.post('./',{},
//        {"Content-Type":"application/json"}).then(function (response) {
//          console.log(response);
//
//        },
//        function(error){
//          console.log("获取error:");
//          console.log(error);
//        });
//    },
    methods: {
//      publish: function () {
//        var form = new FormData(document.getElementById("tf"));
//        this.$http.post('./announcementManage/addAnnouncement',{
////            "announcementName":announcementName,
////            "announcementType":announcementType,
////            "announcementContent":announcementContent,
//          form
//        },
//          {"Content-Type":"multipart/form-data"}).then(function (response) {
//          if(response.body.result=="1")
//          {
//            alert("success");
//          }
//          console.log(response);
//          },
//          function(error){
//            console.log("获取error:");
//            console.log(error);
//          });
//
//      }
      }
    }



</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  #top{
    display:flex;
    justify-content: space-between;
    padding: 1rem 4.3rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    width:8rem;

  }
  #middle{
    display: flex;
    justify-content: center;
  }
  #bottom{
    display:flex;
    justify-content: space-between;
    padding: 1rem 4.3rem;
  }
</style>

