<template>
  <div id="studentEvalution">
    <table>
    <tr>
    </tr>
    <!--表头-->
    <tr v-for="application in applications" :id="application.id">
      <td>{{ application.teacher }}</td>
      <td><input type="radio" value="1" v-model="picked"/>优秀</td>
      <td><input type="radio" value="2" v-model="picked"/>良好</td>
      <td><input type="radio" value="3" v-model="picked"/>中等</td>
      <td><input type="radio" value="4" v-model="picked"/>较差</td>
      <td><input type="radio" value="5" v-model="picked"/>差</td>
    </tr>
      <span>Picked: {{ picked }}</span>
  </table>
    </div>
</template>

<script>
    export default {
        name: 'studentEvalution',
        data () {
            return {
              applications: [
                { id:'1', teacher: '1.教师上课认真程度：'},
                { id:'2', teacher: '2.教室课堂气氛：'},
                { id:'3', teacher: '3.作业批改情况'},
                { id:'4', teacher: '4.课堂收获情况'},
                { id:'5', teacher: '5.教师上课生动形象，简单易懂'},
              ],
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #studentEvalution{
      /*页面*/
      margin: 2rem auto;
      background-color: white;
      width: 80%;
      border: solid white;
      padding: 1rem 0;
      display: flex;
      justify-content: center;
    }
    table{
      width: 90%;
      border-collapse: collapse;
    }
    td{
      min-width: 4rem;
      height: 3rem;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
