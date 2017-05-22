<template>
    <div id="classManege-table">
      <div id="klassDiv">
      <span>班级：{{klass}}</span>
        <span id="num">人数：{{num}}</span>
        <a id="list" href="#">查看班级名单</a>
     </div>
      <div id="tableDiv">
      <table>
        <thead>
         <tr>
           <th width="25%">班级获奖名称</th>
           <th width="25%">获奖等级</th>
           <th width="25%">上传</th>
           <th width="25%">操作</th>
         </tr>
        </thead>
        <tbody>
         <tr v-for="(tableList,index) in tableLists" :key="tableList.name">
           <td>
             <input :id="'input'+index" type="text" v-model.lazy="tableList.name"></td>
           <td>
             <select :id="'Select'+index" v-model="tableList.selected">
               <option  v-for="option1 in options1" :value="option1.value">
                 {{ option1.text }}
               </option>
             </select>
           </td>
           <td><span @click="test(index)">上传</span>
               <a href="#">查看</a>
           </td>
           <td>
             <img @click="save(index)" class='img' :src="tableList.save">
             <img @click="edit(index)" class='img' :src="tableList.edit" >
           </td>
         </tr>
        </tbody>
      </table>
      <img  @click="add" id='img3'  :src="imgSrc3" >
      </div>
    </div>
</template>

<script>
  import icon1 from'../teacher/classManegePage/table/right.png'
  import icon2 from'../teacher/classManegePage/table/wrong.png'
  import icon3 from'../teacher/classManegePage/table/plus.png'
  import icon4 from'../teacher/classManegePage/table/change.png'
  import icon5 from'../teacher/classManegePage/table/delete.png'
    export default {
        name: 'classManege-table',
        data () {
            return {
              imgSrc1:icon1,
              imgSrc2:icon2,
              imgSrc3:icon3,
              klass:'2014级1班',
              num:'50',
              tableLists:[{name:'1',selected:'2',save:icon1,edit:icon2},{name:'2',selected:'1',save:icon1,edit:icon2}],
              selected: '0',
              options1:[{text:'选择级别',value:'0'},
                {text:'校级',value:'1'},
                {text:'省级',value:'2'},
                {text:'国家级',value:'3'}
              ]
            }
        },
        methods:{
          add: function(){
            this.tableLists.push({name:'',input:'',selected:'0'});
          },
          test: function(index){
            if(Input.value!=""){
              if(confirm('确认重置？')) {

              }
            }else{
              alert('请输入奖项！');
            }
          },
          save: function(index){
            var input = document.getElementById("input"+index);
            var Select = document.getElementById("Select"+index);
            if(input.value!=""){
              if(confirm('确认保存？')) {
                this.tableLists[index].save=icon4;
                this.tableLists[index].edit=icon5;
                input.readOnly = true;
                Select.disabled = "false";
              }
            }else{
              alert('请输入奖项！');
            }
          },
          selectClick: function(index){
            this.tableLists[index].name=Input.value;
          }
        /*  delet:function(index){
            if(confirm("您确定要删除该奖项吗？")){
              this.tableLists.splice(index,1);
            }
          }*/

        }
    }
</script>

<style lang="css" scoped>
  html{
    font-size: 16px;
  }
#classManege-table {
  background-color: white;
  position: relative;
  left: 9rem;
  width: 75%;
  font-family: 微软雅黑;

}
#klassDiv{
  text-align: left;
  margin:2rem;
  padding-top: 2rem;
  margin-left:4rem;
}
  #num{
    margin-left: 2rem;;
  }
  #tableDiv {
    background-color: white;
    height:30rem;
    position: relative;
    padding-left: 1rem;
  }
  table{
    border: solid 1px white;
    border-collapse: collapse;
    margin-left:1rem;
    margin-right:1rem;
    width:96%;

  }
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:3rem;
  }
  #list{
    margin-left:2rem;
  }
  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    min-width: 5rem;
    position: relative;

  }
  .img{
    width: 1.5rem;
    height:1.5rem;
  }
  #img3{
    width: 1.5rem;
    height:1.5rem;
    display: flex;
    margin-left:7rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    width:6rem;
  }


</style>
