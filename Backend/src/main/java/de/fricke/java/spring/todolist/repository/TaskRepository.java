package de.fricke.java.spring.todolist.repository;

import de.fricke.java.spring.todolist.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByPriority(int priority);

    Task findByTaskID(int taskID);

    @Modifying
    @Query("UPDATE Task t SET t.name = ?2, t.description = ?3, t.priority = ?4 WHERE t.taskID = ?1")
    Integer updateTask(int taskID, String name, String description, int priority);

}
