package de.fricke.java.spring.todolist.controller;

import de.fricke.java.spring.todolist.model.Task;
import de.fricke.java.spring.todolist.repository.TaskPagingRepository;
import de.fricke.java.spring.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;


@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    TaskPagingRepository taskPagingRepository;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/tasks/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Task getSingleTasks(@PathVariable("id") int taskID) {
        return taskRepository.findByTaskID(taskID);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/tasksPriority/{priority}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Task> getTaskByPriority(@PathVariable("priority") int priority) {
        return taskRepository.findByPriority(priority);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Task addTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, path = "/tasks", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public Integer changeTask(@RequestBody Task task) {
        return taskRepository.updateTask(task.getTaskID(), task.getName(), task.getDescription(), task.getPriority());
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.DELETE, path = "/tasks/{id}")
    public void deleteTask(@PathVariable("id") int taskID) {
        taskRepository.deleteById(taskID);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "tasksPaging/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Task> getPagingTask(@PathVariable int page) {
        return taskPagingRepository.findAll(
                PageRequest.of(page,5)
        ).getContent();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "tasksPagingSize")
    public long getTasksSize() {
        return taskPagingRepository.count();
    }

}
