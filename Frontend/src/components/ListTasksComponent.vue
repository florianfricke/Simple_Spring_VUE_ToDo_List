<template>
  <div class="task-list">
    <table class="table task-table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Task Name</th>
          <th scope="col">Description</th>
          <th scope="col">Priority</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" v-bind:key="task.taskID" v-if="index <= 4">
          <th scope="row">{{task.taskID}}</th>
          <td>
            <input
              type="text"
              class="taskName form-control"
              v-bind:class="{'taskNameEdit': isEditActive && activeEditTaskID == task.taskID}"
              :disabled="!(isEditActive && activeEditTaskID == task.taskID)"
              v-model="task.name"
              value="task.name"
            />
          </td>
          <td>
            <textarea
              v-model="task.description"
              value="task.taskDescription"
              v-bind:class="{'taskNameEdit': isEditActive && activeEditTaskID == task.taskID}"
              :disabled="!(isEditActive && activeEditTaskID == task.taskID)"
              class="form-control textarea-description-list"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
          </td>
          <td>
            <input
              v-model="task.priority"
              class="form-control input-priority-list"
              v-bind:class="{'taskNameEdit': isEditActive && activeEditTaskID == task.taskID}"
              :disabled="!(isEditActive && activeEditTaskID == task.taskID)"
              value="task.priority"
              type="number"
            />
          </td>
          <td>
            <div class="icon-list">
              <button
                class="btn btn-edit"
                v-bind:class="[isEditActive && activeEditTaskID == task.taskID ? 'btn-success' : 'btn-primary']"
                v-on:click="editTask($event, task.taskID)"
              >
                <i
                  v-bind:class="[isEditActive && activeEditTaskID == task.taskID ? 'fas fa-check' : 'fas fa-edit']"
                ></i>
              </button>
              <button class="btn btn-danger btn-remove" v-on:click="removeTask(task.taskID, index)">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :elementsPerPage="elementsPerPage"></Pagination>
  </div>
</template>

<script>
import { SpringBackend } from "../config/backend-config";
import { serverBus } from "../main";
import Pagination from "./Pagination";

export default {
  name: "ListTasksComponent",
  components: {
    Pagination
  },
  data() {
    return {
      tasks: [],
      taskNumber: 0,
      isEditActive: false,
      activeEditTaskID: 0,
      activePage: 0,
      elementsPerPage: 5,
      elementsCount: 0,
      pagesCount: 0
    };
  },
  methods: {
    getPageDataFromBackend(pageNumber) {
      SpringBackend.get("tasksPaging/"+pageNumber)
        .then(response => (this.tasks = response.data))
        .catch(error => console.log(error));
    },
    roundNumber(number) {
      return Math.ceil(number);
    },
    editTask(event, taskID) {
      this.activeEditTaskID = taskID;
      this.disabled = false;
      if (!this.isEditActive) {
        this.isEditActive = true;
      } else {
        this.isEditActive = false;
      }
      let task = this.tasks.find(task => task.taskID == taskID);
      SpringBackend.put("tasks", {
        taskID: task.taskID,
        name: task.name,
        description: task.description,
        priority: task.priority
      });
    },
    removeTask: function(taskID, index) {
      this.tasks.splice(index, 1);
      this.elementsCount = this.elementsCount - 1;

      SpringBackend.delete("tasks/" + taskID);
      if (this.tasks.length == 0) {
        if (this.activePage > 0) {
          this.activePage = this.activePage - 1;
          serverBus.$emit("activePage", this.activePage);
        }
        if (this.activePage == 0 && this.pagesCount > 1) {
          console.log("TRIGGER");
          this.getPageDataFromBackend(0);
          this.activePage = 0;
          serverBus.$emit("activePage", this.activePage);
        }
        this.pagesCount = this.roundNumber(this.elementsCount/this.elementsPerPage)
        serverBus.$emit("pagesCount", this.pagesCount);
      }
    }
  },
  mounted() {
    let self = this;
    this.getPageDataFromBackend(this.activePage);

    SpringBackend.get("/tasksPagingSize")
      .then(function(response) {
        self.elementsCount = response.data;
        self.pagesCount = self.roundNumber(self.elementsCount/self.elementsPerPage)
        serverBus.$emit("pagesCount", self.pagesCount);
      })
      .catch(error => console.log(error));
    
    serverBus.$emit("activePage", this.activePage);

    serverBus.$on("newTask", newTask => {
      this.tasks.push(newTask);
      this.elementsCount = this.elementsCount + 1;
      this.pagesCount = this.roundNumber(this.elementsCount/this.elementsPerPage)
      serverBus.$emit("pagesCount", this.pagesCount);
      this.getPageDataFromBackend(0);
    });

    serverBus.$on("activePage", activePage => {
      this.activePage = activePage;
      this.getPageDataFromBackend(activePage);
    });
  }
};
</script>

<style>
.task-table {
  margin-bottom: 40px;
}
.task-table thead th {
  padding-left: 20px;
  text-align: left;
}
.task-table tbody th {
  vertical-align: middle;
}
.taskName,
.textarea-description-list,
.input-priority-list {
  border: none;
}
.taskName {
  width: 320px;
}
.textarea-description-list {
  width: 430px;
  resize: none;
}
.input-priority-list {
  width: 90px;
}
.taskNameEdit {
  border: 1px solid #ced4da;
}
.taskName:disabled,
.textarea-description-list:disabled,
.input-priority-list:disabled {
  background: none;
}
</style>

