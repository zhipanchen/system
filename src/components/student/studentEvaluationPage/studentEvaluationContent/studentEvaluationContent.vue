<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="blank">
      <select class="selectStyle1">
        <option value="选择学期" disabled selected>选择学期</option>
        <option v-for="term in terms" v-bind:value="term">{{term}}</option>
      </select>

      <button class="changeTermButton am-btn am-btn-success am-radius">切换学期</button>
      <button class="updateButton am-btn am-btn-success am-radius">提交所有评教</button>
    </div>
    <div id="checkCourse_tableDiv">
      <table id="tableDiv" class="normalTable" border="1">
        <tr  id="weekdayTr">
          <th>课程代码</th>
          <th>课程名称</th>
          <th>开课院系</th>
          <th>教师姓名</th>
          <th>是否评教</th>
        </tr>
        <tr  v-for="(evalution,index) in evalutions" id="courseTr">
          <td>{{ evalution.courseNum }} </td>
          <td>{{ evalution.courseName }}</td>
          <td>{{ evalution.academy }}</td>
          <td>{{ evalution.teacherName }}</td>
          <td>
            <a class="aStyle" @click="checkClick(index)">{{ evalution.result }}</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        terms:[
          '2016-2017-1',
          '2016-2017-2',
          '2017-2018-1',
          '2017-2018-2',
          '2018-2019-1',
          '2018-2019-2',
          '2019-2020-1',
          '2019-2020-2',
        ],
        evalutions: [
          {courseNum: 'k2201710', courseName: '企业课I', academy: '信软学院', teacherName: '兰刚', result: '未评教'},
          {courseNum: 'k2210710', courseName: '硬件设计', academy: '信软学院', teacherName: '兰刚', result: '未评教'},
          {courseNum: 'k2017010', courseName: '合作课程', academy: '信软学院', teacherName: '兰刚', result: '未评教'},
        ]
      }
    },
    methods: {
      checkClick: function (index) {
        var r = confirm("评教界面");
        if (r) {
          this.evalutions[index].result = "已评教";
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
  #selectDiv{
    height:2.2rem;
  }
  .changeTermButton{
    margin-left:5rem;
    width:5.6rem;
    outline: none;
  }
  .updateButton{
    float:right;
    margin-top:0.5rem;
    margin-right:5rem;
    width:8rem;
    outline: none;
  }
  #checkCourse_tableDiv{
    height:30rem;
    padding:1rem 5rem 2rem 5rem;
    background-color: #f3f3f3;
  }
  #tableDiv{
    position: relative;
    width: 100%;
    border: 0 solid #d4d4d9;
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
  }
  .aStyle{
    color:#3985FF;
    cursor: pointer;
  }

  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
