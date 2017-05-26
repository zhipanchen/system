<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="todo-list-example">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"
    >
    <ul>
      <li
        is="todo-item"
        v-for="(todo, index) in todos"
        v-bind:title="todo"
        v-on:remove="todos.splice(index, 1)"
      ></li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'

  Vue.component('todo-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
    props: ['title']
  })

  export default {
    name: 'todo-list-example',
    data () {
      return {
        newTodoText: '',
        todos: [
          'Do the dishes',
          'Take out the trash',
          'Mow the lawn'
        ]
      }
      },
        methods: {
          addNewTodo: function () {
            this.todos.push(this.newTodoText)
            this.newTodoText = ''
          }
        }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
