<template>
    <div id="checkCourseDiv">
        <div id="operationDiv">
            <div id="selectDiv">
                <select id="termSelect" v-model="termSelect">
                    <option disabled>请选择学期</option>
                    <option v-for="term in terms" :value="term.value">{{ term.name }}</option>
                </select>
                <select id="weekSelect" v-model="weekSelect">
                    <option disabled>请选择周数</option>
                    <option v-for="week in weeks" :value="week.value">{{ week.name }}</option>
                </select>
                <button id="queryButton" @click="queryCourseClick()"  class="am-btn am-btn-success am-radius">查找</button>
            </div>
        </div>

        <div id="mainDiv">
            <p id="tableTipP">支持分别以学期和周数为条件，对全校的课程表进行查询；支持调换选定的两门课程。</p>
            <p id="tableInfoP">当前课表：{{ term }} {{ week }} </p>
            <tableDiv :queryCourse="queryCourse"></tableDiv><!--表格组件-->
        </div>
    </div>
</template>
<!--待完善查询课表的数据交互，需要确认后端的查询方式；待完善下拉搜索功能，需要确认后端提供数据库搜索支持还是前端通过js搜索处理-->
<script>
    import tableDiv from '../tableDiv/tableDiv.vue'
    export default {
        name: 'checkCourseDiv',
        data () {
            return {
                term: '',//预想显示搜索后的课表信息标题
                week: '',
                termSelect: '请选择学期',
                weekSelect: '请选择周数',
                queryCourse: [],
                weeks:[
                    { "name":"第一周", "value":"1" },
                    { "name":"第二周", "value":"2" },
                    { "name":"第三周", "value":"3" },
                    { "name":"第四周", "value":"4" },
                    { "name":"第五周", "value":"5" },
                    { "name":"第六周", "value":"6" },
                    { "name":"第七周", "value":"7" },
                    { "name":"第八周", "value":"8" },
                    { "name":"第九周", "value":"9" },
//                    { "name":"第十周", "value":"10" },
                    { "name":"第十一周", "value":"11" },
                    { "name":"第十二周", "value":"12" },
                    { "name":"第十三周", "value":"13" },
                    { "name":"第十四周", "value":"14" },
                    { "name":"第十五周", "value":"15" },
                    { "name":"第十六周", "value":"16" },
                    { "name":"第十七周", "value":"17" },
                    { "name":"第十八周", "value":"18" },
                    { "name":"第十九周", "value":"19" }
//                    { "name":"第二十周", "value":"20" }
                ],
                terms:[
                    { "name":"2015-2016 第1学期", "value":"2015-2016.1" },
                    { "name":"2015-2016 第2学期", "value":"2015-2016.2" },
                    { "name":"2016-2017 第1学期", "value":"2016-2017.1" },
                    { "name":"2016-2017 第2学期", "value":"2016-2017.2" },
                    { "name":"2017-2018 第1学期", "value":"2017-2018.1" },
                    { "name":"2017-2018 第2学期", "value":"2017-2018.2" }
                ]
            }
        },
        components: {
            tableDiv
        },
        /*beforeMount: function() {

        },*/
        methods: {
            queryCourseClick: function(){
                this.$http.post('./acdeminSeeCurriculum',{
//                this.$http.post('../testPhp/checkCourseQuery.php',{
                    "yearSemester": this.termSelect,
                    "week": this.weekSelect
                },{
                    "Content-Type":"application/json"
                }).then(function(response){
                    console.log("查找课表:");
                    console.log(response.body);
                    this.queryCourse = response.body.course;
                    this.term = this.termSelect;
                    this.week = this.weekSelect;
                },function(error){
                    this.$Message.error('连接失败，请重试！');
                });
            }
        }
    }
</script>

<style scoped>
    #checkCourseDiv{
        background-color: #f3f3f3;
    }
    #mainDiv{
        /*页面*/
        background-color: white;
        margin: 0 5rem;
        min-height: 33rem;
    }
    select{
        margin-right: 1.4rem;
    }
    #operationDiv{
        background-color: white;
        margin: 0 0 0.6rem;
    }
    #selectDiv{
        padding: 0.6rem 5rem;
    }
    #tableTipP{
        /*功能页面标题*/
        color: #C1C1C1;
        position: relative;
        text-align: left;
        z-index: 2;
        padding: 1rem;
        margin: 0;
    }
    #tableInfoP{
        /*表格课表标题*/
        text-align: left;
        position: relative;
        margin-top: 0;
        left: 1rem;
    }
    @media screen and (max-width:1023px) {
        html {
        }
    }
</style>
