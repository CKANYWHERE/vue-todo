<template>
  <div>
    <header>
      <h1>Vue Todo with TypeScript</h1>
    </header>
    <main>
      <todo-input
        :item="todoText"
        @input="updateTodo"
        @add="addTodoItem"
      ></todo-input>
      <div>
        <ul>
          <todo-list-item
            v-for="(todoItem, index) in todoItems"
            :key="index"
            :todoItem="todoItem"
            :index="index"
            @remove="removeItem"
            @toggle="toggleItem"
          >
          </todo-list-item>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todos: Todo[]) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch(): Todo[] {
    const todoItmes = localStorage.getItem(STORAGE_KEY) || "[]";
    const result = JSON.parse(todoItmes);
    return result;
  },
};

export interface Todo {
  title: string;
  done: boolean;
}

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as Todo[],
    }
  },
  methods: {
    updateTodo(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      // localStorage.setItem(this.todoText, this.todoText);
      const todo: Todo = {
        title: this.todoText,
        done: false,
      };
      this.todoItems.push(todo);
      storage.save(this.todoItems);
    },
    initTodoText() {
      this.todoText = "";
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch().sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    },
    removeItem(index: number) {
      console.log("remove", index);
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
    toggleItem(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        ...todoItem,
        done: !todoItem.done,
      });
      storage.save(this.todoItems);
    }
  },
  created() {
    this.fetchTodoItems();
  },
});
</script>

<style scoped></style>
