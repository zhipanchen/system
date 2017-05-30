<template>
    <div id="centerBut">
      <select class="selectWM" v-model="supervisorinfoKey.time">
        <option value="0">选择时间</option>
        <option v-for="time in times" :value="time.week+','+time.weekDay+','+time.lessonNum">第{{time.week}}周第{{time.weekDay}}天第{{time.lessonNum}}节课</option>
      </select>
      <button class="am-btn am-btn-success am-radius buttonWM" @click="splitClick()">test2</button>
      <button class="am-btn am-btn-success am-radius buttonWM" @click="test1()">弹窗</button>
      <button class="am-btn am-btn-success am-radius buttonWM" @click="test2()">下载文件</button>

      <span style="display: inline-block"><Upload
        :show-upload-list = false
        action="//jsonplaceholder.typicode.com/posts/">
        <button type="ghost" class="am-btn am-btn-success am-radius buttonWM" id="uploadBtn">上传文件</button>
      </Upload></span>

      <modal v-model="modal" width="400" id="modalBody">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>上传</span>
        </div>
        <div style="text-align: left;font-size: 0.9rem;">
          <p>上传成功</p>
          <p>下载成功</p>
          <p>下载成功</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="ok">确定</button>
          <button id="modalBtn" @click="cancel">取消</button>
        </div>
      </modal>

    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              weekAndDay:[],
             modal:false,
              modal_loading:true,
              supervisorinfoKey:{
                supervisorName:'',
                time:'0'
              },
              times:[
                {week:'1',weekDay:'2',lessonNum:'3'},
                {week:'4',weekDay:'5',lessonNum:'6'}
              ]
            }
        },
        methods:{
          splitClick:function(){
            this.weekAndDay = this.supervisorinfoKey.time.split(",");
//            alert(this.supervisorinfoKey.time);
            alert(this.weekAndDay[0]+"aaa"+this.weekAndDay[1]+this.weekAndDay[2]);
          },
          test1: function () {
            this.modal=true;
          },
          test2:function(){
            location.href="";
          },
          ok:function(){
            this.modal=false;
            this.$Message.success("提交成功");
          },
          cancel:function(){
            this.modal=false;
            this.$Message.error("提交失败");
          }
        }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #centerBut{
      text-align: center;
      margin-top: 5rem;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    .selectWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
