<template>
  <div id="textbookManagementDiv">
    <div class="dropDown">
      <div id="fiveYearDiv">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">五年制</span></button>
        <table id="fiveYearTable" v-show="fiveYearTable">
          <tr>
            <td>教材名称</td>
            <td>所用课程</td>
            <td>课程编码</td>
            <td>作者</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>ISBN码</td>
          </tr>
          <tr v-for="fiveTextbook in fiveTextbooks">
            <td>{{ fiveTextbook.textbookName }}</td>
            <td>{{ fiveTextbook.courseName }}</td>
            <td>{{ fiveTextbook.courseId }}</td>
            <td>{{ fiveTextbook.author }}</td>
            <td>{{ fiveTextbook.publisher }}</td>
            <td>{{ fiveTextbook.pubtime }}</td>
            <td>{{ fiveTextbook.isbn }}</td>
          </tr>
        </table>
      </div>
      <div id="threeYearDiv">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">三年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable">
          <tr>
            <td>教材名称</td>
            <td>所用课程</td>
            <td>课程编码</td>
            <td>作者</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>ISBN码</td>
          </tr>
          <tr v-for="threeTextbook in threeTextbooks">
            <td>{{ threeTextbook.textbookName }}</td>
            <td>{{ threeTextbook.courseName }}</td>
            <td>{{ threeTextbook.courseId }}</td>
            <td>{{ threeTextbook.author }}</td>
            <td>{{ threeTextbook.publisher }}</td>
            <td>{{ threeTextbook.pubtime }}</td>
            <td>{{ threeTextbook.isbn }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'textbookManagementDiv',
    data () {
      return {
        icon1:require('../../../../../assets/images/icon1.png'),
        icon2:require('../../../../../assets/images/icon2.png'),
        fiveArrow: true,
//        五年制教材下拉箭头，初始为下拉显示
        threeArrow: false,
//        三年制教材下拉箭头，初始为下拉隐藏
        fiveYearTable: true,
//        五年制教材下拉内容，初始为下拉显示
        threeYearTable: false,
//        三年制教材下拉内容，初始为下拉隐藏
        fiveTextbooks: [
          /*{ textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"1", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"2", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"3", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"4", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"5", isbn:"978-7-04-029457-6" },*/
        ],
//        五年制教材信息
        threeTextbooks: [
          /*{ textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"1", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"2", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"3", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"4", isbn:"978-7-04-029457-6" },
          { textbookName:"护理", courseName:"护理", courseId:"123465", author:"李雷", publisher:"高等教育出版社", pubtime:"5", isbn:"978-7-04-029457-6" },*/
        ],
//        三年制教材信息
      }
    },
    beforeMount: function() {
//      this.$http.post('../testPhp/textbookManagement.php',{},{
      this.$http.post('./textbookManage/getTextbookInfo',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取教材:");
        console.log(response);
        var data = response.body;
        for(var i = 0;i < data.TextbookAndYearType.length;i++){
          if(data.TextbookAndYearType[i].schoolYearType == "三年制"){
            this.threeTextbooks.push(data.TextbookAndYearType[i]);
          }else{
            this.fiveTextbooks.push(data.TextbookAndYearType[i]);
          }
        }
      },function(error){
        console.log("获取教材error:");
        console.log(error);
      });
    },
    methods: {
//        点击显示或隐藏五年制下拉教材信息
      fiveYearClick: function () {
        var fiveYearArrow = document.getElementById("fiveYearArrow");
//              显示下拉教材信息
        if (!this.fiveArrow) {
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        } else {
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
//              隐藏下拉教材信息
      },
//        点击显示或隐藏三年制下拉教材信息
      threeYearClick: function () {
        var threeYearArrow = document.getElementById("threeYearArrow");
        if (!this.threeArrow) {
//              alert("open");
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        } else {
//              alert("close");
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },
    }
  }
</script>

<style scoped>
  html {
  }
  /*最上层Div*/
  #textbookManagementDiv{
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  .dropDown{
    margin: 0.6rem 5rem;
    position: relative;
    top: 0.6rem;
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
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
