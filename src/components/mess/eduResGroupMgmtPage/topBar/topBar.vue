<template>
  <div id="eduResearchGroupManagement_topBar">
    <div id="topBarDiv">
      <ul>
        <li>
          <a>教研组管理</a>
        </li>
      </ul>
    </div>
    <div id="whiteDiv">
      <button @click="backClick">返回</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eduResearchGroupManagement_topBar',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      backClick: function(){
        history.go(-1);
      }
    }
  }
</script>

<style scoped>
  html{

  }
  #topBarDiv{
    background-color: #158064;
    border: thin solid #158064;
    height: 4.9rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }
  li{
    /*导航*/
    color: white;
    font-size: 1rem;
    list-style: none;
    font-weight: bold;
    display: block;
    padding: 3.5rem;
    background-color: #00a539;
  }
  #whiteDiv{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  button{
    color: white;
    background-color: #158064;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2.5rem;
    min-width: 7rem;
    outline: none;
    position: relative;
    right: 8rem;
    margin: 0.2rem;
  }
  button:hover{
    cursor: pointer;
  }
  button:active{
    background-color: #00a539;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

