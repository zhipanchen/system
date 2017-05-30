<template>
    <table id="checkCourse-tableVue" border="1">
        <tr  id="weekdayTr">
            <td>节次/周次</td>
            <td>星期一</td>
            <td>星期二</td>
            <td>星期三</td>
            <td>星期四</td>
            <td>星期五</td>
            <td>星期六</td>
            <td>星期日</td>
        </tr>
        <tr  v-for="item in items" id="courseTr">
            <td class="sectionTd">{{ item.SectionNum }} <br> {{ item.SectionTime }} </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>

</template>

<script>
    export default {
        name: 'checkCourse-tableVue',
        data () {
            return {
               items:[
                   { SectionNum: '第一节', SectionTime: '8:30 - 9:15' },
                   { SectionNum: '第二节', SectionTime: '9:20 - 10:05' },
                   { SectionNum: '第三节', SectionTime: '10:20 - 11:05' },
                   { SectionNum: '第四节', SectionTime: '11:10 - 11:55' },
                   { SectionNum: '第五节', SectionTime: '14:30 - 15:15' },
                   { SectionNum: '第六节', SectionTime: '15:20 - 16:05' },
                   { SectionNum: '第七节', SectionTime: '16:20 - 17:05' },
                   { SectionNum: '第八节', SectionTime: '17:10 - 17:55' },
                   { SectionNum: '第九节', SectionTime: '19:30 - 20:15' },
                   { SectionNum: '第十节', SectionTime: '20:20 - 21:05' },
                   { SectionNum: '第十一节', SectionTime: '21:10 - 21:55' },
                   { SectionNum: '第十二节', SectionTime: '22:00 - 22:45' },
                ]
            }
        }
    }
</script>

<style lang="css">
    html{
        font-size: 16px;
    }
    #checkCourse-tableVue{
        position: relative;
        margin: 0.5rem auto;
        width: 90%;
        border: 0 solid #d4d4d9;
        border-collapse: collapse;
        table-layout: fixed;
        text-align: center;
    }
    /*@media screen and (max-width:1023px) {
        html {
            font-size: 9px;
        }
    }*/
</style>
