<template>
    <div id="mesNot-tableDiv">
    <table id="mesNot-tableVue" border="1">
        <tr   id="thead" >
            <th width="10%">发件人编号</th>
            <th width="30%">姓名</th>
            <th width="40%">标题</th>
            <th width="20%">时间</th>

        </tr>
        <tr v-for="data in Lists"  id="tbody">
            <td v-text="data.num"></td>
            <td v-text="data.author"></td>
            <td v-text="data.contents"></td>
            <td v-text="data.times"></td>
        </tr>
    </table>
    <span>共有： {{ pageAll }}页</span>
    <span>当前：{{pageNow}}页</span>
        <a :href="pageFir">首页</a>
        <a :href="pageBef">上一页</a>
        <a :href="pageNex">下一页</a>
        <a :href="pageLas">末页</a>
    </div>
</template>

<script>

    export default {
        name: 'mesNot-tableDiv',
        data () {
            return {
                  Lists:[
                      { num:'0001',author:'admin',contents:'关于使用校园无线的WiFi的通知',times:'2016/11/23 0:0:00'},
                      { num:'0235',author:'陈玲',contents:'关于10月份教师评教的通知',times:'2016/10/23 0:0:00'},
                  ] ,//表格原始数据使用服务器时可不必使用
                  pageAll:'1 ',
                  pageNow:'1 ',
                  pageFir:'',
                  pageBef:'',
                  pageNex:'',
                  pageLas:''
    } }

    }
</script>

<style lang="css" scoped>
    html{
        font-size: 16px;
    }
    #mesNot-tableVue{
        position: relative;
        margin: 0.5rem auto;
        width: 90%;
        border: 0 solid #d4d4d9;
        border-collapse: collapse;
        table-layout: fixed;
        text-align: center;
    }
  th{
      font-weight: normal;
  }

    a{
        position: relative;
        left:20rem;
     }
    span{
        position:relative;
        left:18rem;

    }

</style>
