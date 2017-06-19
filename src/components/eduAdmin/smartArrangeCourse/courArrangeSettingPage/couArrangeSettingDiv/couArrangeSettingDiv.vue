<template>
  <div id="courseArrangeSettingDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 智能排课 > 课程设置</span>
      </div>
    </div>
    <div class="dropDown">
      <div id="fiveYearDiv">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">五年制</span></button>
        <!--按钮实现点击显示或隐藏-->
        <table id="fiveYearTable" v-show="fiveYearTable">
          <thead>
            <tr class="headTr">
            <td class="courseTd" style="cursor: pointer" @click="sortInfo('five','course')" title="排序">课程名称<span class="sortSpan">↓</span></td>
              <!--点击按照拼音首字母a-z排序-->
            <td>课程编号</td>
            <td class="teacherTd" style="cursor: pointer" @click="sortInfo('five','teacher')" title="排序">任课教师<span class="sortSpan">↓</span></td>
            <td>教师编号</td>
            <td>班级</td>
            <td class="portTd">
              <button id="downloadButton" class="am-btn am-btn-success am-radius" @click="downloadClick">下载模版</button>
              <Upload
                id="upload"
                ref="uploadForTextbook"
                :data = "{ 'schoolYearType':'5'}"
                :show-upload-list="false"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSize"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-error="handleError"
                action="./courseAssociationManege/import">
              <i-button type="ghost" id="importButton1">导入</i-button>
              </Upload>
            </td>
          </tr>
          </thead>
          <tbody>
            <!--循环生成课程信息，index作为data数组的下标索引，将index用作id的一部分，便于准确定位操作DOM，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
            <tr v-for="(fiveCourse,index) in fiveCourses" :id="'fiveInputTr'+index" :key="fiveCourse.id">
              <td>
                <select v-model="fiveCourse.number" disabled @change="courseChange(fiveCourses,index,'five')">
                  <option disabled value="">选择课程</option>
                  <option v-for="course in course5s" :value="course.id">{{ course.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="fiveCourse.number" readonly="readonly"></td>
              <td>
                <select v-model="fiveCourse.teacherId" disabled @change="teacherChange(fiveCourses,index)">
                  <option disabled value="">选择教师</option>
                  <option v-for="teacher in teachers" :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="fiveCourse.teacherId" readonly="readonly"></td>
              <td class="classTd">
                <select v-model="fiveCourse.classId" disabled @change="classChange(fiveCourses,index,'five')">
                  <option disabled value="">选择班级</option>
                  <option v-for="className in className5s" :value="className.id">{{ className.name }}</option>
                </select>
              </td>
              <td class="operationTd">
                <img :id="'fiveEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('five',index)" title="编辑">
                <!--编辑功能，初始显示，编辑时隐藏-->
                <img :id="'fiveSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="operationClick('five',index,'save')" title="保存">
                <!--保存功能，初始隐藏，编辑时显示-->
                <img :id="'fiveRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="operationClick('five',index,'restore')" title="取消">
                <!--取消编辑并重置，初始隐藏，编辑时显示-->
                <img :id="'fiveDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="operationClick('five',index,'delete')" title="删除">
                <!--删除功能，初始显示，编辑时隐藏-->
              </td>
            </tr>
            <tr>
              <!--增加功能，通过vue增加循环数组元素，但input DOM不会即时创建，所以需要视图更新回调函数触发编辑状态-->
              <td><img src="../../../../../assets/images/add.png" @click="addClick(fiveCourses,'five')" title="添加"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="threeYearDiv">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">三年制</span></button>
        <!--按钮实现点击显示或隐藏-->
        <table id="threeYearTable" v-show="threeYearTable">
          <thead>
            <tr class="headTr">
            <td class="courseTd" style="cursor: pointer" @click="sortInfo('three','course')" title="排序">课程名称<span class="sortSpan">↓</span></td>
              <!--点击按照拼音首字母a-z排序-->
            <td>课程编号</td>
            <td class="teacherTd" style="cursor: pointer" @click="sortInfo('three','teacher')" title="排序">任课教师<span class="sortSpan">↓</span></td>
            <td >教师编号</td>
            <td>班级</td>
            <td class="portTd">
              <button id="downloadButton3" class="am-btn am-btn-success am-radius" @click="downloadClick">下载模版</button>
              <Upload
                id="upload"
                ref="uploadForTextbook"
                :data = "{ 'schoolYearType':'3'}"
                :show-upload-list="false"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSize"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-error="handleError"
                action="./courseAssociationManege/import">
                <i-button type="ghost" id="importButton2">导入</i-button>
              </Upload>
              <!--操作-->
            </td>
          </tr>
          </thead>
          <tbody>
          <!--循环生成课程信息，index作为data数组的下标索引，将index用作id的一部分，便于准确定位操作DOM，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
            <tr v-for="(threeCourse,index) in threeCourses" :id="'threeInputTr'+index" :key="threeCourse.id">
              <td>
                <select v-model="threeCourse.number" disabled @change="courseChange(threeCourses,index,'three')">
                  <option disabled value="">选择课程</option>
                  <option v-for="course in course3s"  :value="course.id">{{ course.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="threeCourse.number" readonly="readonly"></td>
              <td>
                <select v-model="threeCourse.teacherId" disabled @change="teacherChange(threeCourses,index)">
                  <option disabled value="">选择教师</option>
                  <option v-for="teacher in teachers"  :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="threeCourse.teacherId" readonly="readonly"></td>
              <td class="classTd">
                <select v-model="threeCourse.classId" disabled @change="classChange(threeCourses,index,'three')">
                  <option disabled>选择班级</option>
                  <option v-for="className in className3s" :value="className.id">{{ className.name }}</option>
                </select>
              </td>
              <td class="operationTd">
                <img :id="'threeEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('three',index)" title="编辑">
                <!--编辑功能，初始显示，编辑时隐藏-->
                <img :id="'threeSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="operationClick('three',index,'save')" title="保存">
                <!--保存功能，初始隐藏，编辑时显示-->
                <img :id="'threeRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="operationClick('three',index,'restore')" title="取消">
                <!--取消编辑并重置，初始隐藏，编辑时显示-->
                <img :id="'threeDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="operationClick('three',index,'delete')" title="删除">
                <!--删除功能，初始显示，编辑时隐藏-->
              </td>
            </tr>
            <tr>
              <td><img src="../../../../../assets/images/add.png" @click="addClick(threeCourses,'three')" title="添加"></td>
              <!--增加功能，通过vue增加循环数组元素，但input DOM不会即时创建，所以需要视图更新回调函数触发编辑状态-->
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定取消编辑并重置该课程信息吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="restoreClick(operationYear,operationIndex)">确定</button>
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
        <p>您确定删除该课程吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="deleteClick(operationYear,operationIndex)">确定</button>
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
        <p>您确定提交保存该课程信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveClick(operationYear,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal3 = false">取消</button>
      </div>
    </Modal>
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
    name: 'courseArrangeSettingDiv',
    data () {
      return {
        icon1:require('../../../../../assets/images/icon1.png'),
//        箭头图标
        icon2:require('../../../../../assets/images/icon2.png'),
        fiveArrow: true,
//        五年制课程下拉箭头，初始为下拉显示
        threeArrow: false,
//        三年制课程下拉箭头，初始为下拉隐藏
        fiveYearTable: true,
//        五年制课程下拉内容，初始为下拉显示
        threeYearTable: false,
//        三年制课程下拉内容，初始为下拉隐藏
        fiveCourses: [],
//              五年制课程信息
        threeCourses: [],
//              三年制课程信息
        course3s:[],
//              五年制课程下拉选择
        course5s:[],
//              三年制课程下拉选择
        teachers:[],
//              教师下拉选择
        className3s: [],
//              五年制班级下拉选择
        className5s: [],
//              五年制班级下拉选择
        buffer_fiveCourses: [],
//              五年制课程信息缓存
        buffer_threeCourses: [],
//              三年制课程信息缓存
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        modal4: false,
        operationYear: "",
        operationIndex: "",
//        对话框传递参数
        errorMessage:"",
//        复用对话框内容
        loadingMsg: false,
//        是否处于上传状态
      }
    },
    mounted: function(){
      var importButton1 = document.getElementById("importButton1");
      var importButton2 = document.getElementById("importButton2");
      importButton1.className = "am-btn am-btn-success am-radius";
      importButton2.className = "am-btn am-btn-success am-radius";
    }, //dom加载后修改上传按钮样式
    beforeMount: function() {
      this.$http.post('./courseAssociationManege',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body.courseTeacherList;
        this.fiveCourses = [];
        this.threeCourses = [];
        for(var i = 0;i < data.length;i++){
//          循环保存课程信息
          if(data[i].schoolYearType == 5){
            this.fiveCourses.push({ "id":data[i].courseAssociationId, "name":data[i].courseName, "number":data[i].courseId, "teacher":data[i].teacherName, "teacherId":data[i].teacherId, "classId":data[i].classId, "className": data[i].className, "coursePlanId":data[i].coursePlanId });
          }else if(data[i].schoolYearType == 3){
            this.threeCourses.push({ "id":data[i].courseAssociationId, "name":data[i].courseName, "number":data[i].courseId, "teacher":data[i].teacherName, "teacherId":data[i].teacherId, "classId":data[i].classId, "className": data[i].className, "coursePlanId":data[i].coursePlanId });
            }
        }
        for(var i = 0;i < this.fiveCourses.length;i++){
//          循环生成缓存数组
          this.buffer_fiveCourses.push({ id:"", name:"", number:"", teacher:"", teacherId:"", classId:"", className:"", coursePlanId:"" });
        }
        for(var i = 0;i < this.threeCourses.length;i++){
          this.buffer_threeCourses.push({ id:"", name:"", number:"", teacher:"", teacherId:"", classId:"", className:"", coursePlanId:"" });
        }

        for(var i = 0;i < response.body.course3List.length;i++){
//          循环分割下拉选择并保存
          this.course3s.push({ id:response.body.course3List[i].split("(")[0], name:response.body.course3List[i].split("(")[1].split(")")[0]})
        }
        for(var i = 0;i < response.body.course5List.length;i++){
//          循环分割下拉选择并保存
          this.course5s.push({ id:response.body.course5List[i].split("(")[0], name:response.body.course5List[i].split("(")[1].split(")")[0]})
        }
        for(var i = 0;i < response.body.teacherList.length;i++){
//          循环分割下拉选择并保存
          this.teachers.push({ id:response.body.teacherList[i].split("(")[0], name:response.body.teacherList[i].split("(")[1].split(")")[0]})
        }
        for(var i = 0;i < response.body.classList.length;i++){
//          循环分割下拉选择并分类保存
          if(response.body.classList[i].split("(")[0].substring(4,5) == "5") {
            this.className5s.push({
              id: response.body.classList[i].split("(")[0],
              name: response.body.classList[i].split("(")[1].split(")")[0]
            });
          }else if(response.body.classList[i].split("(")[0].substring(4,5) == "3") {
            this.className3s.push({
              id: response.body.classList[i].split("(")[0],
              name: response.body.classList[i].split("(")[1].split(")")[0]
            });
          }
        }
        console.log();
      },function(error){});
    }, //页面dom加载前获取后端数据
    methods: {
      sortInfo: function (year,type) {
        var courses = null;
        if(year == "five"){
          courses = JSON.parse(JSON.stringify(this.fiveCourses));
        }else if(year == "three"){
          courses = JSON.parse(JSON.stringify(this.threeCourses));
        }
//        通过JSON的转解进行深复制
        try {
          var saveImgs = document.getElementsByClassName("saveImg");
          for (var i = 0; i < saveImgs.length; i++) {
            if (saveImgs[i].style.display == "inline") {
//              判断是否有处于编辑状态的数据
              this.errorMessage = "有处于编辑状态或新增未保存的数据，无法进行排序!";
              this.modal4 = true;
              return;
            }
          }
          for (var i = 0; i < courses.length; i++) {
            if(courses[i].id == ""){
//              判断是否有新增未保存的数据
              this.errorMessage = "有处于编辑状态或新增未保存的数据，无法进行排序!";
              this.modal4 = true;
              return;
            }
          }
        }catch (e){}

        if (type == "course") {
          var a = [];
//          a存放排序依据课程名称
          var b = [];
//          b存放根据a进行排序的课程信息
          for (var i = 0; i < courses.length; i++) {
            var isExist = false;
            for (var n = 0; n < a.length; n++) {
              if(a[n] == courses[i].name){
//                防止重复放入
                isExist = true;
              }
            }
            if(!isExist){
              a.push(JSON.parse(JSON.stringify(courses[i].name)));
//              深复制
            }
          }
          console.log(a);
          a = a .sort (function(a,b){return a.localeCompare(b)});
//        按拼音首字母a-z排序

          for (var i = 0; i < a.length; i++) {
            for (var n = 0; n < courses.length; n++) {
              if(courses[n].name == a[i]){
//          b存放根据a进行排序的课程信息
                b.push(JSON.parse(JSON.stringify(courses[n])));
              }
            }
          }
          if(year == "five"){
            this.fiveCourses = JSON.parse(JSON.stringify(b));
          }else if(year == "three"){
            this.threeCourses = JSON.parse(JSON.stringify(b));
          }
//          深复制保存排序结果
        } else if (type == "teacher") {
          var a = [];
//          a存放排序依据教师名称
          var b = [];
//          b存放根据a进行排序的课程信息
          for (var i = 0; i < courses.length; i++) {
            var isExist = false;
            for (var n = 0; n < a.length; n++) {
              if(a[n] == courses[i].teacher){
//                防止重复放入
                isExist = true;
              }
            }
            if(!isExist){
              a.push(JSON.parse(JSON.stringify(courses[i].teacher)));
//              深复制
            }
          }
          console.log(a);
          a = a .sort (function(a,b){return a.localeCompare(b)});
//        按拼音首字母a-z排序

          for (var i = 0; i < a.length; i++) {
            for (var n = 0; n < courses.length; n++) {
              if(courses[n].teacher == a[i]){
//          b存放根据a进行排序的课程信息
                b.push(JSON.parse(JSON.stringify(courses[n])));
              }
            }
          }
          if(year == "five"){
            this.fiveCourses = JSON.parse(JSON.stringify(b));
          }else if(year == "three"){
            this.threeCourses = JSON.parse(JSON.stringify(b));
          }
//          深复制保存排序结果
        }
      },
      operationClick: function(year,operationIndex,operation){
        this.operationYear = year;
        this.operationIndex = operationIndex;
//        保存数据索引和年制类型
        if(operation == "restore"){
          this.modal1 = true;
//          打开重置对话框
        }else if(operation == "delete"){
          this.modal2 = true;
//          打开删除对话框
        }else if(operation == "save"){
          this.modal3 = true;
//          打开保存对话框
        }
      }, //对话框参数传递，触发对应对话框
      downloadClick: function(){
        location.href = "./courseAssociationManege/download";
//        通过跳转实现get方法请求接口，接口返回文件，浏览器识别后自动下载，和不传参的form表单达到一样的下载效果
      }, //下载模版
      fiveYearClick: function(){
        var fiveYearArrow = document.getElementById("fiveYearArrow");
        if(!this.fiveArrow){
//              显示下拉课程信息
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        }else{
//              隐藏下拉课程信息
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
      }, //点击显示或隐藏五年制下拉课程信息
      threeYearClick: function(){
        var threeYearArrow = document.getElementById("threeYearArrow");
        if(!this.threeArrow){
//              显示下拉课程信息
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        }else{
//              隐藏下拉课程信息
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },//点击显示或隐藏三年制下拉课程信息
//        编辑功能
      courseChange: function(courses,index,year){
        if(year == "five") {
          for (var i = 0; i < this.course5s.length; i++) {
            if (this.course5s[i].id == courses[index].number) {
              courses[index].name = this.course5s[i].name;
              break;
            }
          }
//          课程选择后，该数据信息中的课程id会发生修改，但课程名称并未修改，所以需要遍历数据，通过id找到数据修改名称
        }else if(year == "three"){
          for (var i = 0; i < this.course3s.length; i++) {
            if (this.course3s[i].id == courses[index].number) {
              courses[index].name = this.course3s[i].name;
              break;
            }
          }
        }
      }, //课程选择后id变化显示，保存选择
      teacherChange: function(courses,index){
        for(var i = 0;i < this.teachers.length;i++){
          if(this.teachers[i].id == courses[index].teacherId){
            courses[index].teacher = this.teachers[i].name;
            break;
          }
//          教师选择后，该数据信息中的教师id会发生修改，但教师名称并未修改，所以需要遍历数据，通过id找到数据修改名称
        }
      }, //教师选择后id变化显示，保存选择
      classChange: function(courses,index,year){
       if(year == "five") {
         for (var i = 0; i < this.className5s.length; i++) {
           if (this.className5s[i].id == courses[index].classId) {
             courses[index].className = this.className5s[i].name;
             break;
           }
         }
//          班级选择后，该数据信息中的班级id会发生修改，但班级名称并未修改，所以需要遍历数据，通过id找到数据修改名称
       }else if(year == "three"){
         for (var i = 0; i < this.className3s.length; i++) {
           if (this.className3s[i].id == courses[index].classId) {
             courses[index].className = this.className3s[i].name;
             break;
           }
         }
       }
      }, //班级选择后id变化显示，保存选择
      editClick: function(year,index){
        var inputTr = document.getElementById(year+"InputTr"+index);
        var select = inputTr.getElementsByTagName("select");
        var editImg = document.getElementById(year+"EditImg"+index);
        var saveImg = document.getElementById(year+"SaveImg"+index);
        var restoreImg = document.getElementById(year+"RestoreImg"+index);
        var deleteImg = document.getElementById(year+"DeleteImg"+index);
        for(var i = 0;i<select.length;i++){
          select[i].removeAttribute("disabled");
        }
//        使对应数据的选择框变为可操作状态
        if(year == "five"){
          this.buffer_fiveCourses.splice(index, 1, JSON.parse(JSON.stringify(this.fiveCourses[index])));
//          缓存数据以备重置
        }
        if(year == "three"){
          this.buffer_threeCourses.splice(index, 1, JSON.parse(JSON.stringify(this.threeCourses[index])));
//          缓存数据以备重置
        }
        editImg.style.display = "none";
        saveImg.style.display = "inline";
        deleteImg.style.display = "none";
        restoreImg.style.display = "inline";
//        隐藏编辑和删除功能图标,显示保存和重置功能图标
      }, //保存修改
      restoreClick: function(year,index){
//        if(confirm("您确定取消编辑并重置该课程信息吗？")){
          var inputTr = document.getElementById(year+"InputTr"+index);
          var select = inputTr.getElementsByTagName("select");
          var editImg = document.getElementById(year+"EditImg"+index);
          var saveImg = document.getElementById(year+"SaveImg"+index);
          var restoreImg = document.getElementById(year+"RestoreImg"+index);
          var deleteImg = document.getElementById(year+"DeleteImg"+index);
          var i = null;
//            重置数据
          if(year == "five"){
            this.fiveCourses.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_fiveCourses[index])));
            if(this.fiveCourses[index].coursePlanId == ""){
              this.fiveCourses.splice(index, 1);
              this.buffer_fiveCourses.splice(index, 1);
            }else{
              for(i = 0;i<select.length;i++){
                select[i].disabled = true;
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
            }
          }
          if(year == "three"){
            this.threeCourses.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_threeCourses[index])));
            if(this.threeCourses[index].coursePlanId == ""){
              this.threeCourses.splice(index, 1);
              this.buffer_threeCourses.splice(index, 1);
            }else{
              for(i = 0;i<select.length;i++){
                select[i].disabled = true;
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
            }
          }
//        }
          this.modal1 = false;
      },//取消修改,重置数据,退出编辑
      deleteClick: function(year,index){
        var courses = null;
        if (year == "five") {
          courses = this.fiveCourses;
        }else if (year == "three") {
          courses = this.threeCourses;
        }
//        判断年制，确定操作数据
        if(courses[index].id == ""){
//          判断是否为未保存的新增课程
          if (year == "five") {
            this.fiveCourses.splice(index, 1);
            this.buffer_fiveCourses.splice(index, 1);
          }else if (year == "three") {
            this.threeCourses.splice(index, 1);
            this.buffer_threeCourses.splice(index, 1);
          }
//          如果为新增数据，直接从数据数组中移除，不需要前后端交互
          this.$Message.success('删除成功！');
          this.modal2 = false;
//          关闭对话框
        }else {
          this.$http.post('./courseAssociationManege/delete',{
            "courseAssociationId": courses[index].id
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal2 = false;
//            关闭原对话框
            if (response.body.result == 1) {
              if (year == "five") {
                this.fiveCourses.splice(index, 1);
                this.buffer_fiveCourses.splice(index, 1);
              }else if (year == "three") {
                this.threeCourses.splice(index, 1);
                this.buffer_threeCourses.splice(index, 1);
              }
//              从前端数据数组中删除
              this.$Message.success('删除成功！');
            }else{
              this.errorMessage = "操作失败,请重试!";
              this.modal4 = true;
//              打开错误提示
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error("连接失败,请重试!");
          });
        }
      },
      saveClick: function(year,index){
        var courses = null;
        if(year == "five"){
          courses = this.fiveCourses;
        }else if(year == "three"){
          courses = this.threeCourses;
        }
//        判断操作数据的年制
        console.log(courses[index]);
        if(courses[index].name == "" || courses[index].number == "" || courses[index].teacher == "" || courses[index].teacherId == "" || courses[index].classId == "" || courses[index].className == ""){
//          判断数据内容非空
          this.modal3 = false;
//          关闭原对话框
          this.errorMessage = "编辑内容不能为空!";
          this.modal4 = true;
//          打开错误提示
        }else {
          var isExist = true;
          if(courses.length < 2){
            isExist = false;
//            当课程数量大于1时，判断修改是否重复
          }else if(year == "five"){
            for(var i = 0;i < courses.length;i++){
              if(courses[index].name != courses[i].name){
                isExist = false;
              }else if(courses[index].number != courses[i].number){
                isExist = false;
              }else if(courses[index].teacher != courses[i].teacher){
                isExist = false;
              }else if(courses[index].teacherId != courses[i].teacherId){
                isExist = false;
              }else if(courses[index].classId != courses[i].classId){
                isExist = false;
              }else if(courses[index].className != courses[i].className){
                isExist = false;
              }
            }
          }else if(year == "three"){
            for(var i = 0;i < courses.length;i++){
              if(courses[index].name != courses[i].name){
                isExist = false;
              }else if(courses[index].number != courses[i].number){
                isExist = false;
              }else if(courses[index].teacher != courses[i].teacher){
                isExist = false;
              }else if(courses[index].teacherId != courses[i].teacherId){
                isExist = false;
              }else if(courses[index].classId != courses[i].classId){
                isExist = false;
              }else if(courses[index].className != courses[i].className){
                isExist = false;
              }
            }
          }
          if(isExist) {
//            判断课程重复
            this.modal3 = false;
            this.errorMessage = "请不要重复设置相同的课程!";
            this.modal4 = true;
//            打开错误提示
          }else{
            var inputTr = document.getElementById(year + "InputTr" + index);
            var select = inputTr.getElementsByTagName("select");
            var editImg = document.getElementById(year + "EditImg" + index);
            var saveImg = document.getElementById(year + "SaveImg" + index);
            var restoreImg = document.getElementById(year + "RestoreImg" + index);
            var deleteImg = document.getElementById(year + "DeleteImg" + index);
            var i = null;
            var url = null;
            var schoolYearType = null;
            if (year == "five") {
              schoolYearType = 5;
            } else if (year == "three") {
              schoolYearType = 3;
            }
            if(courses[index].id == ""){
//          判断是否为未保存的新增课程，调用不同接口
              url = "./courseAssociationManege/addOne"
            }else{
              url = "./courseAssociationManege/update"
            }
            this.$http.post(url,{
              "courseAssociationId": courses[index].id,
              "courseName": courses[index].name,
              "courseId": courses[index].number,
              "teacherName": courses[index].teacher,
              "teacherId": courses[index].teacherId,
              "schoolYearType": schoolYearType,
              "classId": courses[index].classId,
              "coursePlanId": courses[index].coursePlanId,
              "className": courses[index].className
            }, {
              "Content-Type": "application/json"
            }).then(function (response) {
              this.modal3 = false;
//              关闭原对话框
              var data = response.body;
              if (data.result == 1) {
                for (i = 0; i < select.length; i++) {
                  select[i].disabled = true;
                }
//                选择框变为不可操作状态
                editImg.style.display = "inline";
                saveImg.style.display = "none";
                deleteImg.style.display = "inline";
                restoreImg.style.display = "none";
//                显示编辑和删除图标，隐藏保存和取消图标
                this.$Message.success('保存成功！');
              } else {
                this.errorMessage = "操作失败，请重试!";
                this.modal4 = true;
//                打开错误提示
              }
            }, function (error) {
              this.modal3 = false;
              this.$Message.error('连接失败，请重试！');
            });
          }
        }
      }, //保存功能
      addClick: function (courses,year){
//        添加未保存的新增课程，添加对应缓存
        courses.push(
            { id:"",name:"", "number":"", "teacher":"", "teacherId":"", "classId":"选择班级", className:"", coursePlanId:""}
        );
        this.$nextTick(function () {
//          视图更新后触发回调
          var editImg = null;
          if (year == "five") {
            editImg = document.getElementById("fiveEditImg" + (courses.length - 1));
          }else if (year == "three") {
            editImg = document.getElementById("threeEditImg" + (courses.length - 1));
          }
//          获取新增数据的编辑图标DOM
          editImg.click();
//          触发编辑状态
        });
        if (year == "five") {
          this.buffer_fiveCourses.push(
              { id:"",name:"", "number":"", "teacher":"", "teacherId":"", "classId":"选择班级", className:"", coursePlanId:""}
          );
        }else if (year == "three") {
          this.buffer_threeCourses.push(
              { id:"",name:"", "number":"", "teacher":"", "teacherId":"", "classId":"选择班级", className:"", coursePlanId:""}
          );
        }
//        添加缓存数据
      }, //增加功能
      handleFormatError: function(){
        this.errorMessage = "文件格式错误！限制格式为"+this.$refs.uploadForTextbook.format;
        this.modal4 = true;
//        打开错误提示
      },//文件格式验证
      handleSize: function(){
        this.errorMessage = "文件大小超出范围！限制最大（KB）为"+this.$refs.uploadForTextbook.maxSize;
        this.modal4 = true;
//        打开错误提示
      },//文件大小验证
      handleError: function(res){
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(this.loadingMsg){
          this.$Loading.error();
//            结束进度条
          if(!!window.ActiveXObject || "ActiveXObject" in window){
            msg[0].parentNode.innerHTML = "";
//            IE浏览器对removeChild实现有问题
          }else{
            msg[0].parentNode.removeChild(msg[0]);
          }
//            移除“正在上传……”的msg
        }
        this.errorMessage = "文件上传失败"+res;
        this.modal4 = true;
//        打开错误提示
        this.loadingMsg = false;
      },//文件上传失败回调
      handleProgress: function(){
        this.$Loading.start();
        this.$Message.loading('正在上传中……', 0);
        this.loadingMsg = true;
//        设置上传状态
      },//上传过程回调
      handleSuccess: function(res){
        this.$Loading.finish();
//            结束进度条
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(!!window.ActiveXObject || "ActiveXObject" in window){
          msg[0].parentNode.innerHTML = "";
//            IE浏览器对removeChild实现有问题
        }else{
          msg[0].parentNode.removeChild(msg[0]);
        }
//            移除“正在上传……”的msg
        this.$Message.success('上传成功！3s后自动刷新页面！',3);
        console.log(res);
        this.loadingMsg = false;
//        设置上传状态
        setTimeout("location.reload()",4000);
//        定时4s后刷新页面
      }
    }
  }
</script>

<style scoped>
  /*最上层Div*/
  #courseArrangeSettingDiv{
    margin: 0 auto;
    background-color: #f3f3f3;
    min-height: 38.5rem;
  }
  .dropDown{
    /*页面主要内容*/
    margin: 0.5rem 5rem;
  }
  .amButtom{
    /*折叠按钮*/
    cursor: pointer;
  }
  table{
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    table-layout: fixed;
    border-right: thin solid #E3E3E3;
    border-left: thin solid #E3E3E3;
  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;
  }
  tbody td{
    height: 3.5rem;
  }
  img{
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  input{
    outline:none;
    border: none;
    text-align: center;
  }
  .saveImg{
    /*保存功能图标*/
    display: none;
  }
  .restoreImg{
    /*重置功能图标*/
    display: none;
  }
  .operationTd{
    /*功能图标*/
    width: 15rem;
  }
  .portTd{
    /*下载和导入*/
    /*display: flex;*/
    padding: 0;
  }
  #upload{
    display: inline;
    float: right;
  }
  #downloadButton{
    /*五年制模版下载按钮*/
    height: 2.35rem;
  }
  #downloadButton3{
    /*三年制模版下载按钮*/
    height: 2.35rem;
  }
  .courseTd:hover > span{
    color: red;
  }
  .teacherTd:hover > span{
    color: red;
  }
  @media screen and (max-width: 1117px) {
    .am-btn{

    }
    #downloadButton{
      /*五年制模版下载按钮*/
      width: 4.5rem;
      padding: 0;
    }
    #downloadButton3{
      /*三年制模版下载按钮*/
      width: 4.5rem;
      padding: 0;
    }
  }
</style>
