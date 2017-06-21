<template>
  <div id="classroomManagementDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 资源管理设置 > 教室管理</span>
      </div>
    </div>
    <div class="dropDown">
      <div id="classroomDiv">
        <button class="amButtom" @click="classroomClick"><img id="classroomArrow" class="iconImg" :src="icon2"><span class="subtitle">普通教室</span></button>
        <!--按钮实现点击显示或隐藏-->
        <table id="classroomTable" v-show="classroomTable">
          <tr class="headTr">
            <td>教室ID</td>
            <td>教室位置</td>
            <td>人数</td>
            <td>操作</td>
          </tr>
          <tr v-for="(classroom,index) in classrooms" :id="'classroomInputTr'+index" :key="classroom.name">
            <!--循环生成教室信息，index作为教室数组的下标索引，将index用作图标id的一部分，便于准确定位操作DOM，key用于绑定教室信息，保证索引不随着数组元素增删自动发生变化-->
            <td><input id="classroomInput" type="text" v-model="classroom.id" readonly="true"></td>
            <td><input id="classroomInput1" type="text" v-model="classroom.name" readonly="true"></td>
            <td><input id="classroomInput2" type="text" v-model="classroom.number" readonly="true"></td>
            <td class="operationTd">
              <img :id="'classroomEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('classroom',index)" title="编辑">
              <!--编辑功能，初始显示，编辑时隐藏-->
              <img :id="'classroomSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="operationClick('classroom',index,'save')" title="保存">
              <!--保存功能，初始隐藏，编辑时显示-->
              <img :id="'classroomRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="operationClick('classroom',index,'restore')" title="取消">
              <!--取消编辑重置，初始隐藏，编辑时显示-->
              <img :id="'classroomDeleteImg'+index" src="../../../../../assets/images/delete.png"  @click="operationClick('classroom',index,'delete')" title="删除">
              <!--删除功能，初始显示，编辑时隐藏-->
            </td>
          </tr>
          <tr>
            <td><img src="../../../../../assets/images/add.png" @click="addClick(classrooms,'classroom')" title="添加"></td>
            <!--增加功能，通过vue增加循环数组元素，但input DOM不会即时创建，所以需要视图更新回调函数触发编辑状态-->
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div id="engineRoomDiv">
        <button class="amButtom" @click="engineRoomClick"><img id="engineRoomArrow" class="iconImg" :src="icon1"><span class="subtitle">机房</span></button>
        <table id="engineRoomTable" v-show="engineRoomTable">
          <tr class="headTr">
            <td>教室ID</td>
            <td>教室位置</td>
            <td>人数</td>
            <td>操作</td>
          </tr>
          <tr v-for="(engineRoom,index) in engineRooms" :id="'engineInputTr'+index" :key="engineRoom.name">
            <td><input id="engineInput" type="text" v-model="engineRoom.id" readonly="true"></td>
            <td><input id="engineInput1" type="text" v-model="engineRoom.name" readonly="true"></td>
            <td><input id="engineInput2" type="text" v-model="engineRoom.number" readonly="true"></td>
            <td class="operationTd">
              <img :id="'engineEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('engine',index)" title="编辑">
              <img :id="'engineSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="operationClick('engine',index,'save')" title="保存">
              <img :id="'engineRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="operationClick('engine',index,'restore')" title="取消">
              <img :id="'engineDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="operationClick('engine',index,'delete')" title="删除">
            </td>
          </tr>
          <tr>
            <td><img src="../../../../../assets/images/add.png" @click="addClick(engineRooms,'engine')" title="添加"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <!--对话框↓-->
    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量modal1，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定取消编辑并重置该教室信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="restoreClick(operationObj,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定删除该教室吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="deleteClick(operationObj,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal3"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交保存该教室信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveClick(operationObj,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal3 = false">取消</button>
      </div>
    </Modal>
    <!--可重复使用的无操作信息提示框-->
    <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal4 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'classroomManagementDiv',
    data () {
      return {
        icon1:require('../../../../../assets/images/icon1.png'),
//        箭头符号
        icon2:require('../../../../../assets/images/icon2.png'),
        classroomArrow: true,
//        普通教室下拉箭头，初始为下拉显示
        engineRoomArrow: false,
//        机房下拉箭头，初始为下拉隐藏
        classroomTable: true,
//        普通教室下拉内容，初始为下拉显示
        engineRoomTable: false,
//        机房下拉内容，初始为下拉隐藏
        classrooms: [],
//        普通教室信息
        engineRooms: [],
//        机房信息
        buffer_classrooms: [],
//        用于缓存编辑前的数据，便于重置
        buffer_engineRooms: [],
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        modal4: false,
        operationObj:null,
//        对话框参数传递
        operationIndex: 0,
        errorMessage:""
//        复用的对话框提示
      }
    },
    beforeMount: function() {
      this.$http.post('./classroomManage/getClassroomInfo',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body;
        for(var i = 0;i < data.Classroom.length;i++){
//          按教室类别分类保存数据
          if(data.Classroom[i].classType == "机房"){
            this.engineRooms.push({ id:data.Classroom[i].classroomId, name:"第"+data.Classroom[i].classroomId.split("-")[0]+"教学楼"+data.Classroom[i].classroomId.split("-")[1], number:data.Classroom[i].classroomSize });
          }else{
            this.classrooms.push({ id:data.Classroom[i].classroomId, name:"第"+data.Classroom[i].classroomId.split("-")[0]+"教学楼"+data.Classroom[i].classroomId.split("-")[1], number:data.Classroom[i].classroomSize });
          }
        }
        for(var i = 0;i < this.classrooms.length;i++){
          this.buffer_classrooms.push({ id:"", name:"", number:"" });
        }
//        创建对应的缓存数据数组
        for(var i = 0;i < this.engineRooms.length;i++){
          this.buffer_engineRooms.push({ id:"", name:"", number:"" });
        }
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    }, //页面dom加载前获取后端数据，修饰教室位置，缓存数据
    methods: {
      operationClick: function(obj,operationIndex,operation){
        this.operationObj = obj;
        this.operationIndex = operationIndex;
        if(operation == "restore"){
//          根据操作触发不同对话框
          this.modal1 = true;
        }else if(operation == "delete"){
          this.modal2 = true;
        }else if(operation == "save"){
          this.modal3 = true;
        }
      }, //模拟对话框的参数传递，触发不同对话框
      classroomClick: function(){
        var classroomArrow = document.getElementById("classroomArrow");
        if(!this.classroomArrow){
//              显示下拉教室信息
          this.classroomArrow = true;
          this.classroomTable = true;
          classroomArrow.src = this.icon2;
//          更换箭头图片
        }else{
//              隐藏下拉教室信息
          this.classroomArrow = false;
          this.classroomTable = false;
          classroomArrow.src = this.icon1;
        }
      }, //点击显示或隐藏下拉普通教室信息
      engineRoomClick: function(){
        var engineRoomArrow = document.getElementById("engineRoomArrow");
        if(!this.engineRoomArrow){
          this.engineRoomArrow = true;
          this.engineRoomTable = true;
          engineRoomArrow.src = this.icon2;
        }else{
          this.engineRoomArrow = false;
          this.engineRoomTable = false;
          engineRoomArrow.src = this.icon1;
        }
      }, //点击显示或隐藏下拉机房信息
      editClick: function(type,index){
        var inputTr = document.getElementById(type+"InputTr"+index);
        var input = inputTr.getElementsByTagName("input");
        var editImg = document.getElementById(type+"EditImg"+index);
        var saveImg = document.getElementById(type+"SaveImg"+index);
        var restoreImg = document.getElementById(type+"RestoreImg"+index);
        var deleteImg = document.getElementById(type+"DeleteImg"+index);

        input[2].readOnly = false;
        input[2].style.border = "0.1rem solid #d4d4d9";
        if(input[0].value == "请编辑后保存"){
//        判断是否为新增未保存的教室，使ID可编辑
          input[0].readOnly = false;
          input[0].style.border = "0.1rem solid #d4d4d9";
        }

        if(type == "classroom"){
          this.buffer_classrooms.splice(index, 1, JSON.parse(JSON.stringify(this.classrooms[index])));
        }
//        更新缓存数据，以便重置
        if(type == "engine"){
          this.buffer_engineRooms.splice(index, 1, JSON.parse(JSON.stringify(this.engineRooms[index])));
        }

        editImg.style.display = "none";
        deleteImg.style.display = "none";
        saveImg.style.display = "inline";
        restoreImg.style.display = "inline";
//        显示保存和取消图标，隐藏编辑和删除图标

        if(type == "classroom"){
          //如果为未保存的新增教室，清空提示
          if(this.classrooms[index].id == "请编辑后保存" || this.classrooms[index].number == "请编辑后保存"){
            this.classrooms[index].id = "";
            this.classrooms[index].number = "";
            input[0].value = "";
            input[2].value = "";
          }
        }
        if(type == "engine"){
          //如果为未保存的新增教室，清空提示
          if(this.engineRooms[index].id == "请编辑后保存" || this.engineRooms[index].number == "请编辑后保存"){
            this.engineRooms[index].id = "";
            this.engineRooms[index].number = "";
            input[0].value = "";
            input[2].value = "";
          }
        }
      },//编辑功能
      restoreClick: function(type,index){
        var inputTr = document.getElementById(type+"InputTr"+index);
        var input = inputTr.getElementsByTagName("input");
        var editImg = document.getElementById(type+"EditImg"+index);
        var saveImg = document.getElementById(type+"SaveImg"+index);
        var restoreImg = document.getElementById(type+"RestoreImg"+index);
        var deleteImg = document.getElementById(type+"DeleteImg"+index);
        var i = null;
        if (type == "classroom") {
          this.classrooms.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_classrooms[index])));
//        从缓存数据中重置数据
          if(this.classrooms[index].name == "") {
//            如果为新增未保存数据，直接删除
            this.classrooms.splice(index, 1);
            this.buffer_classrooms.splice(index, 1);
          }else {
            for (i = 0; i < input.length; i++) {
//          使教室信息的输入标签变为不可输入，隐藏边框
              input[i].readOnly = true;
              input[i].style.border = "none";
            }
            editImg.style.display = "inline";
            deleteImg.style.display = "inline";
            saveImg.style.display = "none";
            restoreImg.style.display = "none";
//            显示编辑和删除，隐藏保存和取消
          }
        }else if (type == "engine") {
          this.engineRooms.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_engineRooms[index])));
//        从缓存数据中重置数据
          if(this.engineRooms[index].name == "") {
//            如果为新增未保存数据，直接删除
            this.engineRooms.splice(index, 1);
            this.buffer_engineRooms.splice(index, 1);
          }else {
            for (i = 0; i < input.length; i++) {
//          使教室信息的输入标签变为不可输入，隐藏边框
              input[i].readOnly = true;
              input[i].style.border = "none";
            }
            editImg.style.display = "inline";
            deleteImg.style.display = "inline";
            saveImg.style.display = "none";
            restoreImg.style.display = "none";
//            显示编辑和删除，隐藏保存和取消
          }
        }
        this.modal1 = false;
//        关闭对话框
      }, //取消修改,重置数据,退出编辑
      deleteClick: function(type,index){
        var classroom = null;
        if (type == "classroom") {
          classroom = this.classrooms;
        }
//        判断操作的教室类型数据数组
        if (type == "engine") {
          classroom = this.engineRooms;
        }
        if(classroom[index].name == ""){
//          如果是未保存的新增教室，不需要前后端交互删除
          if (type == "classroom") {
            this.classrooms.splice(index, 1);
            this.buffer_classrooms.splice(index, 1);
          }
          if (type == "engine") {
            this.engineRooms.splice(index, 1);
            this.buffer_engineRooms.splice(index, 1);
          }
          this.$Message.success('删除成功！');
          this.modal2 = false;
//        关闭对话框
        }else {
          this.$http.post('./classroomManage/deleteClassroom', {
            "classroomId": classroom[index].id
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal2 = false;
//        关闭对话框
            console.log("删除教室:");
            console.log(response.body);
            var data = response.body;
            if (data.result == "1") {
              //          从本地data的教室信息数组中删除数据
              if (type == "classroom") {
                this.classrooms.splice(index, 1);
                this.buffer_classrooms.splice(index, 1);
              }
              if (type == "engine") {
                this.engineRooms.splice(index, 1);
                this.buffer_engineRooms.splice(index, 1);
              }
              this.$Message.success('删除成功！');
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal4 = true;
//              显示信息提示对话框
            }
          }, function (error) {
            this.modal2 = false;
//            关闭对话框
            this.$Message.error("连接失败,请重试!");
          });
        }
      }, //删除教室
      saveClick: function(type,index){
        var inputTr = document.getElementById(type+"InputTr"+index);
        var input = inputTr.getElementsByTagName("input");
        var editImg = document.getElementById(type+"EditImg"+index);
        var saveImg = document.getElementById(type+"SaveImg"+index);
        var restoreImg = document.getElementById(type+"RestoreImg"+index);
        var deleteImg = document.getElementById(type+"DeleteImg"+index);
        var i = null;
        var classType = null;
        if(type == "classroom"){
//          判断教室类型
          classType = "普通教室";
        }else if(type == "engine"){
          classType = "机房";
        }
        if(input[0].readOnly = false){
//          如果为未保存的新增教室，保存触发新增接口
          if(isNaN(Number(input[2].value)) || input[2].value == ""){
//            校验数据格式
            this.modal3 = false;
//            关闭原对话框
            this.errorMessage = "请确认教室容纳人数为合理数字！";
            this.modal4 = true;
//            显示信息提示对话框
          }else{
          this.$http.post('./classroomManage/addClassroom', {
              "classroomId": input[0].value,
              "classType": classType,
              "classroomSize": input[2].value
            }, {
              "Content-Type": "application/json"
            }).then(function (response) {
              this.modal3 = false;
//            关闭原对话框
              var data = response.body;
              if (data.result == "1") {
                this.$Message.success('保存成功！');
//                本地数据保存，根据教室id显示具体位置
                if (type == "classroom") {
                  var name = "第" + this.classrooms[index].id.split("-")[0] + "教学楼" + this.classrooms[index].id.split("-")[1];
                  this.classrooms.splice(index, 1, {"id":input[0].value,"name":name,"number":input[2].value});
                }
                if (type == "engine") {
                  var name = "第" + this.engineRooms[index].id.split("-")[0] + "教学楼" + this.engineRooms[index].id.split("-")[1];
                  this.engineRooms.splice(index, 1, {"id":input[0].value,"name":name,"number":input[2].value});
                }
                for (i = 0; i < input.length; i++) {
//                  将输入框变为不可输入
                  if (i != 1) {
                    input[i].readOnly = true;
                    input[i].style.border = "none";
                  }
                }
                editImg.style.display = "inline";
                deleteImg.style.display = "inline";
                saveImg.style.display = "none";
                restoreImg.style.display = "none";
              }
            }, function (error) {
            this.modal3 = false;
//            关闭原对话框
            this.$Message.error("连接失败,请重试!");
            });
          }
        }else{
//          如果为已保存在数据库的教室信息，触发修改接口
          if(input[0].value.indexOf("-") < 0){
//            校验数据格式
            this.modal3 = false;
//            关闭原对话框
            this.errorMessage = "教室ID输入格式有误！（正确如：1-101）";
            this.modal4 = true;
//            显示信息提示对话框
          }else if(isNaN(Number(input[0].value.split("-")[0])) || isNaN(Number(input[0].value.split("-")[1]))){
//            校验数据格式
            this.modal3 = false;
//            关闭原对话框
            this.errorMessage = "教室ID输入格式有误！（正确如：1-101）";
            this.modal4 = true;
//            显示信息提示对话框
          }else if(isNaN(Number(input[2].value)) || input[2].value == ""){
//            校验数据格式
            this.modal3 = false;
//            关闭原对话框
            this.errorMessage = "请确认教室容纳人数为合理数字！";
            this.modal4 = true;
//            显示信息提示对话框
          }else{
          this.$http.post('./classroomManage/editClassroom', {
              "classroomId": input[0].value,
              "classType": classType,
              "classroomSize": input[2].value
            }, {
              "Content-Type": "application/json"
            }).then(function (response) {
              this.modal3 = false;
//            关闭原对话框
              var data = response.body;
              if (data.result == "1") {
                this.$Message.success('保存成功！');
//                本地数据保存，根据教室id显示具体位置
                if (type == "classroom") {
                  var name = "第" + this.classrooms[index].id.split("-")[0] + "教学楼" + this.classrooms[index].id.split("-")[1];
                  this.classrooms.splice(index, 1, {"id":input[0].value,"name":name,"number":input[2].value});
                }
                if (type == "engine") {
                  var name = "第" + this.engineRooms[index].id.split("-")[0] + "教学楼" + this.engineRooms[index].id.split("-")[1];
                  this.engineRooms.splice(index, 1, {"id":input[0].value,"name":name,"number":input[2].value});
                }
                for (i = 0; i < input.length; i++) {
//                  将输入框变为不可输入
                  if (i != 1) {
                    input[i].readOnly = true;
                    input[i].style.border = "none";
                  }
                }
                editImg.style.display = "inline";
                deleteImg.style.display = "inline";
                saveImg.style.display = "none";
                restoreImg.style.display = "none";
                for (var i = 0; i < this.classrooms.length; i++) {
                  if(i != index && this.classrooms[i].id == this.classrooms[index].id){
                    setTimeout("location.reload()",2000);
                    return;
                  }
                }
//                判断教室是否已经存在，刷新页面保证数据变化正常
                for (var i = 0; i < this.engineRooms.length; i++) {
                  if(i != index && this.engineRooms[i].id == this.engineRooms[index].id){
                    setTimeout("location.reload()",2000);
                    return;
                  }
                }
              }
            }, function (error) {
              this.modal3 = false;
//            关闭原对话框
              this.$Message.error("连接失败,请重试!");
            });
          }
        }
      },//保存数据
      addClick: function (classroom,type){
          classroom.push(
              { id:"请编辑后保存", name:"", number:"请编辑后保存" }
          );
          this.$nextTick(function () {
//            在教室添加成功后触发vue数据视图更新回调函数
            var editImg = null;
            if (type == "classroom") {
              editImg = document.getElementById("classroomEditImg" + (classroom.length - 1));
            }
//            获取新增数据的编辑图标DOM
            if (type == "engine") {
              editImg = document.getElementById("engineEditImg" + (classroom.length - 1));
            }
            editImg.click();
//            触发编辑
          });
          if (type == "classroom") {
            this.buffer_classrooms.push(
                { id:"请编辑后保存", name:"", number:"请编辑后保存" }
            );
          }
//        新增缓存数据
          if (type == "engine") {
            this.buffer_engineRooms.push(
                { id:"请编辑后保存", name:"", number:"请编辑后保存" }
            );
          }
      }//新增未保存的教室，进入编辑状态；新增对应缓存数据
    }
  }
</script>

<style scoped>
  #classroomManagementDiv{
    /*最上层Div*/
    margin: 0 auto;
    background-color: #f3f3f3;
    min-height: 39rem;
  }
  .dropDown{
    /*页面主要内容*/
    margin: 0.5rem 5rem;
  }
  .amButtom{
    /*折叠按钮*/
    cursor: pointer;
  }
  img{
    /*操作图标*/
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  table{
    /*教室信息*/
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    border-right: thin solid #E3E3E3;
    border-left: thin solid #E3E3E3;
  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;
  }
  input{
    outline:none;
    border: none;
    text-align: center;
  }
  img:hover{
    cursor: pointer;
  }
  .saveImg{
    /*保存功能图标*/
    display: none;
  }
  .restoreImg{
    /*重置功能图标*/
    /*margin: 0 0 0 0.1rem;*/
    display: none;
  }
  .operationTd{
    /*四个功能图标*/
    width: 15rem;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
