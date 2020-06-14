<template>
    <form @submit.prevent="formSubmit" id="createTaskForm">
        <div class="form-task-add">
        <div class="task-container">
            <input v-model="taskName" class="form-control input-task" v-bind:class="[taskName == '' || taskName == null ? 'is-invalid' : 'is-valid']" type="text" placeholder="enter new task">
            <input v-model="taskPriority" class="form-control input-priority" type="number" value="1" placeholder="1">
            <button type="submit" class="btn btn-primary btn-add"><i class="fa fa-plus" aria-hidden="true"></i><span>Add Task</span></button>
        </div>
        <textarea v-model="taskDescription" class="form-control textarea-description" name="" id="" cols="30" rows="10" placeholder="enter description"></textarea>
        </div>
    </form>
</template>

<script>
import {SpringBackend} from '../config/backend-config'
import {serverBus} from '../main';

export default {
    name: 'AddTaskComponent', 
    data () {
        return {
            taskName: null,
            taskPriority: null,
            taskDescription: null
        }
  },
  methods: {
      formSubmit() {
          if (this.taskName == "" || this.taskName == null) {
            return
          }
          let newTask = {
              name: this.taskName,
              description: this.taskDescription,
              priority: this.taskPriority
          }
          SpringBackend
            .post("tasks", newTask)
            .then(function(response) {
                newTask = response.data;
                serverBus.$emit('newTask', newTask);
            })
            .catch(function(error) {
                console.log(error);
            })
          this.taskName = null;
          this.taskPriority = null;
          this.taskDescription = null;
      }
  }
}
</script>

<style>
    #createTaskForm {
        margin-bottom: 60px;
    }
    .form-task-add {
        width: 800px;
    }
    .form-task-add .input-task, .form-task-add .input-priority {
        float: left;
        display: inline-block !important;
    }
    .input-task {
        width: 560px;
    }
    .input-priority {
        margin-left: 20px;
        text-align: center;
        width: 90px;
    }
    .btn-add {
        float: right;
        margin-left: 20px;
    }
    .btn-add .fa {
        font-size: 0.8rem;
        margin-right: 7px;
    }
    .textarea-description {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        width: 670px;
    }
</style>

