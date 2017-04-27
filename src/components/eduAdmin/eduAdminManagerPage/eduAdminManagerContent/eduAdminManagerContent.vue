<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-if="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="blank">
      <select class="selectStyle1">
        <option value="选择年制（必选项）" disabled selected>选择年制（必选项）</option>
        <option v-for="year in years" v-bind:value="year">{{year}}</option>
      </select>

      <select class="selectStyle2">
        <option value="选择课程（必选项）" disabled selected>选择课程（必选项</option>
        <option v-for="course in courses" v-bind:value="course">{{course}}</option>
      </select>
      <button class="searchButton am-btn am-btn-success am-radius">查找</button>
      <button class="exportButton am-btn am-btn-success am-radius">导出</button>
    </div>
    <div id="tableDiv">
      <table id="tableStyle" class="normalTable">
        <tr>
          <th>请选择</th>
          <th>序号</th>
          <th>人数</th>
          <th>考好试时间</th>
          <th>班级名称</th>
          <th>课程名称</th>
          <th>监考老师</th>
          <th>认可老师</th>
          <th>考试教师</th>
        </tr>
        <!--表头-->
        <tr v-for="(information,index) in informations" :id="information.id">
          <td><a class="editSpan" @click="checkClick(index)">{{ information.edit }}</a></td>
          <td>{{ information.id }}</td>
          <td>{{ information.peopleNumber }}</td>
          <td>{{ information.testTime }}</td>
          <td>{{ information.className }}</td>
          <td>{{ information.courseName }}</td>
          <td>{{ information.testTeacherName }}</td>
          <td>{{ information.courseTeacherName }}</td>
          <td>{{ information.testRoom }}</td>
        </tr>
      </table>
    </div>
    <div id="setting" v-if="setting">
      <span class="spanStyle">对序号为<span>{{number}}</span>的课程进行设置：</span><br>
      <select class="selectStyle1">
        <option value="监考老师" disabled selected>监考老师</option>
      </select>

      <select class="selectStyle2">
        <option value="选择时间" disabled selected>选择时间</option>
        <option v-for="time in times" v-bind:value="term">{{time}}</option>
      </select>

      <select class="selectStyle3">
        <option value="选择教室" disabled selected>选择教室</option>
        <option v-for="room in rooms" v-bind:value="term">{{room}}</option>
      </select>

      <button class="changeTermButton am-btn am-btn-success am-radius">保存</button>
      <button class="updateButton am-btn am-btn-success am-radius">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        setting:false,
        number:1,
        courses: [
          '课程01',
          '课程02',
          '课程03',
          '课程04',
          '课程05',
        ],
        years:[
          '三年制',
          '五年制',
        ],
        informations: [
          { edit:'编辑',id:'01', peopleNumber: '135', testTime: '2016.10.9{19:00-21:00}', className: '护理二班',courseName:'护理管理学',testTeacherName:'李晓红',courseTeacherName:'何平',testRoom:'教学楼408,409'},
          { edit:'编辑',id:'02', peopleNumber: '135', testTime: '2016.10.9{19:00-21:00}', className: '护理一班',courseName:'护理管理学',testTeacherName:'肖老师',courseTeacherName:'何平',testRoom:'教学楼408,409'},
        ],
        terms:[
          '2016-2017-1',
          '2016-2017-2',
          '2017-2018-1',
          '2017-2018-2',
        ],
        teachers:[
          '老师1',
          '老师2',
          '老师3',
        ],
        times:[
          '9:00-11:00',
          '2:30-4:30',
          '4:40-6:40',
        ],
        rooms:[
          '教室1',
          '教室2',
          '教室3',
        ]
      }
    },
  methods:
  {
    checkClick:function(index){
      this.number=index;
      if(!this.setting) {
        this.setting = true;
        this.informations[index].edit='修改中';
      }else{
        this.setting = false;
        this.informations[index].edit='编辑';
      }
    }
   }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  .selectStyle1{
    margin-left:5rem;
  }
  .selectStyle2{
    margin-left:5rem;
    margin-right:5rem;
  }
  #selectDiv{
    height:2.2rem;
  }
  .searchButton{
    margin-left:2rem;
    width:5.6rem;
    outline: none;
  }
  .exportButton{
    margin-left:2rem;
    width:5.6rem;
    outline: none;
  }
  #tableDiv{
    padding:1rem 5rem;
    background-color: #f3f3f3;
  }
  #tableStyle{
    text-align: center;
  }
  .editSpan{
    text-decoration:underline;
    cursor: pointer;
  }
  #setting{
    padding:0 5rem;
  }
  .selectStyle2{
    margin-left:5rem;
  }
  .selectStyle3{
    margin-left:5rem;
  }
  .changeTermButton{
    margin-left:5rem;
    width:5.6rem;
  }
  .updateButton{
    width:5.6rem;
    margin-left:2rem;
  }
  .spanStyle{
    display: block;
    height:1rem;
  }


  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
