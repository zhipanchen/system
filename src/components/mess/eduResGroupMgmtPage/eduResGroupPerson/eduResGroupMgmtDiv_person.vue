<template>
    <div id="eduResearchGroupPerson">
      {{ person }}<button @click="remove">×</button>
    </div>
</template>

<script>
    export default {
        name: 'eduResearchGroupPerson',
        data () {
            return {
              del: 'remove'
            }
        },
        props: [ 'person' ],
        methods: {
          remove: function(){
            this.$emit('remove',this.del);//向父组件传递参数名为remove，实际内容为del的值
          }
        }
    }
</script>

<style scoped>
    html {
    }
    #eduResearchGroupPerson{
      margin: 0.5rem;
    }
    button{
      outline: none;
      color: red;
      background-color: white;
      border: thin solid;
      /*border-radius: 1rem;*/
      margin: 0.1rem;
      width: 0.6rem;
      height: 0.6rem;
    }
    button:hover{
      cursor: pointer;
    }
    @media screen and (max-width: 1023px) {
        html {
        }
    }
</style>
