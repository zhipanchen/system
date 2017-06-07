<template>
    <div id="textArea">
      <div class="content">
        <span class="textaraeTitle">文字评教：</span>
        <textarea class="text"></textarea>
      </div>
      <div class="buttonGroup">
        <button class="cancel">取消</button>
        <button class="confirm">确定</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #textArea{
      width:100%;
    }
    .content{
      width:80%;
      margin:0 auto;
    }
    .textaraeTitle{
      font-size:1rem;
      display: block;
    }
    .text{
      width:100%;
      background-color: #E5E5E5;
      height:10rem;
      font-size:1.5rem;
    }
    .buttonGroup {
      width: 50%;
      margin-left:25%;
    }
    .cancel{
      display: block;
      float:left;
      margin:5px 20px 0 0;
      border: none;
      border-radius: 0.2rem;
      color: white;
      background-color: #00A64A;
      min-width: 5rem;
      min-height: 2.3rem;
      width: 8rem;
      font-size: 1rem;
    }
    .confirm{
      display: block;
      float:right;
      margin:5px 20px 0 0;
      border: none;
      border-radius: 0.2rem;
      color: white;
      background-color: #00A64A;
      min-width: 5rem;
      min-height: 2.3rem;
      width: 8rem;
      font-size: 1rem;
    }
</style>
