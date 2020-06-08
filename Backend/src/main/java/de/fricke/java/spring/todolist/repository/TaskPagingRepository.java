package de.fricke.java.spring.todolist.repository;

import de.fricke.java.spring.todolist.model.Task;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskPagingRepository extends PagingAndSortingRepository<Task, Integer> {
}
