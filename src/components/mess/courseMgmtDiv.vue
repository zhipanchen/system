<template>
    <div id="courseManagementDiv">
      <div id="fiveYearDiv">
        <button class="yearButton" @click="fiveYearClick"><p id="fiveYearArrow" class="arrowOpen">.</p>五年制</button>
        <table id="fiveYearTable" v-show="fiveYearTable">
          <tr class="headTr">
            <td>课程名称</td>
            <td>课程编号</td>
            <td>课程类型</td>
            <td>课程学时</td>
            <td class="operationTd"><button class="importButton">导入</button></td>
          </tr>
          <tr v-for="(fiveCourse,index) in fiveCourses" :id="'fiveInputTr'+index" :key="fiveCourse.number">
            <td><input id="fiveInput1" type="text" :value="fiveCourse.name" readonly="true"></td>
            <td><input id="fiveInput2" type="text" :value="fiveCourse.number" readonly="true"></td>
            <td><input id="fiveInput3" type="text" :value="fiveCourse.type" readonly="true"></td>
            <td><input id="fiveInput4" type="text" :value="fiveCourse.hour" readonly="true"></td>
            <td class="operationTd">
              <img :id="'fiveEditImg'+index" src="../../../../assets/images/edit.png" @click="editClick('five',index)">
              <img :id="'fiveSaveImg'+index" class="saveImg" src="../../../../assets/images/save.png" @click="saveClick('five',index)">
              <img :id="'fiveRestoreImg'+index" class="restoreImg" src="../../../../assets/images/restore.png" @click="restoreClick('five',index)">
              <img :id="'fiveDeleteImg'+index" src="../../../../assets/images/delete.png" @click="deleteClick(fiveCourses,index)">
            </td>
          </tr>
          <tr>
            <td><img src="../../../../assets/images/add.png" @click="addClick(fiveCourses,'five')"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div id="threeYearDiv">
        <button class="yearButton" @click="threeYearClick"><p id="threeYearArrow" class="arrowClose">.</p>三年制</button>
        <table id="threeYearTable" v-show="threeYearTable">
          <tr class="headTr">
            <td>课程名称</td>
            <td>课程编号</td>
            <td>课程类型</td>
            <td>课程学时</td>
            <td class="operationTd"><button class="importButton">导入</button></td>
          </tr>
          <tr v-for="(threeCourse,index) in threeCourses" :id="'threeInputTr'+index" :key="threeCourse.number">
            <td><input id="threeInput1" type="text" :value="threeCourse.name" readonly="true"></td>
            <td><input id="threeInput2" type="text" :value="threeCourse.number" readonly="true"></td>
            <td><input id="threeInput3" type="text" :value="threeCourse.type" readonly="true"></td>
            <td><input id="threeInput4" type="text" :value="threeCourse.hour" readonly="true"></td>
            <td class="operationTd">
              <img :id="'threeEditImg'+index" src="../../../../assets/images/edit.png" @click="editClick('three',index)">
              <img :id="'threeSaveImg'+index" class="saveImg" src="../../../../assets/images/save.png" @click="saveClick('three',index)">
              <img :id="'threeRestoreImg'+index" class="restoreImg" src="../../../../assets/images/restore.png" @click="restoreClick('three',index)">
              <img :id="'threeDeleteImg'+index" src="../../../../assets/images/delete.png" @click="deleteClick(threeCourses,index)">
            </td>
          </tr>
          <tr>
            <td><img src="../../../../assets/images/add.png" @click="addClick(threeCourses,'three')"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'courseManagementDiv',
        data () {
            return {
              fiveArrow: true,
              threeArrow: false,
              fiveYearTable: true,
              threeYearTable: false,
              fiveCourses: [
                { name:"护理学管理", number:"1", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"2", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"3", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"4", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"5", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"6", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"7", type:"专业必修", hour:"16" },
              ],
              threeCourses: [
                { name:"护理学管理", number:"1", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"2", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"3", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"4", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"5", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"6", type:"专业必修", hour:"16" },
                { name:"护理学管理", number:"7", type:"专业必修", hour:"16" },
              ],
            }
        },
        methods: {
          fiveYearClick: function(){
            var fiveYearArrow = document.getElementById("fiveYearArrow");
            if(!this.fiveArrow){
//              alert("open");
              this.fiveArrow = true;
              this.fiveYearTable = true;
              fiveYearArrow.className = "arrowOpen";
            }else{
//              alert("close");
              this.fiveArrow = false;
              this.fiveYearTable = false;
              fiveYearArrow.className = "arrowClose";
            }
          },
          threeYearClick: function(){
            var threeYearArrow = document.getElementById("threeYearArrow");
            if(!this.threeArrow){
//              alert("open");
              this.threeArrow = true;
              this.threeYearTable = true;
              threeYearArrow.className = "arrowOpen";
            }else{
//              alert("close");
              this.threeArrow = false;
              this.threeYearTable = false;
              threeYearArrow.className = "arrowClose";
            }
          },
          editClick: function(year,index){
            var inputTr = document.getElementById(year+"InputTr"+index);
            var input = inputTr.getElementsByTagName("input");
            var editImg = document.getElementById(year+"EditImg"+index);
            var saveImg = document.getElementById(year+"SaveImg"+index);
            var restoreImg = document.getElementById(year+"RestoreImg"+index);
            var deleteImg = document.getElementById(year+"DeleteImg"+index);
            var i = null;
            for(i = 0;i<input.length;i++){
              input[i].readOnly = false;
              input[i].style.border = "thin solid";
            }
            editImg.style.display = "none";
            saveImg.style.display = "inline";
            deleteImg.style.display = "none";
            restoreImg  .style.display = "inline";
//            alert(input.length);
          },
          restoreClick: function(year,index){
            if(confirm("您确定取消编辑并重置该课程信息吗？")){
              var inputTr = document.getElementById(year+"InputTr"+index);
              var input = inputTr.getElementsByTagName("input");
              var editImg = document.getElementById(year+"EditImg"+index);
              var saveImg = document.getElementById(year+"SaveImg"+index);
              var restoreImg = document.getElementById(year+"RestoreImg"+index);
              var deleteImg = document.getElementById(year+"DeleteImg"+index);
              var i = null;
              if(year == "five"){
                input[0].value = this.fiveCourses[index].name;
                input[1].value = this.fiveCourses[index].number;
                input[2].value = this.fiveCourses[index].type;
                input[3].value = this.fiveCourses[index].hour;
              }
              if(year == "three"){
                input[0].value = this.threeCourses[index].name;
                input[1].value = this.threeCourses[index].number;
                input[2].value = this.threeCourses[index].type;
                input[3].value = this.threeCourses[index].hour;
              }
              for(i = 0;i<input.length;i++){
                input[i].readOnly = true;
                input[i].style.border = "none";
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg  .style.display = "none";
            }
          },
          deleteClick: function(courses,index){
            if(confirm("您确定删除该课程吗？")){
//              var fiveYearDiv = document.getElementById("fiveYearDiv");
//              var input = fiveYearDiv.getElementsByTagName("input");
//              var n = 0;
//              for(var i = 0;i<input.length;i++){
//                if(input[i].readOnly == false){
//                  n++;
//                }
//              }
//              if(n != 0){
//                alert("存在编辑状态时不可执行删除操作，请确认！");
//              }else{
                  courses.splice(index, 1);
//              }
            }
          },
          saveClick: function(year,index){
            if(confirm("您确定提交保存该课程吗？")){
              var inputTr = document.getElementById(year+"InputTr"+index);
              var input = inputTr.getElementsByTagName("input");
              var editImg = document.getElementById(year+"EditImg"+index);
              var saveImg = document.getElementById(year+"SaveImg"+index);
              var restoreImg = document.getElementById(year+"RestoreImg"+index);
              var deleteImg = document.getElementById(year+"DeleteImg"+index);
              var i = null;
              if(year == "five"){
                this.fiveCourses[index].name = input[0].value;
                this.fiveCourses[index].number = input[1].value;
                this.fiveCourses[index].type = input[2].value;
                this.fiveCourses[index].hour = input[3].value;
              }
              if(year == "three"){
                this.threeCourses[index].name = input[0].value;
                this.threeCourses[index].number = input[1].value;
                this.threeCourses[index].type = input[2].value;
                this.threeCourses[index].hour = input[3].value;
              }
              for(i = 0;i<input.length;i++){
                input[i].readOnly = true;
                input[i].style.border = "none";
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg  .style.display = "none";
            }
          },
          addClick: function (courses,year){
            var i = courses.length - 1;
            var inputTr = document.getElementById(year+"InputTr"+i);
            var input = inputTr.getElementsByTagName("input");
            courses.push(
              { name:"null", number:"null", type:"null", hour:"null" }
            );
          }
        }
    }
</script>

<style scoped>
    html {
    }
    #courseManagementDiv{
      margin: 1.5rem auto;
      background-color: white;
      width: 90%;
    }
    .yearButton{
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      outline: none;
      background-color: #37937A;
      border: thin solid #37937A;
      margin: 0.1rem;
      color: white;
    }
    .yearButton:hover{
      cursor: pointer;
    }
    .arrowClose{
      border-bottom: solid #116D54;
      border-right: solid #116D54;
      width: 1rem;
      transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);/* IE 9 */
      -webkit-transform: rotate(-45deg);/* Safari and Chrome */
      -o-transform: rotate(-45deg);/* Opera */
      -moz-transform: rotate(-45deg);/* Firefox */
      margin: 0.5rem;
      color: #37937A;
      /*position: relative;*/
      /*bottom: 0.3rem;*/
    }
    .arrowOpen{
      border-bottom: solid #116D54;
      border-right: solid #116D54;
      width: 1rem;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);/* IE 9 */
      -webkit-transform: rotate(45deg);/* Safari and Chrome */
      -o-transform: rotate(45deg);/* Opera */
      -moz-transform: rotate(45deg);/* Firefox */
      margin: 0.5rem;
      color: #37937A;
      /*position: relative;*/
      /*bottom: 0.3rem;*/
    }
    table{
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
    .importButton{
      color: white;
      background-color: #158064;
      border: none;
      border-radius: 0.2rem;
      width: 5rem;
      height: 2rem;
      min-width: 5rem;
    }
    .importButton:hover{
      cursor: pointer;
    }
    .importButton:active{
      background-color: #00a539;
    }
    img{
      width: 2rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    img:hover{
      cursor: pointer;
    }
    .saveImg{
      display: none;
    }
    .restoreImg{
      width: 2.6rem;
      /*margin: 0 0 0 0.1rem;*/
      display: none;
    }
    .operationTd{
     width: 15rem;
    }
    @media screen and (max-width: 1023px) {
        html {
        }
    }
</style>
