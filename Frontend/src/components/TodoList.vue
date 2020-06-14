<template>
  <div class="container">
    <AddTaskComponent></AddTaskComponent>
    <ListTasksComponent></ListTasksComponent>
  </div>
</template>

<script>
import AddTaskComponent from './AddTaskComponent'
import ListTasksComponent from './ListTasksComponent'

export default {
    name: 'TodoList',
    components: {
        AddTaskComponent,
        ListTasksComponent
    }
}
</script>

<style>
    .task-container {
        height: 40px;
    }
    .textarea-description {
        resize: none;
        margin-top: 20px;
        width: 100%;
    }
    textarea.form-control {
        height: 40px;
    }
</style>

