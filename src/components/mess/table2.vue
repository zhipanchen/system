<template>
  <div id="table">
    <div id="title"> <p id="classtitle">护理学基础</p></div>
    <div id="show">
      <p>编号：314151</p>
      <div id="leader">
        <span>组长：</span>
        <input
          v-model="newone"
          v-on:keyup.enter="add"
          placeholder=""
        >
        <div
          is="todo-item"
          v-for="(leader, index) in leaders"
          v-bind:title="leader"
          v-on:remove="leaders.splice(index, 1)"
        ></div>
      </div>
      <br/>
      <div id="member">
        <span>组员：</span>
        <input
          v-model="newone1"
          v-on:keyup.enter="add1"
          placeholder=""
        >
        <div
          is="todo-item"
          v-for="(member, index) in members"
          v-bind:title="member"
          v-on:remove="members.splice(index, 1)"
        ></div>
      </div>
    </div>
    <button>保存</button>
    <button>取消</button>
  </div>

</template>

<script>
  import Vue from 'vue'

  Vue.component('todo-item', {
    template: '\
    <div>\
      {{ title }}\
      <button  v-on:click="$emit(\'remove\')">X</button>\
    </div>\
  ',
    props: ['title']


  })


  export default {
    name: 'table',
    data () {
      return {
        newone1:'',
        newone: '',
        members:['小王'],
        leaders: ['何平']
      }
    },
    methods: {
      add: function () {
        this.leaders.push(this.newone)
        this.newone = ''
      },
      add1: function () {
        this.members.push(this.newone1)
        this.newone1 = ''
      }
    }
  }
</script>

<style lang="css" scoped>
  html {
    font-size: 16px;

  }
  #table{
    background-color: white;
    margin-right:9rem;
    margin-left:9rem;
    height:30rem;
    position: relative;
    top:2rem;
    justify-content: center;
  }
  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
  #classtitle{
    font-size: 1.3rem;
    position: relative;
    display: flex;
    top:0.5rem;
    left:2rem;
  }
  #title{
    border-bottom: 0.20rem solid #158064;
  }
  #show{
    position:relative;
    text-align: left;
    left:2rem;
    font-size:1.3rem;
  }
  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    min-width: 5rem;
    margin:2rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }

</style>
