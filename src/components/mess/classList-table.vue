<template>
    <div id="classList-table">
     <div id="top">
       <a href="#">返回</a>
       <button>导出</button>
       </div>
     <div id="green">
       <span>班级名单</span>
     </div>
       <table border="1">
         <tr>
           <td>姓名</td>
           <td>学号</td>
           <td>状态</td>
           <td></td>
         </tr>
         <tr  v-for="data in tableList">
           <td v-text="data.name"></td>
           <td v-text="data.num"></td>
           <td ><select>
             <option value ="normal">正常</option>
             <option value ="stop">停课</option>
             <option value="quit">休学</option>
             <option value="else">其他</option>
           </select></td>
           <td><a href="#">查看学生信息</a></td>
         </tr>
     </table>

    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              tableList: [
                {name: '李磊', num: '0123456'},
                {name:'小明',num:'0123457'}
                ]
            }
        }
    }
</script>

<style lang="css" scoped>
  html{
    font-size: 16px;
  }
#classList-table{
  background-color: white;
  position: relative;
  left: 9rem;
  width: 75%;
  font-family: 微软雅黑;
  text-align: left;
  top:2rem;

}
  #green{
    background-color: #158064;
    color:white;
    padding:0.75rem;
    padding-left: 2rem;
  }
  #top{
    padding:0.5rem;
    position: relative;
    justify-content: space-between;
  }
  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    min-width: 5rem;

  }
</style>
