<template>
  <div id="table">
    <div id="show">
      <table class="normalTable">
        <thead>
        <tr>
          <th colspan=4>督导反馈</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>督导日期</td>
          <td colspan=3><input class="big" type="text"></td>
        </tr>
        <tr><td rowspan=8>评分</td>
             <td>学生出勤情况</td><td><input class="sma" type="text"></td></tr>
        <tr><td>授课内容</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>教师素养得分</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>教学目标得分</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>教学内容得分</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>教学方法得分</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>教学常规得分</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>教学内容得分</td> <td><input class="sma" type="text"></td></tr>
        <tr><td>督导员意见</td>
             <td colspan=3><input class="big" type="text"></td>
        </tr>
        <tr><td>教务人员意见</td>
          <td colspan=3><input class="big" type="text"></td>
        </tr>
        <tr><td>教师反馈</td>
          <td colspan=3><input class="big" type="text"></td>
        </tr>
        </tbody>
      </table>
      <button class="am-btn am-btn-success am-radius">保存</button>
      <button class="am-btn am-btn-success am-radius">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table',
    data () {
      return {

      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
  }
 .big{width:98%;  height:2rem;}
 .sma{width:97%;}
 input{
   border:1px solid white;
 }
  button{
   width:5.6rem;
    margin:0.7rem;
    margin-top:2rem;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    padding-bottom: 5rem;
    position: relative;
    top:2rem;
  }
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:2.5rem;
  }

</style>
