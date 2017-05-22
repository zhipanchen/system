<template>
    <div id="checkCourse-selectDiv">
            <div class="selectDiv">
                <span class="StarSpan">*</span>
                <select id="termSelect" name="termSelect">
                    <option selected="selected"></option>
                    <option>选择学期（必选项）</option>
                    <optgroup v-for="term in terms" :label="term.termLabel">
                        <option :value="term.termValue1">{{ term.termLabel }}:上学期</option>
                        <option :value="term.termValue2">{{ term.termLabel }}:下学期</option>
                    </optgroup>
                </select>
                <input id="termInput" type="" placeholder="选择学期（必选项）">
            </div>
            <div class="selectDiv">
                <span class="StarSpan">*</span>
                <select id="weekSelect" name="weekSelect">
                    <option selected="selected"></option>
                    <option>选择周数（必选项）</option>
                    <option v-for="(week,n) in weeks" :value="n">{{ week }}</option>
                </select>
                <input id="weekInput" type="" placeholder="选择周数（必选项）">
            </div>
            <div class="selectDiv">
                <select id="teacherSelect" name="teacherSelect">
                    <option selected="selected"></option>
                    <option v-for="teacher in teachers" :value="teacher">{{ teacher }}</option>
                </select>
                <input id="teacherInput" type="" placeholder="教师">
            </div>
            <div class="selectDiv">
                <select id="classroomSelect" name="classroomSelect">
                    <option selected="selected"></option>
                    <option v-for="classroom in classrooms" value="classroom">{{ classroom }}</option>
                </select>
                <input id="classroomInput" type="" placeholder="教室">
            </div>
            <div class="selectDiv">
                <select id="classSelect" name="classSelect">
                    <option selected="selected"></option>
                    <option v-for="classNum in classNums" value="classNum">{{ classNum }}</option>
                </select>
                <input id="classInput" type="" placeholder="班级">
            </div>
            <button id="queryButton" @click="queryCourse">查找</button>
    </div>
</template>

<script>
    export default {
        name: 'checkCourse-selectDiv',
        data () {
            return {
                terms: [
                    { termLabel: '2016-2017', termValue1: '2016-2017-1', termValue2: '2016-2017-2' },
                    { termLabel: '2017-2018', termValue1: '2017-2018-1', termValue2: '2017-2018-2' },
                    { termLabel: '2018-2019', termValue1: '2018-2019-1', termValue2: '2018-2019-2' }
                ],
                weeks: [
                    '第一周',
                    '第二周',
                    '第三周',
                    '第四周',
                    '第五周',
                    '第六周',
                    '第七周',
                    '第八周',
                    '第九周',
                    '第十周',
                    '第十一周',
                    '第十二周',
                    '第十三周',
                    '第十四周',
                    '第十五周',
                    '第十六周',
                    '第十七周',
                    '第十八周',
                    '第十九周',
                    '第二十周'
                ],
                teachers: [
                    '张爱国',
                    '李爱党',
                    '王爱民'
                ],
                classrooms: [
                    'A101',
                    'A102',
                    'A103',
                    'A104',
                    'A105',
                    'A106'
                ],
                classNums: [
                    '220401',
                    '220402',
                    '220403',
                    '220701',
                    '220702'
                ]
            }
        },
        methods: {
            queryCourse: function() {
                var termSelect = document.getElementById("termSelect");
                var index1 = termSelect.selectedIndex;
                var text1 = termSelect.options[index1].text;

                var weekSelect = document.getElementById("weekSelect");
                var index2 = weekSelect.selectedIndex;
                var text2 = weekSelect.options[index2].text;

                var teacherSelect = document.getElementById("teacherSelect");
                var index3 = teacherSelect.selectedIndex;
                var value3 = teacherSelect.options[index3].value;

                var classroomSelect = document.getElementById("classroomSelect");
                var index4 = classroomSelect.selectedIndex;
                var value4 = classroomSelect.options[index4].value;

                var classSelect = document.getElementById("classSelect");
                var index5 = classSelect.selectedIndex;
                var value5 = classSelect.options[index5].value;

                var termInput = document.getElementById("termInput");
                var weekInput = document.getElementById("weekInput");
                var teacherInput = document.getElementById("teacherInput");
                var classroomInput = document.getElementById("classroomInput");
                var classInput = document.getElementById("classInput");

                if(text1 == "选择学期（必选项）" ||  text1 == ""){
                    alert("学期选项是必选的！");
                } else{

                }

                if(text2 == "选择周数（必选项）" ||  text2 == ""){
                    alert("周数选项是必选的！");
                } else{

                }

                if(value3 != "教师") {

                }
                else{

                }

                if(value4 != "教室") {

                }
                else{

                }

                if(!isNaN(value5)) {

                }
                else{

                }
            }
        }
    }
</script>

<style lang="css">
    html{
        font-size: 16px;
    }
    #checkCourse-selectDiv{
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.5rem;
    }
    select{
        border: 0.1rem solid #d4d4d9;
        border-radius: 0.7rem;
        outline: none;
        padding: 0.3rem 0.5rem;
        margin: 0.1rem;
        font-size: 0.8rem;
    }
    input{
        outline: none;
        font-size: 0.8rem;
    }
    .StarSpan{
        /*float: left;*/
        position: absolute;
        color: red;
        margin: 0.2rem;
    }
    .selectDiv{
        position: relative;
        text-align: left;
    }
    #termInput{
        width: 7rem;
        position: absolute;
        left: 0.7rem;
        bottom: 0.5rem;
        border: none;
    }
    #weekInput{
        width: 7rem;
        position: absolute;
        right: 2.1rem;
        bottom: 0.5rem;
        border: none;
    }
    #teacherInput{
        width: 3rem;
        position: absolute;
        left: 0.8rem;
        bottom: 0.5rem;
        border: none;
    }
    #classroomInput{
        width: 2rem;
        position: absolute;
        left: 0.8rem;
        bottom: 0.5rem;
        border: none;
    }
    #classInput{
        width: 3rem;
        position: absolute;
        left: 0.8rem;
        bottom: 0.5rem;
        border: none;
    }
    #queryButton{
        color: white;
        background-color: mediumseagreen;
        border: none;
        border-radius: 0.2rem;
        width: 5rem;
        height: 2rem;
        min-width: 5rem;
    }
    #queryButton:hover{
        cursor: pointer;
    }
    #queryButton:active{
        background-color: yellowgreen;
    }
    @media screen and (max-width:1023px) {
        #termInput{
            width: 9rem;
            left: 1.5rem;
        }
        #weekInput{
            width: 9rem;
            left: 0.6rem;
        }
        #teacherInput{
            width: 3rem;
            left: 1rem;
        }
        #classroomInput{
            width: 3rem;
            left: 1rem;
        }
        #classInput{
            width: 3rem;
            left: 1rem;
        }
    }
</style>
