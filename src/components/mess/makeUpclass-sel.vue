<template>
	<div id="adjSel">
    <table>
      <tbody>
        <tr>
          <td class="designation" width="8%">
            <span>调课方式：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected1">
              <option v-for="option1 in options1" v-bind:value="option1.value">
                {{ option1.text }}
              </option>
            </select>
          </td>
          <td class="designation" width="8%">
            <span>原周数：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected2">
              <option v-for="option2 in options2" v-bind:value="option2.value">
                {{ option2.text }}
              </option>
            </select>
          </td>
          <td class="designation" width="8%">
            <span>调至周数：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected3">
              <option v-for="option3 in options3" v-bind:value="option3.value">
                {{ option3.text }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="designation" width="8%">
            <span>原星期：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected4">
              <option v-for="option4 in options4" v-bind:value="option4.value">
                {{ option4.text }}
              </option>
            </select>
          </td>
          <td class="designation" width="8%">
            <span>调至星期：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected5">
              <option v-for="option5 in options5" v-bind:value="option5.value">
                {{ option5.text }}
              </option>
            </select>
          </td>
          <td class="designation" width="8%">
            <span>课室：</span>
          </td>
          <td class="choice" width="24%">
            <textarea v-model="message1"></textarea>
          </td>
        </tr>
        <tr>
          <td class="designation" width="8%">
            <span>理由类型：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected6">
              <option v-for="option6 in options6" v-bind:value="option6.value">
                {{ option6.text }}
              </option>
            </select>
          </td>
          <td class="designation" width="8%">
            <span>具体理由：</span>
          </td>
          <td class="choice" width="24%">
            <textarea v-model="message2"></textarea>
          </td>
        </tr>
      </tbody>
    </table>
	</div>
</template>

<script>
  export default {
    name:'adjSel',
    data () {
      return {
        selected1: '0',
        options1: [
          { text: '--选择--', value: '0' },
          { text: '自动', value: '1' },
          { text: '手动', value: '2' }
        ],
        selected2: '0',
        options2: [
          { text: '选择周数', value: '0' },
          { text: '第一周', value: '1' },
          { text: '第二周', value: '2' },
          { text: '第三周', value: '3' },
          { text: '第四周', value: '4' },
          { text: '第五周', value: '5' },
          { text: '第六周', value: '6' },
          { text: '第七周', value: '7' },
          { text: '第八周', value: '8' },
          { text: '第九周', value: '9' }
        ],
        selected3: '0',
        options3: [
          { text: '选择周数', value: '0' },
          { text: '第一周', value: '1' },
          { text: '第二周', value: '2' },
          { text: '第三周', value: '3' },
          { text: '第四周', value: '4' },
          { text: '第五周', value: '5' },
          { text: '第六周', value: '6' },
          { text: '第七周', value: '7' },
          { text: '第八周', value: '8' },
          { text: '第九周', value: '9' }
        ],
        selected4: '0',
        options4: [
          { text: '选择星期', value: '0' },
          { text: '星期一', value: '1' },
          { text: '星期二', value: '2' },
          { text: '星期三', value: '3' },
          { text: '星期四', value: '4' },
          { text: '星期五', value: '5' },
          { text: '星期六', value: '6' },
          { text: '星期天', value: '7' }
        ],
        selected5: '0',
        options5: [
          { text: '选择星期', value: '0' },
          { text: '星期一', value: '1' },
          { text: '星期二', value: '2' },
          { text: '星期三', value: '3' },
          { text: '星期四', value: '4' },
          { text: '星期五', value: '5' },
          { text: '星期六', value: '6' },
          { text: '星期天', value: '7' }
        ],
        selected6: '0',
        options6: [
          { text: '选择类型', value: '0' },
          { text: '理由一', value: '1' },
          { text: '理由二', value: '2' },
          { text: '理由三', value: '3' }
        ]
      }
    }
  }
</script>

<style>
  #adjSel {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 20px;
    margin-top: 0.2rem;
   /* position: relative;
    top:5rem;*/
    background: white;

  }
  #adjSel table {
    width: 100%;
  }
  .designation {
    text-align: right;
  }
  .choice {
    text-align: left;
  }
  #adjSel tr {
    height: 2.4rem;
  }
  #adjSel td {
    position: relative;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>