package com.project_task.taskid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project_task.taskid.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

